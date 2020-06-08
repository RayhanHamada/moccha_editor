import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
import { printDevLog } from './utils';
import App from './App';

import 'tailwindcss/dist/tailwind.css';
import './style.scss';

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app')
);

printDevLog(process.env.MOCK_BASE_SERVER_URL as string);
