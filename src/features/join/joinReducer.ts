import { createReducer } from 'typesafe-actions';

const initialState = {
	username: '',
	room: '',
	authenticated: false,
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

	.handleType('@join/AUTH', state => ({
		...state,
		authenticated: true,
	}))

	.handleType('@join/DEAUTH', state => ({
		...state,
		authenticated: false,
	}));

export default joinReducer;
