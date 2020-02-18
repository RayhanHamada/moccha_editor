import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { createEpicMiddleware } from 'redux-observable';

import { MyTypes } from './app-custom-types';
import createRootReducer from './rootReducer';
import rootEpic from './root-epic';

export const history: History = createBrowserHistory();

const epicMiddleware = createEpicMiddleware<
	MyTypes.RootAction,
	MyTypes.RootAction,
	MyTypes.RootState
>();

const appliedMiddleware = applyMiddleware(
	epicMiddleware,
	routerMiddleware(history)
);
const composeWith =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools(appliedMiddleware)
		: compose(appliedMiddleware);

export const configureStore = (preloadedState: Partial<MyTypes.RootState>) =>
	createStore(
		createRootReducer(history),
		preloadedState as MyTypes.RootState,
		composeWith
	);

const store = configureStore(
	/*override this parameter if you desire different initial state for your store */ {}
);

epicMiddleware.run(rootEpic);

export default store;
