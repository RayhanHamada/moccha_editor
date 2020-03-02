import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import LoginPage from './routes/login/';
import EditorPage from './routes/editor/';

import { mapStateToProps, mapDispatchToProps, AppProps } from './applogics';

const App = (props: AppProps) => {
	return (
		<Switch>
			<Route exact={true} path="/" render={() => <LoginPage />} />
			<Route
				path="/editor"
				render={() =>
					props.authenticated ? <EditorPage /> : <div>You&rsquo;re not authenticated</div>
				}
			/>
		</Switch>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);