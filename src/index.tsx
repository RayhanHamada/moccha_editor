import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './store';
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

console.log(
	`is base server is right ${(process.env.BASE_SERVER_URL as string) ===
		'https://moccha-text-editor-backend.herokuapp.com'}`
);
