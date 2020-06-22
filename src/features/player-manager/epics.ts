import { MyTypes } from '../../store/app-custom-types';
import { ofType } from 'redux-observable';
import { tap, delay, mapTo } from 'rxjs/operators';
import { printDevLog } from '../../utils';
import { editorUnfreeze } from '../editor-internal/actions';

export const freezeEditor: MyTypes.AppEpic = (action$, state$, { socketio }) =>
	action$.pipe(
		ofType('edin/EDITOR_FREEZE'),
		/**
		 * and if we're a room master, emit content_synchronize socket event
		 */
		tap(() => {
			const { isRM, roomKey } = state$.value.authReducer;
			const {
				currentlySavedCode,
				currentLanguage,
			} = state$.value.editorInternalReducer;

			/**
			 * get language ID to be sent
			 */
			const langID = currentLanguage.id;

			/**
			 * get recently joined player
			 */
			const { players } = state$.value.playerManagerReducer;
			const recentPlayerSocketID = players[players.length - 1].socketID;

			/**
			 * stringify every non (string | primitives types)
			 */

			const stringifiedPlayers: string = JSON.stringify(players);

			/**
			 * if we're the RM, then it's our responsibility to
			 * make the recently joined player synchronize their
			 * state
			 */
			if (isRM) {
				/**
				 * emit content_sync
				 */
				socketio.emit(
					'editor_sync',
					roomKey,
					recentPlayerSocketID,
					currentlySavedCode,
					langID,
					stringifiedPlayers
				);
				printDevLog(`socket should emit content_synchronize`);
			}
		}),
		/**
		 * delay it for at least 3 seconds
		 */
		delay(3000),

		/**
		 * unfreeze the editor, back to normal
		 */
		mapTo(editorUnfreeze())
	);
