import { createReducer } from 'typesafe-actions';

const initialState: AppFeatures.Auth = {
	username: '',
	roomKey: '',
	authenticated: false,
	isLoading: false,
	loadingMsg: '',
	isRM: false,
};

const roomReducer = createReducer({ ...initialState } as AppFeatures.Auth)
	.handleType('auth/SET_USERNAME', (state, action) => ({
		...state,
		username: action.payload,
	}))

	.handleType('auth/SET_ROOM_KEY', (state, action) => ({
		...state,
		roomKey: action.payload,
	}))

	.handleType('auth/SET_IS_RM', (state, action) => ({
		...state,
		isRM: action.payload,
	}))

	.handleType('auth/AUTHENTICATE', state => ({
		...state,
		authenticated: true,
	}))

	.handleType('auth/DEAUTHENTICATE', state => ({
		...state,
		authenticated: false,
	}))

	.handleType('auth/REQ_ROOM_EXISTENCE', state => ({
		...state,
		isLoading: true,
		loadingMsg: `Checking room ${state.roomKey.slice(
			0,
			7
		)}... existence, please wait...`,
	}))

	.handleType('auth/SUCCESS_ROOM_EXISTENCE', state => ({
		...state,
		isLoading: false,
		loadingMsg: '',
	}))

	.handleType('auth/CANCEL_ROOM', state => ({
		...state,
		isLoading: false,
		loadingMsg: '',
	}))

	/*
	 * should show loading loop and loading message while app get the roomKey
	 */
	.handleType('auth/FETCH_ROOM_KEY', state => ({
		...state,
		isLoading: true,
		loadingMsg: 'Fetching key, please wait...',
	}))

	.handleType('auth/GOT_ROOM_KEY', (state, action) => ({
		...state,
		roomKey: action.payload.roomKey,

		/*
		 * stop showing loading loop and loading message
		 */
		isLoading: false,
		loadingMsg: '',
		/*
		 * because when the user got the room key means they're creating a room which means
		 * they're the room master, set isRM is true
		 */
		isRM: true,
	}))

	.handleType('auth/RESET', () => ({
		...initialState,
	}));

export default roomReducer;
