import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

export const clearRoomKeys = () =>
	axios.get(`${process.env.BASE_SERVER_URL}/api/auth/clearRoomKeys`);
