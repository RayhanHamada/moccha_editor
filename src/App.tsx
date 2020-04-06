import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from './store/app-custom-types';

import EditorPage from './routes/editor/';
import LoginPage from './routes/login/';

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

export type AppProps = ReturnType<typeof mapStateToProps>;

const App = (props: AppProps) => {
	return (
		<Switch>
			<Route exact path="/" render={() => <LoginPage />} />
			<Route
				path="/"
				render={() =>
					props.authenticated ? (
						<EditorPage />
					) : (
						<div>You&rsquo;re not authenticated</div>
					)
				}
			/>
		</Switch>
	);
};

export default connect(mapStateToProps)(App);
