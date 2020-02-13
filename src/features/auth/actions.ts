import { createAction, createAsyncAction } from 'typesafe-actions';

export const setUsername = createAction(
	'auth/SET_USERNAME',
	(username: string) => ({
		username,
	})
)();

export const setRoom = createAction('auth/SET_ROOM', (roomKey: string) => {
	return {
		roomKey,
	};
})();

export const authenticate = createAction('auth/AUTHENTICATE')();
export const deauthenticate = createAction('auth/DEAUTHENTICATE')();

export const getRoomKey = createAsyncAction(
	'auth/FETCH_ROOM_KEY',
	'auth/GOT_ROOM_KEY',
	'auth/FAIL_FETCH_ROOM_KEY'
)<undefined, { roomKey: string }, null>();
