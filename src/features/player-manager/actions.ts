import { createAction } from 'typesafe-actions';

export const addPlayer = createAction(
	'pm/ADD_PLAYER',
	(player: AppFeatures.Player) => player
)();

export const otherPlayerJoin = createAction('pm/OTHER_PLAYER_JOIN')();

export const setRecentJoinedPlayer = createAction(
	'pm/SET_RECENT_PLAYER',
	(player: AppFeatures.Player) => player
)();
