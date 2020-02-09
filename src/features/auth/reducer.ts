import { createReducer } from 'typesafe-actions';

const initialState: AppFeatures.Auth = {
	username: '',
	roomKey: '',
	authenticated: false,
};

const roomReducer = createReducer(initialState)
	.handleType('auth/SET_USERNAME', (state, action) => {
		return {
			...state,
			username: action.payload.username,
		};
	})

	.handleType('auth/SET_ROOM', (state, action) => ({
		...state,
		roomKey: action.payload.roomKey,
	}))

	.handleType('auth/AUTHENTICATE', state => ({
		...state,
		authenticated: true,
	}))

	.handleType('auth/DEAUTHENTICATE', state => ({
		...state,
		authenticated: false,
	}));

export default roomReducer;
