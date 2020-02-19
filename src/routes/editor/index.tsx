import React from 'react';
import { connect } from 'react-redux';

import { EditorProps, mapStateToProps, mapDispatchToProps } from './logics';
import MonacoWrapper from '../../components/editor-page/monaco-wrapper';
import TerminalWrapper from '../../components/editor-page/terminal';
import ToolBox from '../../components/editor-page/toolbox';

import './index.scss';

const EditorPage = (props: EditorProps) => {
	window.onunload = window.onbeforeunload = window.onpopstate = function() {
		props.deauthenticate();
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

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
