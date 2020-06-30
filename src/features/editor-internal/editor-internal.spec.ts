import { expect } from 'chai';
import { Subject } from 'rxjs';
import { StateObservable, ActionsObservable } from 'redux-observable';

import {
  setLanguage,
  fetchSubmissionToken,
  incomingCodeChanges,
  saveCode,
} from './actions';
import { MyTypes } from '../../types/app-state';
import { supportedLanguages } from '../../globals';
import { DeepPartial } from 'redux';
import { saveCode$ } from './epics';
import reducer from './reducer';

describe("editor internal's", function() {
  describe('action', function() {
    let mockState: Features.EditorInternal;

    this.beforeEach(() => {
      mockState = undefined as any;
    });

    // * passed
    it.skip('setLanguage should set language to Javascript', () => {
      // set mock state
      mockState = {
        isRunning: false,
        currentLanguage: {
          name: 'Typescript',
          nameInEditor: 'typescript',
          id: 74,
          version: '3.7.4',
        },
        consoleOutput: '',
        currentlySavedCode: '',
        token: '',
        shouldFreeze: false,
        refreshCount: 0,
        watchLangChangeFromSocket: false,
      };

      const expectedLanguage = supportedLanguages[1];
      const action = setLanguage(expectedLanguage);
      const languageAfterSet = reducer(mockState, action).currentLanguage;

      expect(languageAfterSet).to.be.deep.equal(expectedLanguage);
    });

    it('fetchSubmissionToken.request should set isRunning', () => {
      // set mock state
      mockState = {
        isRunning: false,
        currentLanguage: {
          name: 'Typescript',
          nameInEditor: 'typescript',
          id: 74,
          version: '3.7.4',
        },
        consoleOutput: '',
        currentlySavedCode: '',
        token: '',
        shouldFreeze: false,
        refreshCount: 0,
        watchLangChangeFromSocket: false,
      };

      /*
       * should set isRunning to true
       */
      const expectedValue = true;
      const action = fetchSubmissionToken.request();
      const afterValue = reducer(mockState, action).isRunning;

      expect(afterValue).to.be.equal(expectedValue);
    });

    it('fetchSubmissionToken.success should set token and consoleOuput', () => {
      // * set mock state
      mockState = {
        isRunning: false,
        currentLanguage: {
          name: 'Typescript',
          nameInEditor: 'typescript',
          id: 74,
          version: '3.7.4',
        },
        consoleOutput: '',
        currentlySavedCode: '',
        token: '',
        shouldFreeze: false,
        refreshCount: 0,
        watchLangChangeFromSocket: false,
      };

      /*
       * set token
       */
      let expectedValue = 'test-token';
      const action = fetchSubmissionToken.success(expectedValue);
      let output = reducer(mockState, action);

      let actualValue = output.token;
      expect(actualValue).to.be.equal(expectedValue);

      /*
       * set consoleOutput
       */
      expectedValue = '\n> Code is Running\n';
      output = reducer(mockState, action);

      actualValue = output.consoleOutput;

      expect(actualValue).to.be.equal(expectedValue);
    });
  });

  describe('epics', function() {
    this.timeout(5000);

    let state$: StateObservable<MyTypes.RootState>;

    // * passed
    it.skip('saveCode', done => {
      // * mock state
      const mockState: DeepPartial<MyTypes.RootState> = {
        editorInternalReducer: {
          currentlySavedCode: '',
        },
      };

      // * set state stream
      state$ = new StateObservable(
        new Subject(),
        mockState as MyTypes.RootState
      );

      const code = 'test-code';
      const expectedValue = saveCode(code);
      const action$ = ActionsObservable.of(incomingCodeChanges(code));
      const $output = saveCode$(action$, state$, undefined as any);

      $output.toPromise().then(action => {
        expect(action).to.be.deep.equal(expectedValue);
        done();
      });
    });
  });
});
