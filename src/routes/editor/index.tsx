import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../store/app-custom-types';

import * as edinActions from '../../features/editor-internal/actions';
import * as authActions from '../../features/auth/actions';
import { history } from '../../store';

import MonacoWrapper from '../../components/editor-page/monaco-wrapper';
import TerminalWrapper from '../../components/editor-page/terminal';
import ToolBox from '../../components/editor-page/toolbox';

import './index.scss';
import { printDevLog } from '../../utils';

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			deauthenticate: authActions.deauthenticate,
			reset: edinActions.reset,
		},
		dispatch
	);

export type EditorProps = ReturnType<typeof mapDispatchToProps>;

const EditorPage = (props: EditorProps) => {
	window.onpopstate = function() {
		props.deauthenticate();
		printDevLog('deauthenticated !')
		props.reset();
		history.replace('/');
	};

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

export default connect(null, mapDispatchToProps)(EditorPage);
