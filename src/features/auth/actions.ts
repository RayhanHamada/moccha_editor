import { createAction, createAsyncAction } from 'typesafe-actions';

/*
 * set client's username
 */
export const setUsername = createAction(
	'auth/SET_USERNAME',
	(username: string) => ({
		username,
	})
)();

/*
 * set the room
 */
export const setRoom = createAction('auth/SET_ROOM', (roomKey: string) => {
	return {
		roomKey,
	};
})();

/*
 * for checking existence of a room on the database
 */
export const checkRoomExistence = createAsyncAction(
	'auth/REQ_ROOM_EXISTENCE',
	'auth/GOT_ROOM_EXISTENCE',
	'auth/FAILED_ROOM_EXISTENCE'
)<undefined, boolean, Error>();

/*
 *  for get room existence
 */
export const getRoomExistence = createAsyncAction(
	'auth/REQ_ROOM_EXISTENCE',
	'auth/SUCCESS_ROOM_EXISTENCE',
	'auth/FAILED_ROOM_EXISTENCE'
)<string, boolean, any>();

/*
 * to set isRM
 */
export const setIsRM = createAction(
	'auth/SET_IS_RM',
	(isRM: boolean) => isRM
)();

/*
 * for authenticate user
 */

export const authenticate = createAction('auth/AUTHENTICATE')();

/*
 * deauthenticate
 */
export const deauthenticate = createAction('auth/DEAUTHENTICATE')();

/*
 * get the room key from the server
 */
export const getRoomKey = createAsyncAction(
	'auth/FETCH_ROOM_KEY',
	'auth/GOT_ROOM_KEY',
	'auth/FAIL_FETCH_ROOM_KEY'
)<undefined, { roomKey: string }, null>();
