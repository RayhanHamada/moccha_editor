import { editor } from 'monaco-editor';
import MonacoEditor, {
	ChangeHandler,
	EditorWillMount,
	EditorDidMount,
	EditorConstructionOptions,
} from 'react-monaco-editor';
import { createRef } from 'react';
import { MyTypes } from '../../../store/app-custom-types';
import { bindActionCreators } from 'redux';
import * as editorInternal from '../../../features/editor-internal/actions';

export const initialValue = `function hello(name: string) {
	return \`hello \${name} !\`;
}
`;

export const editorRef = createRef<MonacoEditor>();

export const handleChange: ChangeHandler = (val, ev) => {};

export const editorDidMount: EditorDidMount = editor => {};

export const editorWillMount: EditorWillMount = monaco => {};

export const options: EditorConstructionOptions = {
	autoClosingBrackets: 'languageDefined',
	acceptSuggestionOnEnter: 'smart',
	fontSize: 13,
};

export const mapStateToProps = ({
	editorInternalReducer,
}: MyTypes.RootState) => ({
	language: editorInternalReducer.language,
});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			setLanguage: editorInternal.setLanguage,
		},
		dispatch
	);

export type MonacoWraperProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
