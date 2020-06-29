import { createAction } from 'typesafe-actions';

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
