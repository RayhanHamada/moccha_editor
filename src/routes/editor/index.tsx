import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';

import { MyTypes } from '../../store/app-custom-types';

import * as edinActions from '../../features/editor-internal/actions';
import * as authActions from '../../features/auth/actions';
import { printDevLog } from '../../utils';
import { history } from '../../store';
import routes from '../routes-names';

import MonacoWrapper from '../../components/editor-page/monaco-wrapper';
import TerminalWrapper from '../../components/editor-page/terminal';
import ToolBox from '../../components/editor-page/toolbox';

import './index.scss';

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			deauthenticate: authActions.deauthenticate,
			resetEdin: edinActions.resetEdin,
		},
		dispatch
	);

const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});
type EditorProps = ReturnType<typeof mapDispatchToProps> &
	ReturnType<typeof mapStateToProps>;

const EditorPage = (props: EditorProps) => {
	/*
	 * when user go back to login page, do deauth, reset editor internal state, and replace route with '/'
	 */
	window.onpopstate = function() {
		props.deauthenticate();
		printDevLog('deauthenticated !');
		props.resetEdin();
		history.replace(routes.home);
	};

	/*
	 * triggered when props.authenticated is false
	 * example: when RM is leave the room (player-leave socket event) triggered
	 */
	useEffect(() => {
		if (!props.authenticated) {
			props.resetEdin();
			history.replace(routes.home);
			printDevLog('should be back to login');
		}
	}, [props.authenticated]);

	return (
		<div id="wrapper-editor" className="w-screen h-screen flex flex-row">
			<div className="code-panel flex-col">
				<p className="text-2xl opacity-75 pl-10 mb-1">Moccha Text Editor</p>
				<hr style={{ borderColor: 'black' }} />
				<ToolBox />
				<MonacoWrapper />
			</div>
			<div className="comm-panel border border-black">
				<TerminalWrapper />
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
