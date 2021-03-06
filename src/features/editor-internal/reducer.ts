import { createReducer } from 'typesafe-actions';
import { supportedLanguages } from '../../globals';

const initState: Features.EditorInternal = {
  sourceCode: ``,

  consoleOutput: 'Wello There !',

  isRunning: false,
  token: '',

  /**
   * currentLanguage default would be Typescript, which has id of 74
   * see https://api.judge0.com/languages/all
   */
  language: supportedLanguages.find(lang => lang.id === 74) as AGT.Language,

  /**
   * listen to language change from socket
   */
  watchLangChangeFromSocket: true,

  /**
   * whether the editor should be freezed (read-only state)
   */
  shouldFreeze: false,

  refreshCount: 0,
};

const reducer = createReducer(initState)
  /**
   * triggered when
   * => user set languages on select language components
   */
  .handleType('edin/SET_LANG', (state, action) => ({
    ...state,
    language: action.payload,
  }))

  .handleType('edin/WATCH_LANG_CHANGE', (state, action) => ({
    ...state,
    watchLangChangeFromSocket: action.payload,
  }))

  /**
   * triggered when
   * => each time user hit clear console button
   */
  .handleType('edin/CLEAR_CONSOLE', state => ({
    ...state,
    consoleOutput: '',
  }))

  /**
   * triggered when
   * => each editor's onChange method invoked (debounced)
   */
  .handleType('edin/SAVE_CODE', (state, action) => ({
    ...state,
    sourceCode: action.payload,
  }))

  /**
   * triggered when
   * => user hit run button
   */
  .handleType('edin/FETCH_SUBMISSION_TOKEN', state => ({
    ...state,
    isRunning: true,
  }))

  /**
   * triggered when
   * => success get the token
   */
  .handleType('edin/GOT_SUBMISSION_TOKEN', (state, action) => ({
    ...state,
    token: action.payload,
    consoleOutput: `${state.consoleOutput}\n> Code is Running\n`,
  }))

  /**
   * triggered when
   * => fetchSubmissionResult success get submission result
   */
  .handleType('edin/GOT_SUBMISSION_RESULT', (state, { payload }) => {
    const stdout = `${payload.stdout ?? ''}\n`;
    const stderr = `${payload.stdout ?? ''}\n`;
    const time = `Done in ${payload.time ?? ''} s`;
    const compOut = `${payload.compile_output ?? ''}\n`;
    const message = `${payload.message ?? ''}\n`;

    return {
      ...state,
      consoleOutput: `${state.consoleOutput}\n${stdout}${stderr}${compOut}${message}${time}`,
      isRunning: false,
    };
  })

  .handleType('edin/EDITOR_FREEZE', state => ({
    ...state,
    shouldFreeze: true,
  }))

  .handleType('edin/EDITOR_UNFREEZE', state => ({
    ...state,
    shouldFreeze: false,
  }))

  .handleType('edin/REFRESH_EDITOR', state => ({
    ...state,
    refreshCount: state.refreshCount + 1,
  }))

  .handleType('edin/RESET', () => ({
    ...initState,
  }));

export default reducer;
