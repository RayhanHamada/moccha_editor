import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from './store/app-custom-types';

import EditorPage from './routes/editor/';
import LoginPage from './routes/login/';
import routes from './routes/routes-names';

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

export type AppProps = ReturnType<typeof mapStateToProps>;

const App = (props: AppProps) => {
	return (
		<Switch>
			<Route exact path={routes.home} render={() => <LoginPage />} />
			<Route
				path={routes.editor}
				render={() =>
					true ? <EditorPage /> : <div>You&rsquo;re not authenticated</div>
				}
			/>
		</Switch>
	);
};

export default connect(mapStateToProps)(App);
