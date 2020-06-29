import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { createEpicMiddleware } from 'redux-observable';

import { MyTypes } from '../types/app-state';

import createRootReducer from './rootReducer';
import services from '../services';
import rootEpic from './root-epic';

/**
 * history object used for routing
 */
export const history: History = createBrowserHistory();

/**
 * epic middleware (from redux-observable)
 */
const epicMiddleware = createEpicMiddleware<
	MyTypes.RootAction,
	MyTypes.RootAction,
	MyTypes.RootState,
	MyTypes.Services
>({
	dependencies: services,
});

/**
 * applied middleware
 */
const appliedMiddleware = applyMiddleware(
	epicMiddleware,
	routerMiddleware(history)
);

/**
 * compose middleware with store, if in development mode, compose it with redux devtools,
 * if not, then compose it normally
 */
const composeWith =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(appliedMiddleware)
		: compose(appliedMiddleware);

/**
 * function for configuring store
 */
export const configureStore = (preloadedState: Partial<MyTypes.RootState>) =>
	createStore(
		createRootReducer(history),
		preloadedState as MyTypes.RootState,
		composeWith
	);

/**
 * create store for this app, override the object with something if
 * you want to provide initial value for app state
 */
const store = configureStore(
	/*override this parameter if you desire different initial state for your store */ {}
);

/**
 * this epic middleware should be run AFTER store is created
 */
epicMiddleware.run(rootEpic);

export default store;
