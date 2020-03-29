import socketio from 'socket.io-client';

import { serverUrl, supportedLanguages } from '../globals';
import { resetAuth, deauthenticate } from '../features/auth/actions';
import store, { history } from '../store';
import {
	watchLangChange,
	setLanguage,
	resetEdin,
} from '../features/editor-internal/actions';

import { printDevLog } from '../utils';
import routes from '../routes/routes-names';

/*
 * make socket connection to server
 */
const socket = socketio(serverUrl);

/*
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

/*
 * for when a player join a room
 */
socket.on('player-join', (playerName: string) => {
	printDevLog(`a player with name ${playerName} joined`);
});

/*
 * for when a player leave a room,
 */
socket.on('player-leave', (isRM: boolean) => {
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
	TODO: make a player noticer
	*/
});

export default socket;
