import { editor } from 'monaco-editor';
import MonacoEditor, {
	ChangeHandler,
	EditorWillMount,
	EditorDidMount,
	EditorConstructionOptions,
} from 'react-monaco-editor';
import { createRef } from 'react';

export const editorRef = createRef<MonacoEditor>();

export const handleChange: ChangeHandler = (val, ev) => {};

export const editorDidMount: EditorDidMount = editor => {};

export const editorWillMount: EditorWillMount = monaco => {};

export const options: EditorConstructionOptions = {
    autoClosingBrackets: 'languageDefined',
    acceptSuggestionOnEnter: 'smart',
    fontSize: 13
};
