import { createAction } from 'typesafe-actions';

export const setUsername = createAction(
	'auth/SET_USERNAME',
	(username: string) => ({
		username,
	})
)();

export const setRoom = createAction('auth/SET_ROOM', (room: string) => ({
	room,
}))();

export const authenticate = createAction('auth/AUTHENTICATE')();
export const deauthenticate = createAction('auth/DEAUTHENTICATE')();
