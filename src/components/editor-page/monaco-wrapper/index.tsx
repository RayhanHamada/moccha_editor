import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MonacoEditor, {
	ChangeHandler,
	EditorConstructionOptions,
} from 'react-monaco-editor';

import { MyTypes } from '../../../store/app-custom-types';

import { incomingCodeChanges } from '../../../features/editor-internal/actions';
import store from '../../../store';

import './index.scss';

/*
 * props for monaco-editor
 */


// const editorDidMount: EditorDidMount = (editor) => {
// 	editor.
// }

const options: EditorConstructionOptions = {
	autoClosingBrackets: 'languageDefined',
	acceptSuggestionOnEnter: 'smart',
	fontSize: 13,
};

const mapStateToProps = ({ editorInternalReducer, authReducer }: MyTypes.RootState) => ({
	lang: editorInternalReducer.currentLanguage,
	editorInitialValue: editorInternalReducer.currentlySavedCode,
	roomKey: authReducer.roomKey
});

type MonacoWraperProps = ReturnType<typeof mapStateToProps>;

const MonacoWrapper = (props: MonacoWraperProps) => {
	const handleChange: ChangeHandler = (val, ev) => {
		store.dispatch(incomingCodeChanges(val));
	};

	/*
	 * ref for monaco editor
	 */
	const editorRef = createRef<MonacoEditor>();

	useEffect(() => {
		/*
		 * if the current language is changed, update the editor.
		 */
		editorRef.current?.forceUpdate(() => console.log('editor is updated !'));
	}, [props.lang]);

	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={380}
				width={850}
				theme="vs-dark"
				language={props.lang.nameInEditor}
				options={options}
				ref={editorRef}
				defaultValue={props.editorInitialValue}
				onChange={handleChange}
				// editorDidMount={}
			/>
		</div>
	);
};

export default connect(mapStateToProps)(MonacoWrapper);
