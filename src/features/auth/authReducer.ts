import { createReducer } from 'typesafe-actions';

const initialState = {
	username: '',
	room: '',
	authenticated: false,
};

const roomReducer = createReducer(initialState)
	.handleType('auth/SET_USERNAME', (state, action) => {
		return {
			...state,
			username: action.payload.username,
		};
	})

	.handleType('auth/SET_ROOM', (state, action) => {
		return {
			...state,
			room: action.payload.room,
		};
	})

	.handleType('auth/AUTHENTICATE', state => ({
		...state,
		authenticated: true,
	}))

	.handleType('auth/DEAUTHENTICATE', state => ({
		...state,
		authenticated: false,
	}));

export default roomReducer;
