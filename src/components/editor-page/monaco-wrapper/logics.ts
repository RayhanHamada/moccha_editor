import { createRef } from 'react';
import { bindActionCreators } from 'redux';
import MonacoEditor, {
	ChangeHandler,
	// EditorWillMount,
	// EditorDidMount,
	EditorConstructionOptions,
} from 'react-monaco-editor';

import { MyTypes } from '../../../store/app-custom-types';
import store from '../../../store';
import { incomingCodeChanges } from '../../../features/editor-internal/actions';

export const initialValue = `function hello(name: string) {
	return \`hello \${name} !\`;
}
`;

/*
 * props for monaco-editor
 */
export const editorRef = createRef<MonacoEditor>();

export const handleChange: ChangeHandler = (val, ev) => {
	store.dispatch(incomingCodeChanges(val));
};

// export const editorDidMount: EditorDidMount = editor => {};

// export const editorWillMount: EditorWillMount = monaco => {};

export const options: EditorConstructionOptions = {
	autoClosingBrackets: 'languageDefined',
	acceptSuggestionOnEnter: 'smart',
	fontSize: 13,
};

export const mapStateToProps = ({
	editorInternalReducer,
}: MyTypes.RootState) => ({
	languageName: editorInternalReducer.currentLanguage.nameInEditor,
});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

export type MonacoWraperProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
