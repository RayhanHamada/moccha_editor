import { createAction, createAsyncAction } from 'typesafe-actions';

export const setLanguage = createAction(
	'ed-internal/SET_LANG',
	(lang: AppGlobalTypes.SupportedLanguage) => lang
)();

export const setConsoleOutput = createAction(
	'ed-internal/SET_CONSOLE_OUTPUT',
	(value: string) => value
)();
