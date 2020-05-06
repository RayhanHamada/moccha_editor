import socketio from 'socket.io-client';

import { serverUrl, supportedLanguages } from '../globals';
import { deauthenticate } from '../features/auth/actions';
import store, { history } from '../store';
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
	setMySocketID,
	removePlayer,
} from '../features/player-manager/actions';

/**
 * make socket connection to server
 */
const socket = socketio(serverUrl);

/**
 * on connected,
 */
socket.on('connect', () => {
	/*
	 * get socket session id
	 */
	const socketID = socket.id;
	printDevLog(`my socket id is ${socketID}`);

	/*
	 * set it to reducer
	 */
	store.dispatch(setMySocketID(socketID));
});

/**
 * listener for language change
 */
socket.on('cl', (langID: number) => {
	printDevLog('on change-language triggered !');
	/*
	 * find language in supportedLanguages that id === langID
	 */
	const language = supportedLanguages.find(
		lang => lang.id === langID
	) as AGT.Language;

	/*
	 * turn off SelectLanguage onChange listener for a while
	 * so the socket inside the listener won't emit
	 */
	store.dispatch(watchLangChange(false));

	/*
	 * dispatch change
	 */

	store.dispatch(setLanguage(language));

	/*
	 * turn on the SelectLanguage's onChange listener after finish
	 */
	store.dispatch(watchLangChange(true));
});

/**
 * for when a player join a room
 */
socket.on('player-join', (playerName: string, clientID: string) => {
	printDevLog(`a player with name ${playerName} joined`);

	/*
	 * push new player's name to players
	 */
	store.dispatch(
		addPlayer({
			name: playerName,
			socketID: clientID,
		})
	);

	/*
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
socket.on('player_leave', (isRM: boolean, thatPlayerData: string) => {
	/*
	 * if the player that leave is RM, then deauthenticate
	 */
	if (isRM) {
		store.dispatch(deauthenticate());
		history.replace('/');
		alert('You were leaving because room Master is leaving the Room');
		return;
	}

	/*
	 * remove leaving player from player list
	 */
	const thatPlayer = JSON.parse(thatPlayerData) as AppFeatures.Player;
	store.dispatch(removePlayer(thatPlayer));
	printDevLog(`should dispatch removePlayer`);
});

/**
 * on RM sent us(the recently joined player) for editor state synchronization
 */
socket.on(
	'editor_sync',
	(code: string, currLangID: number, stringifiedPlayers: string) => {
		/*
		 * dispatch edin/SAVE_CODE action
		 */
		store.dispatch(saveCode(code));

		/*
		 * refresh the editor with updated value
		 */
		store.dispatch(refreshEditor());

		/*
		 * find language based on the currLangID
		 */
		const lang = supportedLanguages.find(
			lang => lang.id === currLangID
		) as AGT.Language;

		/*
		 * make SelectLanguage to not listen for a while
		 */
		store.dispatch(watchLangChange(false));
		store.dispatch(setLanguage(lang));
		store.dispatch(watchLangChange(true));

		/*
		 * set all joined players
		 */
		const players = JSON.parse(stringifiedPlayers) as AppFeatures.Player[];

		store.dispatch(setPlayers(players));
	}
);

export default socket;
