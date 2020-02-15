import { mergeMap, map, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { MyTypes } from '../../store/app-custom-types';
import { getRoomKey as getRoomKeyAPI, deleteRoomKey } from '../../api/auth';
import { getRoomKey, authenticate, setUsername, setRoom } from './actions';

export const fetchRoomKey$: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('auth/FETCH_ROOM_KEY'),
		mergeMap(() =>
			from(getRoomKeyAPI()).pipe(
				map(roomKey => {
					console.log(roomKey);
					return getRoomKey.success({ roomKey });
				}),
				mergeMap(val => [val, authenticate()] as MyTypes.RootAction[])
			)
		)
	);

export const deauthenticate$: MyTypes.AppEpic = (action$, state$) =>
	action$.pipe(
		ofType('auth/DEAUTHENTICATE'),
		// delete roomKey first
		mergeMap(action => {
			// get the current roomKey
			const roomKey = state$.value.authReducer.roomKey;
			return from(deleteRoomKey(roomKey)).pipe(
				mergeMap(() => [setUsername(''), setRoom('')])
			);
		})
	);
