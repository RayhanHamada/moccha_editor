import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { MyTypes } from '../../types/app-state';

import { printDevLog } from '../../utils';
import { resetEdin } from '../editor-internal/actions';
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
	getRoomExistence,
	setIsRM,
} from './actions';
import { addPlayer, clearPlayers } from '../player-manager/actions';

/**
 * triggered in case of client creating a room
 */
export const fetchRoomKey$: MyTypes.AppEpic = (action$, state$) =>
	action$.pipe(
		ofType('auth/FETCH_ROOM_KEY'),
		mergeMap(() =>
			/*
			 * get roomKey from the server
			 */
			from(getRoomKeyAPI()).pipe(
				mergeMap(roomKey => {
					/*
					 * when it's done, dispatch GOT_ROOM_KEY and ADD_PLAYER so our
					 * name will appears in joined friends list
					 */

					const { me } = state$.value.authReducer;

					return [getRoomKey.success({ roomKey }), addPlayer(me)];
				})
			)
		)
	);

/**
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

/**
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
		mergeMap(action => {
			/*
			 * if we're intended to join a room
			 */
			if (action.type === 'auth/SUCCESS_ROOM_EXISTENCE') {
				/*
				 * and the room is exists,
				 */
				if (action.payload) {
					// * then trigger SET_MY_CARET and AUTHENTICATE action
					return [authenticate()];
				}

				/*
				 * if not, then return cancel to join the room
				 */
				return [getRoomExistence.cancel()];
			}

			/*
			 * after we're intended to create a room
			 */
			return [authenticate()];
		})
	);

/**
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

/**
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
			 * get isRM, our data and roomKey from current state
			 */
			const { roomKey, me } = state$.value.authReducer;
			const stringifiedMe = JSON.stringify(me);

			/*
			 * notice other client that this client is leaving the room.
			 */
			socketio.emit('player_leave', roomKey, stringifiedMe);
			/*
			 * check if this client is room master, if so then delete roomKey
			 * in database, and make other client in the room leaves the room.
			 * (probably will fixed in the future so other random client would
			 * be the next RM if the current RM is leave the room
			 */
			printDevLog(`isRM: ${me.isRM}`);
			if (me.isRM) {
				/*
				 * delete roomKey on the database
				 */
				printDevLog('should execute delete room document');
				return from(deleteRoomKeyAPI(roomKey)).pipe(
					mergeMap(() => {
						/*
						 * and make isRM to be false, and reset room and username,
						 * and clear player list
						 */
						return [
							setRoomKey(''),
							setUsername(''),
							setIsRM(false),
							resetEdin(),
							clearPlayers(),
						];
					})
				);
			}

			/*
			 * if not, simply reset roomKey and username, and reset editor internal state
			 */
			return [setRoomKey(''), setUsername(''), resetEdin(), clearPlayers()];
		})
	);

/**
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
			const { roomKey, me } = _state$.value.authReducer;
			const strMe = JSON.stringify(me);
			/**
			 * value param for emit: roomKey, username and isRM (is room master)
			 */
			printDevLog(`this player is rm ? ${me.isRM}`);
			socketio.emit('player-join', roomKey, strMe);
			printDevLog(`emitted player-join`);
			return setRoomKey(roomKey);
		})
	);
