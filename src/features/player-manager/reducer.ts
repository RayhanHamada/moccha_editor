import { createReducer } from 'typesafe-actions';

const initialState: AppFeatures.PlayerManager = {
	roomMaster: '',
	players: [],
	isPlayerOtwRoom: false,
	recentJoinedPlayer: {
		name: '',
		socketID: '',
	},
};

const playerManagerReducer = createReducer({
	...initialState,
} as AppFeatures.PlayerManager).handleType(
	'pm/ADD_PLAYER',
	(state, action) => ({
		...state,
		players: [...state.players, action.payload],
	})
);

export default playerManagerReducer;
