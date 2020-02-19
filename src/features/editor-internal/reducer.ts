import { createReducer } from 'typesafe-actions';

const initState: AppFeatures.EditorInternal = {
	isRunning: false,
	language: 'typescript',
	consoleOutput: 'Wello There !',
};

export default createReducer(initState)
	.handleType('ed-internal/SET_LANG', (state, action) => ({
		...state,
		language: action.payload,
	}))

	.handleType('ed-internal/SET_CONSOLE_OUTPUT', (state, action) => ({
		...state,
		consoleText: action.payload,
	}));
