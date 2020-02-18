import { createReducer } from 'typesafe-actions';

const initState: AppFeatures.EditorInternal = {
	isRunning: false,
	language: 'typescript',
};

export default createReducer(initState).handleType(
	'ed-internal/SET_LANG',
	(state, action) => ({
		...state,
		language: action.payload,
	})
);
