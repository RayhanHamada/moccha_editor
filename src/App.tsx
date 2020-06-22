import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { MyTypes } from './store/app-custom-types';

import EditorPage from './routes/editor/';
import LoginPage from './routes/login/';
import routes from './routes/routes-names';
import { setMyCursorColor } from './features/player-manager/actions';

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			setMyCursorColor: setMyCursorColor,
		},
		dispatch
	);

type AppProps = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const App = (props: AppProps) => {
	/**
	 * set our cursor color early when page App loaded
	 */
	useEffect(() => {
		props.setMyCursorColor();
	}, []);

	return (
		<Switch>
			<Route exact path={routes.home} render={() => <LoginPage />} />
			<Route
				path={routes.editor}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
