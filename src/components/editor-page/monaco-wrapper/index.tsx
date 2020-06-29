import { EditorContentManager } from '@convergencelabs/monaco-collab-ext';
import { bindActionCreators } from 'redux';
import React, { useEffect } from 'react';
import { editor } from 'monaco-editor';
import { connect } from 'react-redux';
import MonacoEditor, {
  ChangeHandler,
  EditorConstructionOptions,
} from 'react-monaco-editor';

import { MyTypes } from '../../../types/app-state';

import { incomingCodeChanges } from '../../../features/editor-internal/actions';
import socket from '../../../services/socketIO';
import { printDevLog } from '../../../utils';
import store from '../../../store';

import './index.scss';

/**
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
  shouldFreeze: editorInternalReducer.shouldFreeze,
  refreshCount: editorInternalReducer.refreshCount,
  savedCode: editorInternalReducer.currentlySavedCode,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
  bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

let editorRef: MonacoEditor;

const MonacoWrapper = (props: Props) => {
  const handleChange: ChangeHandler = val => {
    store.dispatch(incomingCodeChanges(val));
  };

  /**
   * ref for monaco editor
   */
  useEffect(() => {
    /**
     * if the current language is changed, update the editor.
     */
    editorRef?.forceUpdate(() => console.log('editor is updated !'));
  }, [props.lang]);

  /**
   * triggered everytime a new user join the room
   */
  useEffect(() => {
    editorRef.editor?.setValue(props.savedCode);
  }, [props.refreshCount]);

  useEffect(() => {
    /**
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

    /**
     * listening for any code change from server socket
     */
    socket.on('text-insertion', (insertion: string) => {
      const { idx, text }: AGT.TextChange = JSON.parse(insertion);

      ecm.insert(idx as number, text as string);
      printDevLog('receive insert');
    });

    socket.on('text-deletion', (deletion: string) => {
      const { idx, len }: AGT.TextChange = JSON.parse(deletion);

      ecm.delete(idx as number, len as number);
      printDevLog('receive delete');
    });

    socket.on('text-replacement', (replacement: string) => {
      const { idx, len, text }: AGT.TextChange = JSON.parse(replacement);

      ecm.replace(idx as number, len as number, text as string);
      printDevLog('receive replace');
    });

    return () => {
      /**
       * when component will unmount, turn off these socket listener
       */
      socket.off('text-insertion');
      socket.off('text-deletion');
      socket.off('text-replacement');
    };
  }, []);

  /**
   * freeze the editor for 3 second
   */
  useEffect(() => {
    editorRef.editor?.updateOptions({
      readOnly: props.shouldFreeze,
    });
  }, [props.shouldFreeze]);

  return (
    <div id="monaco-wrapper" className="ml-10 mb-8">
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

export default connect(mapStateToProps, mapDispatchToProps)(MonacoWrapper);
