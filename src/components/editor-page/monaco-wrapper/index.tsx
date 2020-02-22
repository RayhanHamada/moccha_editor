import MonacoEditor from 'react-monaco-editor';
import { connect } from 'react-redux';
import React from 'react';

import {
	MonacoWraperProps,
	mapDispatchToProps,
	mapStateToProps,
	editorRef,
	options,
	handleChange,
	// editorWillMount,
	// editorDidMount,
} from './logics';

import './index.scss';

const MonacoWrapper = (props: MonacoWraperProps) => {
	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={380}
				width={850}
				theme="vs-dark"
				language={props.languageName}
				options={options}
				ref={editorRef}
				defaultValue={props.editorInitialValue}
				onChange={handleChange}
				// editorWillMount={editorWillMount}
				// editorDidMount={editorDidMount}
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoWrapper);
