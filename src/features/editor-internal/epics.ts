import { map, debounceTime, mergeMap, delay } from 'rxjs/operators';
import { PayloadAction } from 'typesafe-actions';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';

import { fetchSubmissionToken, fetchSubmissionResult } from './actions';
import { MyTypes } from '../../types/app-state';
import { saveCode } from './actions';
import { createSubmissionAPI, getSubmissionAPI } from '../../api/judge0';

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
      const sourceCode = (action as PayloadAction<
        'edin/INCOMING_CODE_CHANGES',
        string
      >).payload;

      /**
       * return saveCode func to be dispatched in the store
       */
      return saveCode(sourceCode);
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
      const languageID = state$.value.editorInternalReducer.currentLanguage.id;
      const srcCode = state$.value.editorInternalReducer.currentlySavedCode;
      /**
       * call fetchSubmissionToken API and pipe it's value (which is the token),
       * and dispatch fetchSubmissionToken.success action so the token will be saved
       */
      return from(createSubmissionAPI(languageID, srcCode)).pipe(
        map(token => {
          return fetchSubmissionToken.success(token);
        })
      );
    })
  );

/**
 *  get submission result from https://api.judge0.com
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
      const token = (action as PayloadAction<
        'edin/GOT_SUBMISSION_TOKEN' | 'edin/FETCH_SUBMISSION_RESULT',
        string
      >).payload;

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
