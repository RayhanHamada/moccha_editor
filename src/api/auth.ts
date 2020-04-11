import axios from 'axios';

import { serverUrl as BASE_SERVER_URL } from '../globals';

/*
 * auth api version used
 */
const apiVersion = 'v1';

const GET_AUTH_ENDPOINT = `${BASE_SERVER_URL}/api/auth/${apiVersion}`;
const GET_ROOM_KEY = `${BASE_SERVER_URL}/api/auth/${apiVersion}/getRoomKey`;
const CHECK_ROOM_EXISTENCE = `${BASE_SERVER_URL}/api/auth/${apiVersion}/checkRoomExistence`;
const GET_ROOM_KEYS = `${BASE_SERVER_URL}/api/auth/${apiVersion}/getRoomKeys`;
const DELETE_ROOM_KEY = `${BASE_SERVER_URL}/api/auth/${apiVersion}/deleteRoomKey`;

export const getAuthEndpoint = () =>
	axios.get(GET_AUTH_ENDPOINT).then(res => res.data as string);

export const getRoomKey = () =>
	axios.get(GET_ROOM_KEY).then(res => res.data.roomKey as string);

export const checkRoomExistence = (roomKey: string) =>
	axios
		.get(`${CHECK_ROOM_EXISTENCE}?roomKey=${roomKey}`)
		.then(res => res.data.exists as boolean);

export const getRoomKeys = () =>
	axios.get(GET_ROOM_KEYS).then(res => res.data.existedRoomKeys as string[]);

export const deleteRoomKey = (roomKey: string) =>
	axios
		.get(`${DELETE_ROOM_KEY}?roomKey=${roomKey}`)
		.then(res => res.data as string);
