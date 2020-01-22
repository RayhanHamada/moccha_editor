import { createReducer } from 'typesafe-actions';

const initialState = {
	count: 0,
};

const counterReducer = createReducer(initialState)
	.handleType('INCREMENT', state => {
		return {
			...state,
			count: state.count + 1,
		};
	})

	.handleType('DECREMENT', state => {
		return {
			...state,
			count: state.count - 1,
		};
	})

	.handleType('INCREMENT_BY', (state, action) => {
		return {
			...state,
			count: state.count + action.payload.by,
		};
	})

	.handleType('DECREMENT_BY', (state, action) => {
		return {
			...state,
			count: state.count - action.payload.by,
		};
	});

export default counterReducer;
