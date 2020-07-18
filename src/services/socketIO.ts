import socketio from 'socket.io-client';

import store, { history } from '../store';
import { deauthenticate, setSocketID } from '../features/auth/actions';
import { serverUrl, supportedLanguages } from '../globals';
import {
  watchLangChange,
  setLanguage,
  editorFreeze,
  saveCode,
  refreshEditor,
} from '../features/editor-internal/actions';

import { printDevLog } from '../utils';
import {
  addPlayer,
  setPlayers,
  removePlayer,
} from '../features/player-manager/actions';

import routes from '../routes/routes-names';

/**
 * make socket connection to server
 */
const socket = socketio(serverUrl);

/**
 * on connected,
 */
socket.on('connect', () => {
  /**
   * get socket session id
   */
  const socketID = socket.id;

  printDevLog(`my socket id is ${socketID}`);

  /**
   * set it to reducer
   */
  store.dispatch(setSocketID(socketID));
});

/**
 * listener for language change
 */
socket.on('cl', (data: string) => {
  printDevLog('on change-language triggered !');

  const { langId }: Receiver.CL = JSON.parse(data);
  /**
   * find language in supportedLanguages that id === langID
   */
  const language = supportedLanguages.find(
    lang => lang.id === langId
  ) as AGT.Language;

  /**
   * turn off SelectLanguage onChange listener for a while
   * so the socket inside the listener won't emit
   */
  store.dispatch(watchLangChange(false));

  /**
   * dispatch change
   */
  store.dispatch(setLanguage(language));

  /**
   * turn on the SelectLanguage's onChange listener after finish
   */
  store.dispatch(watchLangChange(true));
});

/**
 * for when a player join a room
 */
socket.on('player-join', (data: string) => {
  /**
   * push new player's name to players
   */
  const { player }: Receiver.PlayerJoin = JSON.parse(data);

  printDevLog(`a player with name ${player.username} joined`);

  store.dispatch(addPlayer(player));

  /**
   * and dispatch editorFreeze (this may happen for at least 3 seconds),
   * so the joined player's editor content could be
   * synchronized with our editor's content thru
   * socket emit from epics
   */
  store.dispatch(editorFreeze());
});

/**
 * for when a player leave a room,
 */
socket.on('player_leave', (data: string) => {
  const { player }: Receiver.PlayerLeave = JSON.parse(data);
  /**
   * if the player that leave is RM, then deauthenticate
   */
  if (player.isRM) {
    store.dispatch(deauthenticate());
    history.replace(routes.home);
    alert('Room Master is leaving the Room !');
    return;
  }

  /**
   * remove leaving player from player list
   */
  store.dispatch(removePlayer(player));
  printDevLog(`should dispatch removePlayer`);
});

/**
 * on RM sent us(the recently joined player) for editor state synchronization
 */
socket.on('editor_sync', (data: string) => {
  const { code, langId, players }: Receiver.EditorSync = JSON.parse(data);
  /**
   * dispatch edin/SAVE_CODE action
   */
  store.dispatch(saveCode(code));

  /**
   * refresh the editor with updated value
   */
  store.dispatch(refreshEditor());

  /**
   * find language based on the currLangID
   */
  const lang = supportedLanguages.find(
    lang => lang.id === langId
  ) as AGT.Language;

  /**
   * make SelectLanguage to not listen for a while
   */
  store.dispatch(watchLangChange(false));
  store.dispatch(setLanguage(lang));
  store.dispatch(watchLangChange(true));

  /**
   * set all joined players
   */
  store.dispatch(setPlayers(players));
});

/**
 * for socket emit event
 */
function emit(eventName: Emitter.EventList) {
  socket.emit(eventName.name, JSON.stringify(eventName.data));
}

/**
 * make socket listen for event
 */
function on(
  eventName: Emitter.EventList['name'],
  fn: (...args: any[]) => void
) {
  return socket.on(eventName, fn);
}

/**
 * make socket stop listen for an event
 */
function off(
  eventName: Emitter.EventList['name'],
  fn?: (...args: any[]) => void
) {
  return socket.off(eventName, fn);
}

const socketService = {
  emit,
  on,
  off,
};

export default socketService;
