import { createAction, createAsyncAction } from 'typesafe-actions';

export const setLanguage = createAction(
	'edin/SET_LANG',
	(lang: AGT.Language) => lang
)();

export const watchLangChange = createAction(
	'edin/WATCH_LANG_CHANGE',
	(watch: boolean) => watch
)();

export const clearConsole = createAction('edin/CLEAR_CONSOLE')();

export const saveCode = createAction(
	'edin/SAVE_CODE',
	(code: string) => code
)();

export const fetchSubmissionToken = createAsyncAction(
	'edin/FETCH_SUBMISSION_TOKEN',
	'edin/GOT_SUBMISSION_TOKEN',
	'edin/FAIL_SUBMISSION_TOKEN'
)<undefined, string, Error>();

export const incomingCodeChanges = createAction(
	'edin/INCOMING_CODE_CHANGES',
	(code: string) => code
)();

export const runCode = createAction('edin/RUN_CODE')();

export const doneRunning = createAction('edin/DONE_RUNNING')();

export const fetchSubmissionResult = createAsyncAction(
	'edin/FETCH_SUBMISSION_RESULT',
	'edin/GOT_SUBMISSION_RESULT',
	'edin/FAIL_SUBMISSION_RESULT'
)<string, AppAPI.SubmissionResult, Error>();

export const resetEdin = createAction('edin/RESET')();
