import React from 'react';
import { Switch, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import EditorPage from './pages/EditorPage';
import { MyTypes } from './types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = ({ joinRoomReducer }: MyTypes.RootState) => ({
	authenticated: joinRoomReducer.authenticated,
});

const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
	bindActionCreators({}, dispatch);

type AppProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const App = (props: AppProps) => {
	return (
		<Switch>
			<Route exact={true} path="/" render={() => <LoginPage />} />
			<Route
				path="/editor"
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
