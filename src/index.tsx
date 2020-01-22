import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage';

import './style.scss';

// override the parameter if you desire a different initial state for your store
const store = configureStore(/*override this parameter if you desire different initial state for your store */);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact={true} path="/" render={() => <LoginPage />} />
				<Route path="/editor" render={() => <div>Editor Page, Hooray</div>} />
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);
