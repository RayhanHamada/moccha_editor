import { createAction } from 'typesafe-actions';

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
