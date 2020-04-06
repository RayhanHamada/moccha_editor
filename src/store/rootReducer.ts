import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';

import authReducer from '../features/auth/reducer';
import editorInternalReducer from '../features/editor-internal/reducer';
import playerManagerReducer from '../features/player-manager/reducer';

const createRootReducer = (history: History) =>
	combineReducers({
		router: connectRouter(history),
		authReducer,
		editorInternalReducer,
		playerManagerReducer,
	});

export default createRootReducer;
