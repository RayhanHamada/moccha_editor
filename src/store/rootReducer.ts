import { combineReducers } from 'redux';
import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import counterReducer from '../features/counter/counterReducer';
import joinRoomReducer from '../features/join/joinReducer';

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		counterReducer,
		joinRoomReducer,
	});

export default createRootReducer;
