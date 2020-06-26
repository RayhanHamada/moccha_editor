import { createReducer } from 'typesafe-actions';

const initialState: AppFeatures.PlayerManager = {
	players: [],
	isPlayerOtwRoom: false,
};

const playerManagerReducer = createReducer({
	...initialState,
} as AppFeatures.PlayerManager)
	.handleType('pm/ADD_PLAYER', (state, action) => ({
		...state,
		players: [...state.players, action.payload],
	}))

	.handleType('pm/SET_PLAYERS', (state, action) => ({
		...state,
		players: action.payload,
	}))

	.handleType('pm/REMOVE_PLAYER', (state, action) => ({
		...state,
		players: state.players.filter(
			player => player.username !== action.payload.username
		),
	}))

	.handleType('pm/CLEAR_PLAYERS', state => ({
		...state,
		players: [],
	}));
export default playerManagerReducer;
