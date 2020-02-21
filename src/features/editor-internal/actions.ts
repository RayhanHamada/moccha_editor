import { createAction } from 'typesafe-actions';

export const setLanguage = createAction(
	'ed-internal/SET_LANG',
	(lang: AppGlobalTypes.Language) => lang
)();

export const setConsoleOutput = createAction(
	'ed-internal/SET_CONSOLE_OUTPUT',
	(value: string) => value
)();

export const saveCode = createAction(
	'ed-internal/SAVE_CODE',
	(code: string) => code
)();

export const incomingCodeChanges = createAction(
	'ed-internal/INCOMING_CODE_CHANGES',
	(code: string) => code
)();

export const runCode = createAction('ed-internal/RUN_CODE')();
