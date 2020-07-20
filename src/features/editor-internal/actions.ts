import { createAction, createAsyncAction } from 'typesafe-actions';

/**
 * set the programming language
 */
export const setLanguage = createAction(
  'edin/SET_LANG',
  (lang: AGT.Language) => lang
)();

/**
 * should we watch for language change ?
 */
export const watchLangChange = createAction(
  'edin/WATCH_LANG_CHANGE',
  (watch: boolean) => watch
)();

export const changeLanguage = createAction(
  'edin/CHANGE_LANGUAGE',
  (langId: number) => langId
)();

/**
 * clearing console
 */
export const clearConsole = createAction('edin/CLEAR_CONSOLE')();

/**
 * saving code
 */
export const saveCode = createAction(
  'edin/SAVE_CODE',
  (code: string) => code
)();

/**
 * fetching submission token
 */
export const fetchSubmissionToken = createAsyncAction(
  'edin/FETCH_SUBMISSION_TOKEN',
  'edin/GOT_SUBMISSION_TOKEN',
  'edin/FAIL_SUBMISSION_TOKEN'
)<undefined, string, Error>();

/**
 *
 */
export const incomingCodeChanges = createAction(
  'edin/INCOMING_CODE_CHANGES',
  (code: string) => code
)();

/**
 * run code
 */
export const runCode = createAction('edin/RUN_CODE')();

export const doneRunning = createAction('edin/DONE_RUNNING')();

/**
 * fetching submission result from API
 */
export const fetchSubmissionResult = createAsyncAction(
  'edin/FETCH_SUBMISSION_RESULT',
  'edin/GOT_SUBMISSION_RESULT',
  'edin/FAIL_SUBMISSION_RESULT'
)<string, AppAPI.SubmissionResult, Error>();

/**
 * should the editor be freezed
 */
export const editorFreeze = createAction('edin/EDITOR_FREEZE')();

/**
 * should the editor be unfreezed
 */
export const editorUnfreeze = createAction('edin/EDITOR_UNFREEZE')();

/**
 * refresh editor
 */
export const refreshEditor = createAction('edin/REFRESH_EDITOR')();

/**
 * reset editor internal state
 */
export const resetEdin = createAction('edin/RESET')();
