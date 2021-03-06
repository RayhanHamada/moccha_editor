import { map, debounceTime, mergeMap, delay, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { createSubmissionAPI, getSubmissionAPI } from '../../api/judge0';
import {
  fetchSubmissionToken,
  fetchSubmissionResult,
  setLanguage,
} from './actions';
import { MyTypes } from '../../types/app-store';
import { saveCode } from './actions';
import { supportedLanguages } from '../../globals';

/**
 * for saving code from editor every 2000 each time editor's onChange event
 * is triggered
 */
export const saveCode$: MyTypes.AppEpic = action$ =>
  action$.pipe(
    /**
     * detect incoming code changes action
     */
    ofType('edin/INCOMING_CODE_CHANGES'),
    debounceTime(2000),
    map(action => {
      /**
       * get payload as source code
       */
      const sourceCode =
        action.type === 'edin/INCOMING_CODE_CHANGES' ? action.payload : '';

      /**
       * return saveCode func to be dispatched in the store
       */
      return saveCode(sourceCode);
    })
  );

/**
 * for changeLanguage action event
 */
export const changeLanguage$: MyTypes.AppEpic = (
  action$,
  state$,
  { socketService }
) =>
  action$.pipe(
    ofType('edin/CHANGE_LANGUAGE'),
    map(action => {
      /**
       * the payload is number
       */
      const langId: number = (action as any).payload;

      const lang = supportedLanguages.find(
        lang => lang.id === langId
      ) as AGT.Language;

      /**
       * get roomKey
       */
      const { roomKey } = state$.value.auth;

      /**
       * emit socket event
       */
      socketService.emit({
        name: 'cl',
        data: {
          roomKey,
          langId,
        },
      });

      return setLanguage(lang);
    })
  );

/**
 * get submission token from https://api.judge0.com
 * TODO: add error handling with catchError
 */
export const fetchSubmissionToken$: MyTypes.AppEpic = (action$, state$) =>
  action$.pipe(
    /**
     * detect if fetchSubmissionToken.request is dispatched
     */
    ofType('edin/FETCH_SUBMISSION_TOKEN'),
    mergeMap(() => {
      /**
       * get the language id and source code from current state of editor internal's reducer
       */
      const { language, sourceCode } = state$.value.edin;

      /**
       * call fetchSubmissionToken API and pipe it's value (which is the token),
       * and dispatch fetchSubmissionToken.success action so the token will be saved
       */
      return from(createSubmissionAPI(language.id, sourceCode)).pipe(
        map(token => {
          return fetchSubmissionToken.success(token);
        })
      );
    })
  );

/**
 *  get submission result from https://api.judge0.com
 * TODO: separate edin/GOT_SUBMISSION_TOKEN action's epics (make gotSubmissionToken$)
 * TODO: add error handling with catchError
 */
export const fetchSubmissionResult$: MyTypes.AppEpic = action$ =>
  action$.pipe(
    /**
     * detect for either fetchSubmissionToken.success or fetchSubmissionResult.request
     * actions.
     */
    ofType('edin/GOT_SUBMISSION_TOKEN', 'edin/FETCH_SUBMISSION_RESULT'),
    mergeMap(action => {
      /**
       * cast action object to Payload Action and get it's payload as token
       */
      const token = (action as any).payload;

      /**
       * get submission result based on token value.
       */
      return from(getSubmissionAPI(token)).pipe(
        /**
         * delay the request fetching for 2 sec in case the our
         * submission result still processed or queued on the server
         */
        delay(2000),
        mergeMap(result => {
          /**
           * check if result is still in "Processing" status or "In Queue" status,
           * if so then dispatch fetchSubmission.request to run this epic again
           * Note for status:
           * "Processing"	has an id of 1
           * "In Queue" has an id of 2
           */
          if (result.status.id === 1 || result.status.id === 2) {
            return [fetchSubmissionResult.request(token)];
          }

          /**
           * but if the status is "Accepted", then return the result to the console
           * Note for status:
           * "Accepted" has an id of 3
           */
          return [fetchSubmissionResult.success(result)];
        })
      );
    })
  );
