const isDev = process.env.NODE_ENV === 'development';
export const BASE_SERVER_URL = process.env.BASE_SERVER_URL /* isDev 
	? (process.env.MOCK_BASE_SERVER_URL as string)
	: (process.env.BASE_SERVER_URL as string); */
