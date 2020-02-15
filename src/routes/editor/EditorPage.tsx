import React from 'react';
import { connect } from 'react-redux';

import { EditorProps, mapStateToProps, mapDispatchToProps } from './logics';

import 'tailwindcss/dist/tailwind.css';
import './EditorPage.scss';
import MonacoWrapper from '../../components/editor-page/MonacoWrapper';

const EditorPage = (props: EditorProps) => {
	window.onunload = window.onbeforeunload = window.onpopstate = function() {
		props.deauthenticate();
	};

	return (
		<div id="wrapper-editor" className="w-screen h-screen flex flex-row">
			<div className="code-panel flex-col">
				<p className="text-2xl opacity-75 pl-10 mb-1">Moccha Text Editor</p>
				<hr style={{ borderColor: 'black' }} />
				<div className="tool-box flex flex-row">
					<button className="run-code mx-10 my-2 border border-black p-1 rounded flex flex-row items-center">
						<i className="fa fa-play-circle-o fa-2x"></i>
						<span className="ml-1">Run Code</span>
					</button>
				</div>
				<MonacoWrapper />
			</div>
			<div className="comm-panel border border-black">
				<p>Panel 2</p>
			</div>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
