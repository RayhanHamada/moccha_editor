import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import './style.scss';

// override the parameter if you desire a different initial state for your store
const store = configureStore(/*override this parameter if you desire different initial state for your store */);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);
