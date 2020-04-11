import { createReducer } from 'typesafe-actions';

const initialState: AppFeatures.PlayerManager = {
	me: {
		name: '',
		socketID: '',
	},
	roomMaster: {
		name: '',
		socketID: '',
	},
	players: [],
	isPlayerOtwRoom: false,
	recentJoinedPlayer: {
		name: '',
		socketID: '',
	},
};

const playerManagerReducer = createReducer({
	...initialState,
} as AppFeatures.PlayerManager)
	.handleType('pm/SET_MY_USERNAME', (state, action) => ({
		...state,
		me: {
			...state.me,
			name: action.payload,
		},
	}))

	.handleType('pm/SET_MY_SOCKETID', (state, action) => ({
		...state,
		me: {
			...state.me,
			socketID: action.payload,
		},
	}))

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
			player => player.name !== action.payload.name
		),
	}))

	.handleType('pm/CLEAR_PLAYERS', state => ({
		...state,
		players: [],
	}))

	.handleType('pm/SET_RM', (state, action) => ({
		...state,
		roomMaster: action.payload,
	}));

export default playerManagerReducer;
