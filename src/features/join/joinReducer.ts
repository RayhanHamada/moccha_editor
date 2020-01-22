import { createReducer } from 'typesafe-actions';

const initialState = {
	username: '',
	room: '',
};

const joinReducer = createReducer(initialState)
	.handleType('@join/SET_USERNAME', (state, action) => {
		return {
			...state,
			username: action.payload.username,
		};
	})

	.handleType('@join/SET_ROOM', (state, action) => {
		return {
			...state,
			room: action.payload.room,
		};
	})
	.handleType("@join/TO_EDITOR", (state) => {
		
	})
	;

export default joinReducer;
