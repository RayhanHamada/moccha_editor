import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { MyTypes } from '../../store/app-custom-types';

import {
	getRoomKey as getRoomKeyAPI,
	deleteRoomKey as deleteRoomKeyAPI,
	checkRoomExistence as checkRoomExistenceAPI,
} from '../../api/auth';
import {
	getRoomKey,
	setUsername,
	setRoomKey,
	authenticate,
	setIsRM,
	getRoomExistence,
} from './actions';
import { printDevLog } from '../../utils';
import { resetEdin } from '../editor-internal/actions';

/*
 * triggered in case of client creating a room
 */
export const fetchRoomKey$: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('auth/FETCH_ROOM_KEY'),
		mergeMap(() =>
			/*
			 * get roomKey from the server
			 */
			from(getRoomKeyAPI()).pipe(
				map(roomKey => {
					/*
					 * when it's done, dispatch GOT_ROOM_KEY action and joinRoom
					 */
					return getRoomKey.success({ roomKey });
				})
			)
		)
	);

/*
 * triggered in case of client joining a room
 */
export const reqRoomExistence$: MyTypes.AppEpic = (action$, state$) =>
	action$.pipe(
		ofType('auth/REQ_ROOM_EXISTENCE'),
		mergeMap(() => {
			/*
			 * get the roomKey from current state
			 */
			const { roomKey } = state$.value.authReducer;

			/*
			 * just return getRoomExistence.success
			 */
			return from(checkRoomExistenceAPI(roomKey)).pipe(
				map(res => {
					printDevLog(`is room exists : ${res}`);
					return getRoomExistence.success(res);
				})
			);
		})
	);

/*
 * trigerred when client either create a room or join a room
 */
export const onRoomKeyExist$: MyTypes.AppEpic = action$ =>
	action$.pipe(
		/*
		 * check if the action is either GOT_ROOM_KEY (in case a client create a room)
		 * or JOIN_ROOM (in case of client joining a room)
		 */
		ofType('auth/GOT_ROOM_KEY', 'auth/SUCCESS_ROOM_EXISTENCE'),
		/*
		 * if so then set authenticated to true
		 */
		map(action => {
			/*
			 * if we're intended to join a room
			 */
			if (action.type === 'auth/SUCCESS_ROOM_EXISTENCE') {
				/*
				 * and the room is exists, then authenticate
				 */
				if (action.payload) {
					return authenticate();
				}

				/*
				 * if not, then return cancel to join the room
				 */
				return getRoomExistence.cancel();
			}

			/*
			 * after we're intended to create a room
			 */
			return authenticate();
		})
	);

/*
 * if getRoomExistence.cancel invoked, then just show the alert that the room not exists
 */
export const alertRoomNotExists$: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('auth/CANCEL_ROOM'),
		mergeMap(() => {
			alert('The Room is not exists');
			return [];
		})
	);

/*
 * reset username, roomKey, isRM
 */
export const clearAfterExit$: MyTypes.AppEpic = (
	action$,
	state$,
	{ socketio }
) =>
	action$.pipe(
		ofType('auth/DEAUTHENTICATE'),
		mergeMap(() => {
			/*
			 * get isRM and roomKey from current state
			 */
			const { isRM, roomKey } = state$.value.authReducer;

			/*
			 * notice other client that this client is leaving the room.
			 */
			socketio.emit('player-leave', roomKey, isRM);
			/*
			 * check if this client is room master, if so then delete roomKey
			 * in database, and make other client in the room leaves the room.
			 * (probably will fixed in the future so other random client would
			 * be the next RM if the current RM is leave the room
			 */
			printDevLog(`isRM: ${isRM}`);
			if (isRM) {
				/*
				 * delete roomKey on the database
				 */
				printDevLog('should execute delete room document');
				return from(deleteRoomKeyAPI(roomKey)).pipe(
					mergeMap(() => {
						/*
						 * and make isRM to be false, and reset room and username
						 */
						return [
							setIsRM(false),
							setRoomKey(''),
							setUsername(''),
							resetEdin(),
						];
					})
				);
			}

			/*
			 * if not, simply reset roomKey and username, and reset editor internal state
			 */
			return [setRoomKey(''), setUsername(''), resetEdin()];
		})
	);

/*
 * make socket emit player-join event (whether for creating or joining a room)
 */
export const socketEmitWeJoin$: MyTypes.AppEpic = (
	action$,
	_state$,
	{ socketio }
) =>
	action$.pipe(
		ofType('auth/AUTHENTICATE'),
		map(() => {
			const { roomKey, isRM, username } = _state$.value.authReducer;
			/*
			 * value param for emit: roomKey, username and isRM (is room master)
			 */
			printDevLog(`this player is rm ? ${isRM}`);
			socketio.emit('player-join', roomKey, username, isRM);
			printDevLog(`emitted player-join`);
			return setRoomKey(roomKey);
		})
	);
