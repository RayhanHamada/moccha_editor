import { MyTypes } from '../store/app-custom-types';

export const mockState: Partial<MyTypes.RootState> = {
	authReducer: {
		username: '',
		roomKey: '',
		authenticated: false,
	},
	counterReducer: {
		count: 0,
	},
};
