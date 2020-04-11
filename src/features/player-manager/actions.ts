import { createAction } from 'typesafe-actions';

export const setMyUsername = createAction(
	'pm/SET_MY_USERNAME',
	(name: string) => name
)();

export const setMySocketID = createAction(
	'pm/SET_MY_SOCKETID',
	(socketID: string) => socketID
)();

export const addPlayer = createAction(
	'pm/ADD_PLAYER',
	(player: AppFeatures.Player) => player
)();

export const setPlayers = createAction(
	'pm/SET_PLAYERS',
	(players: AppFeatures.Player[]) => players
)();

export const removePlayer = createAction(
	'pm/REMOVE_PLAYER',
	(player: AppFeatures.Player) => player
)();

export const clearPlayers = createAction('pm/CLEAR_PLAYERS')();

export const otherPlayerJoin = createAction('pm/OTHER_PLAYER_JOIN')();

export const setRecentJoinedPlayer = createAction(
	'pm/SET_RECENT_PLAYER',
	(player: AppFeatures.Player) => player
)();

export const setRoomMaster = createAction(
	'pm/SET_RM',
	(rm: AppFeatures.Player) => rm
)();
