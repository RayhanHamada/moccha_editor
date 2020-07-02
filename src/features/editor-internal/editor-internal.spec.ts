import { expect } from 'chai';

import {
  setLanguage,
  fetchSubmissionToken,
  saveCode,
  watchLangChange,
  clearConsole,
  editorFreeze,
  editorUnfreeze,
  resetEdin,
} from './actions';
import reducer from './reducer';

describe('editor internal', function() {
  describe('actions', function() {
    const mockState: Features.EditorInternal = {
      consoleOutput: 'Wello There !',
      currentLanguage: {
        nameInEditor: 'typescript',
        name: 'Typescript',
        id: 74,
        version: '3.7.4',
      },
      currentlySavedCode: '',
      isRunning: false,
      refreshCount: 0,
      shouldFreeze: false,
      token: '',
      watchLangChangeFromSocket: true,
    };

    it(`edin/SET_LANG should set currentLanguage to javascript`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };

      const expected: Features.EditorInternal = {
        ...initialState,
        currentLanguage: {
          nameInEditor: 'javascript',
          name: 'Javascript',
          id: 63,
          version: 'Node.js 12.14.0',
        },
      };
      const output = reducer(
        mockState,
        setLanguage({
          nameInEditor: 'javascript',
          name: 'Javascript',
          id: 63,
          version: 'Node.js 12.14.0',
        })
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/WATCH_LANG_CHANGE should set watchLangChangeFromSocket to be false`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };
      const expected: Features.EditorInternal = {
        ...mockState,
        watchLangChangeFromSocket: false,
      };

      const output = reducer(initialState, watchLangChange(false));

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/CLEAR_CONSOLE should set consoleOutput to be empty`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
        consoleOutput: 'example of console output',
      };

      const expected: Features.EditorInternal = {
        ...mockState,
        consoleOutput: '',
      };

      const output = reducer(initialState, clearConsole());
      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/SAVE_CODE should save code`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };

      const expected: Features.EditorInternal = {
        ...mockState,
        currentlySavedCode: `console.log('hello world');`,
      };

      const output = reducer(
        initialState,
        saveCode(`console.log('hello world');`)
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/FETCH_SUBMISSION_TOKEN should isRunning to be true`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };

      const expected: Features.EditorInternal = {
        ...mockState,
        isRunning: true,
      };

      const output = reducer(initialState, fetchSubmissionToken.request());

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/GOT_SUBMISSION_TOKEN should set token`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };

      const expected: Features.EditorInternal = {
        ...mockState,
        token: 'token-example',
        consoleOutput: 'Wello There !\n> Code is Running\n',
      };

      const output = reducer(
        initialState,
        fetchSubmissionToken.success('token-example')
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/EDITOR_FREEZE should set shouldFreeze to true`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
      };

      const expected: Features.EditorInternal = {
        ...initialState,
        shouldFreeze: true,
      };

      const output = reducer(initialState, editorFreeze());

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/EDITOR_UNFREEZE should set shouldFreeze to false`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
        shouldFreeze: true,
      };

      const expected: Features.EditorInternal = {
        ...initialState,
        shouldFreeze: false,
      };
      const output = reducer(initialState, editorUnfreeze());

      expect(output).to.be.deep.equal(expected);
    });

    it(`edin/RESET should reset editor internal state`, () => {
      const initialState: Features.EditorInternal = {
        ...mockState,
        consoleOutput: 'adasdasdasdas',
        refreshCount: 123213,
        isRunning: true,
        token: 'randomtookennn',
      };

      const expected: Features.EditorInternal = {
        ...mockState,
      };

      const output = reducer(initialState, resetEdin());

      expect(output).to.be.deep.equal(expected);
    });

    /**
     * * test end
     */
  });
});
