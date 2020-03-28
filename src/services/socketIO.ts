import socketio from 'socket.io-client';

import { serverUrl, supportedLanguages } from '../globals';
import store from '../store';
import {
	watchLangChange,
	setLanguage,
} from '../features/editor-internal/actions';
import { printDevLog } from '../utils';

const socket = socketio(serverUrl);

/*
 * listener for language change
 */
socket.on('change-language', (langID: number) => {
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

socket.on('player-join', (playerName: string) => {
	printDevLog(`a player with name ${playerName} joined`);
});

export default socket;
