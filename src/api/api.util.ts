import axios from 'axios';

export const clearRoomKeys = () =>
	axios.get(`${process.env.BASE_SERVER_URL}/api/auth/clearRoomKeys`);
