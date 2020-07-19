import { tap, delay, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { editorUnfreeze } from '../editor-internal/actions';
import { debugLog } from '../../utils';

import { MyTypes } from '../../types/app-store';

export const freezeEditor: MyTypes.AppEpic = (
  action$,
  state$,
  { socketService }
) =>
  action$.pipe(
    ofType('edin/EDITOR_FREEZE'),
    /**
     * and if we're a room master, emit content_synchronize socket event
     */
    tap(() => {
      const { me } = state$.value.auth;

      /**
       * if we're the RM, then it's our responsibility to
       * make the recently joined player synchronize their
       * state
       */
      if (me.isRM) {
        /**
         * get roomKey
         */
        const { roomKey } = state$.value.auth;

        /**
         * get saved code and current language
         */
        const { sourceCode, language } = state$.value.edin;

        /**
         * get language ID to be sent
         */
        const langId = language.id;

        /**
         * get recently joined player
         */
        const { players } = state$.value.pm;
        const recentPlayerSocketID = players[players.length - 1].socketID;

        /**
         * emit content_sync
         */
        socketService.emit({
          name: 'editor_sync',
          data: {
            recentClientId: recentPlayerSocketID,
            code: sourceCode,
            roomKey,
            langId,
            players,
          },
        });

        debugLog(`socket should emit editor_sync`);
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
