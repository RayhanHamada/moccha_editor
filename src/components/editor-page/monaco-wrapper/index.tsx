import { EditorContentManager } from '@convergencelabs/monaco-collab-ext';
import { bindActionCreators } from 'redux';
import React, { useEffect } from 'react';
import { editor } from 'monaco-editor';
import { connect } from 'react-redux';
import MonacoEditor, {
  ChangeHandler,
  EditorConstructionOptions,
} from 'react-monaco-editor';

import { MyTypes } from '../../../types/app-store';

import { incomingCodeChanges } from '../../../features/editor-internal/actions';
import services from '../../../services';
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

const mapStateToProps = ({ edin, auth }: MyTypes.RootState) => ({
  lang: edin.currentLanguage,
  editorInitialValue: edin.currentlySavedCode,
  roomKey: auth.roomKey,
  shouldFreeze: edin.shouldFreeze,
  refreshCount: edin.refreshCount,
  savedCode: edin.currentlySavedCode,
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
    const { socketService } = services;
    /**
     * if mounted, bind editor to ChangeEditorManager
     */
    const ecm = new EditorContentManager({
      editor: editorRef.editor as editor.IStandaloneCodeEditor,

      /**
       * collaborative editor events
       */
      onInsert: function(idx, text) {
        socketService.emit({
          name: 'text-insertion',
          data: {
            roomKey: props.roomKey,
            idx,
            text,
          },
        });
        printDevLog(`trigger insert`);
      },
      onDelete: function(idx, len) {
        socketService.emit({
          name: 'text-deletion',
          data: {
            roomKey: props.roomKey,
            idx,
            len,
          },
        });
        // socket.emit('text-deletion', props.roomKey, JSON.stringify(deletion));
        printDevLog(`trigger delete`);
      },
      onReplace: function(idx, len, text) {
        socketService.emit({
          name: 'text-replacement',
          data: {
            roomKey: props.roomKey,
            idx,
            len,
            text,
          },
        });

        printDevLog(`trigger replace`);
      },
    });

    /**
     * listening for any code change from server socket
     */
    socketService.on('text-insertion', (insertion: string) => {
      const { idx, text }: AGT.TextChange = JSON.parse(insertion);

      ecm.insert(idx as number, text as string);
      printDevLog('receive insert');
    });

    socketService.on('text-deletion', (deletion: string) => {
      const { idx, len }: AGT.TextChange = JSON.parse(deletion);

      ecm.delete(idx as number, len as number);
      printDevLog('receive delete');
    });

    socketService.on('text-replacement', (replacement: string) => {
      const { idx, len, text }: AGT.TextChange = JSON.parse(replacement);

      ecm.replace(idx as number, len as number, text as string);
      printDevLog('receive replace');
    });

    return () => {
      /**
       * when component will unmount, turn off these socket listener
       */
      socketService.off('text-insertion');
      socketService.off('text-deletion');
      socketService.off('text-replacement');
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
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MonacoWrapper);
