import React from 'react';
import { connect } from 'react-redux';

import { EditorProps, mapStateToProps, mapDispatchToProps } from './logics';

import './EditorPage.scss';

const EditorPage = (props: EditorProps) => {
	window.onunload = window.onbeforeunload = window.onpopstate = function() {
		props.deauthenticate();
	};

	return (
		<div id="wrapper-editor" className="">
			<p>Page Editor</p>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
