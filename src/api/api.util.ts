import axios from 'axios';

export const clearRoomKeysAPI = () =>
  axios.get(`${process.env.BASE_SERVER_URL}/api/auth/v1/clearRoomKeys`);
