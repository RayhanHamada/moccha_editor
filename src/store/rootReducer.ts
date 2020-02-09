import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import counterReducer from '../features/counter/reducer';
import authReducer from '../features/auth/reducer';

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		counterReducer,
		authReducer,
	});

export default createRootReducer;