import React, { useEffect } from 'react';
import { EditorContentManager } from '@convergencelabs/monaco-collab-ext';
import { connect } from 'react-redux';
import { editor } from 'monaco-editor';
import MonacoEditor, {
	ChangeHandler,
	EditorConstructionOptions,
} from 'react-monaco-editor';

import { MyTypes } from '../../../store/app-custom-types';

import { incomingCodeChanges } from '../../../features/editor-internal/actions';
import socket from '../../../services/socketIO';
import { printDevLog } from '../../../utils';
import store from '../../../store';

import './index.scss';

/*
 * props for monaco-editor
 */
const options: EditorConstructionOptions = {
	autoClosingBrackets: 'languageDefined',
	acceptSuggestionOnEnter: 'smart',
	fontSize: 13,
};

const mapStateToProps = ({
	editorInternalReducer,
	authReducer,
}: MyTypes.RootState) => ({
	lang: editorInternalReducer.currentLanguage,
	editorInitialValue: editorInternalReducer.currentlySavedCode,
	roomKey: authReducer.roomKey,
});

type MonacoWraperProps = ReturnType<typeof mapStateToProps>;

let editorRef: MonacoEditor;

/*
 * additional code for managing code change
 */

let shouldWatchChange = true;

const MonacoWrapper = (props: MonacoWraperProps) => {
	const handleChange: ChangeHandler = (val, ev) => {
		store.dispatch(incomingCodeChanges(val));
	};

	/*
	 * ref for monaco editor
	 */

	useEffect(() => {
		/*
		 * if the current language is changed, update the editor.
		 */
		editorRef?.forceUpdate(() => console.log('editor is updated !'));
	}, [props.lang]);

	useEffect(() => {
		/*
		 * if mounted, bind editor to ChangeEditorManager
		 */

		const ecm = new EditorContentManager({
			editor: editorRef.editor as editor.IStandaloneCodeEditor,
			onInsert: function(idx, text) {
				const insertion: AGT.TextChange = {
					idx,
					text,
				};

				socket.emit('text-insertion', props.roomKey, JSON.stringify(insertion));
				printDevLog(`trigger insert`);
			},
			onDelete: function(idx, len) {
				const deletion: AGT.TextChange = {
					idx,
					len,
				};

				socket.emit('text-deletion', props.roomKey, JSON.stringify(deletion));
				printDevLog(`trigger delete`);
			},
			onReplace: function(idx, len, text) {
				const replacement: AGT.TextChange = {
					idx,
					len,
					text,
				};

				socket.emit(
					'text-replacement',
					props.roomKey,
					JSON.stringify(replacement)
				);
				printDevLog(`trigger replace`);
			},
		});

		socket.on('text-insertion', (insertion: string) => {
			const { idx, text }: AGT.TextChange = JSON.parse(insertion);

			shouldWatchChange = false;
			ecm.insert(idx as number, text as string);
			shouldWatchChange = true;
			printDevLog('receive insert');
		});

		socket.on('text-deletion', (deletion: string) => {
			const { idx, len }: AGT.TextChange = JSON.parse(deletion);

			shouldWatchChange = false;
			ecm.delete(idx as number, len as number);
			shouldWatchChange = true;
			printDevLog('receive delete');
		});

		socket.on('text-replacement', (replacement: string) => {
			const { idx, len, text }: AGT.TextChange = JSON.parse(replacement);

			shouldWatchChange = false;
			ecm.replace(idx as number, len as number, text as string);
			shouldWatchChange = true;
			printDevLog('receive replace');
		});

		return () => {
			/*
			 * when component will unmount, turn off these socket listener
			 */
			socket.off('text-insertion');
			socket.off('text-deletion');
			socket.off('text-replacement');
		};
	}, []);

	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={380}
				width={850}
				theme="vs-dark"
				language={props.lang.nameInEditor}
				options={options}
				ref={el => (editorRef = el as MonacoEditor)}
				defaultValue={props.editorInitialValue}
				onChange={handleChange}
				// editorDidMount={}
			/>
		</div>
	);
};

export default connect(mapStateToProps)(MonacoWrapper);
