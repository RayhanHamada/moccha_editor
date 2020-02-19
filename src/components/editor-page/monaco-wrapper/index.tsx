import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import React from 'react';

import {
	editorRef,
	editorWillMount,
	editorDidMount,
	options,
	MonacoWraperProps,
	mapStateToProps,
	mapDispatchToProps,
	initialValue,
} from './logics';

import './index.scss';

const MonacoWrapper = (props: MonacoWraperProps) => {
	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={350}
				width={900}
				theme="vs-dark"
				language={props.language}
				options={options}
				ref={editorRef}
				editorWillMount={editorWillMount}
				editorDidMount={editorDidMount}
				defaultValue={initialValue}
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoWrapper);
