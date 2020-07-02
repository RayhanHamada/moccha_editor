import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';

import auth from '../features/auth/reducer';
import edin from '../features/editor-internal/reducer';
import pm from '../features/player-manager/reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    edin,
    pm,
  });

export default createRootReducer;
