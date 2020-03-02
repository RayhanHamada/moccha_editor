import socketio from 'socket.io-client';

const isDev = process.env.NODE_ENV === 'development';
const SOCKET_URL = isDev
	? (process.env.MOCK_BASE_SERVER_URL as string)
	: (process.env.BASE_SERVER_URL as string);

const socket = socketio(SOCKET_URL, { autoConnect: false });

export default socket;
