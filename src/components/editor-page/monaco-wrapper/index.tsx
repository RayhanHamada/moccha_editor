import MonacoEditor from 'react-monaco-editor';
import React from 'react';

import { editorRef, editorWillMount, editorDidMount, options } from './logics';

import './index.scss';

const MonacoWrapper = () => {
	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={400}
				width={900}
				theme="vs-dark"
				language="typescript"
				options={options}
				ref={editorRef}
				editorWillMount={editorWillMount}
				editorDidMount={editorDidMount}
			/>
		</div>
	);
};

export default MonacoWrapper;
