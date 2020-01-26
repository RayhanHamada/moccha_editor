import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createRootReducer from './rootReducer';
import { createBrowserHistory } from 'history';
import { MyTypes } from '../types';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const appliedMiddleware = applyMiddleware(
	...[thunk, routerMiddleware(history)]
);
const composeWith =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(appliedMiddleware)
		: compose(appliedMiddleware);

const configureStore = (preloadedState: Partial<MyTypes.RootState> = {}) =>
	createStore(createRootReducer(history), preloadedState, composeWith);

const store = configureStore(/*override this parameter if you desire different initial state for your store */)

export default store;
