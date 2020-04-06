import { MyTypes } from '../../store/app-custom-types';
import { ofType } from 'redux-observable';
import { tap, delay, mapTo } from 'rxjs/operators';
import { printDevLog } from '../../utils';
import { editorUnfreeze } from '../editor-internal/actions';

export const freezeEditor: MyTypes.AppEpic = (action$, state$, { socketio }) =>
	action$.pipe(
		ofType('edin/EDITOR_FREEZE'),
		/*
		 * and if we're a room master, emit content_synchronize socket event
		 */
		tap(() => {
			const { isRM, roomKey } = state$.value.authReducer;
			const { currentlySavedCode } = state$.value.editorInternalReducer;

			/*
			 * get recently joined player
			 */
			const { players } = state$.value.playerManagerReducer;
			const lastPlayer = players[players.length - 1];

			if (isRM) {
				/*
				 * emit content_sync
				 */
				socketio.emit(
					'content_sync',
					roomKey,
					lastPlayer.socketID,
					currentlySavedCode
				);
				printDevLog(`socket should emit content_synchronize`);
			}
		}),
		delay(3000),
		mapTo(editorUnfreeze())
	);
