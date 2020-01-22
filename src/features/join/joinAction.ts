import { createAction } from 'typesafe-actions';

export const setUsername = createAction(
	'@join/SET_USERNAME',
	(username: string) => ({
		username,
	})
)();

export const setRoom = createAction('@join/SET_ROOM', (room: string) => ({
	room,
}))();

export const authenticate = createAction('@join/AUTH')();
export const deauthenticate = createAction('@join/DEAUTH')();
