import { createReducer } from 'typesafe-actions';
import { supportedLanguages } from '../../globals';

const initState: AppFeatures.EditorInternal = {
	consoleOutput: 'Wello There !',
	currentlySavedCode: '',
	isRunning: false,

	/*
	 * currentLanguage would be Typescript, which has id of 74
	 */
	currentLanguage: supportedLanguages.find(
		val => val.id === 74
	) as AppGlobalTypes.Language,
};

const editorInternalReducer = createReducer(initState)
	.handleType('ed-internal/SET_LANG', (state, action) => ({
		...state,
		currentLanguage: action.payload,
	}))

	.handleType('ed-internal/SET_CONSOLE_OUTPUT', (state, action) => ({
		...state,
		consoleOutput: action.payload,
	}))

	.handleType('ed-internal/SAVE_CODE', (state, action) => ({
		...state,
		currentlySavedCode: action.payload,
	}));

export default editorInternalReducer;
