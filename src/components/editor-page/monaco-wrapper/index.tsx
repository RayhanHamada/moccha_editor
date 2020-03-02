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
const handleChange: ChangeHandler = val => {
	store.dispatch(incomingCodeChanges(val));
};

const options: EditorConstructionOptions = {
	autoClosingBrackets: 'languageDefined',
	acceptSuggestionOnEnter: 'smart',
	fontSize: 13,
};

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	lang: editorInternalReducer.currentLanguage,
	editorInitialValue: editorInternalReducer.currentlySavedCode,
});

type MonacoWraperProps = ReturnType<typeof mapStateToProps>;

const MonacoWrapper = (props: MonacoWraperProps) => {
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
			/>
		</div>
	);
};

export default connect(mapStateToProps)(MonacoWrapper);
