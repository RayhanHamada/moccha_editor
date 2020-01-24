import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import counterReducer from '../features/counter/counterReducer';
import authReducer from '../features/auth/authReducer';

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		counterReducer,
		authReducer,
	});

export default createRootReducer;