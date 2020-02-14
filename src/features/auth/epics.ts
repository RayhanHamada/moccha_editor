import { mergeMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { MyTypes } from '../../store/app-custom-types';
import { getRoomKey as getRoomKeyAPI } from '../../api/auth';
import { getRoomKey, authenticate } from './actions';
import { history } from '../../store';
import routes from '../../routes/routes-names';

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
