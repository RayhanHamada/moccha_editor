import { createReducer } from 'typesafe-actions';
import { supportedLanguages } from '../../globals';

const initState: AppFeatures.EditorInternal = {
	consoleOutput: 'Wello There !',
	isRunning: false,

	/*
	 * currentLanguage would be Typescript, which has id of 74
	 */
	currentLanguage: supportedLanguages.find(
		val => val.id === 74
	) as AppGlobalTypes.Language,
};

export default createReducer(initState)
	.handleType('ed-internal/SET_LANG', (state, action) => ({
		...state,
		currentLanguage: action.payload,
	}))

	.handleType('ed-internal/SET_CONSOLE_OUTPUT', (state, action) => ({
		...state,
		consoleText: action.payload,
	}));
