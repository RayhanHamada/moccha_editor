import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MyTypes } from '../types';
import * as joinRoomActions from '../features/join/joinAction';

import './EditorPage.scss';

const mapStateToProps = ({}: MyTypes.RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
	bindActionCreators(
		{
			deauthenticate: joinRoomActions.deauthenticate,
		},
		dispatch
	);

type EditorProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

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
