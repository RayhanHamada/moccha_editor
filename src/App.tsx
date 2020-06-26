import { Switch, Route } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { MyTypes } from './store/app-custom-types';

import EditorPage from './routes/editor/';
import LoginPage from './routes/login/';
import routes from './routes/routes-names';
import * as authActions from './features/auth/actions';

const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			setMyCursorColor: authActions.setCursorColor,
		},
		dispatch
	);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const App = (props: Props) => {
	/**
	 * set our cursor color randomly when page App loaded
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
