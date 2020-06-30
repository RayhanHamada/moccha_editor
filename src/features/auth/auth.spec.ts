import { StateObservable, ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { DeepPartial } from 'redux';
import { Subject } from 'rxjs';

import { MyTypes } from '../../types/app-state';
import { fetchRoomKey$, clearAfterExit$ } from './epics';
import { clearRoomKeys } from '../../api/api.util';
import reducer from './reducer';
import { setUsername, getRoomKey, setRoomKey, setSocketID } from './actions';

describe("Auth's", function() {
  describe('reducer', () => {
    const mockState: AppFeatures.Auth = {
      authenticated: false,
      copied: false,
      isLoading: false,
      loadingMsg: '',
      roomKey: '',
      me: {
        username: '',
        socketID: '',
        cursorColor: '',
        isRM: false,
      },
    };

    /**
     * * Test starts here
     */
    it(`auth/SET_USERNAME should set me.username to 'test-username'`, () => {
      const expectedValue: AppFeatures.Auth = {
        ...mockState,
        me: {
          ...mockState.me,
          username: 'test-username',
        },
      };

      const username = 'test-username';
      // dispatch action to reducer
      const output = reducer(mockState, setUsername(username));

      expect(output).deep.equal(expectedValue);
    });

    it(`auth/SET_ROOM_KEY should set roomKey to 'test-key'`, () => {
      const expectedValue: AppFeatures.Auth = {
        ...mockState,
        roomKey: 'test-key',
      };

      const roomKey = 'test-key';
      // dispatch action to reducer
      const output = reducer(mockState, setRoomKey(roomKey));

      expect(output).deep.equal(expectedValue);
    });

    it(`auth/SET_SOCKET_ID should set socketId to 'test-socket'`, () => {
      const expected: AppFeatures.Auth = {
        ...mockState,
        me: {
          ...mockState.me,
          socketID: 'test-socket',
        },
      };

      const output = reducer(mockState, setSocketID('test-socket'));

      expect(output).to.be.deep.equal(expected);
    });
  });

  describe.skip('epics', function() {
    this.timeout(100000);

    let state$: StateObservable<MyTypes.RootState>;

    this.beforeEach(() => {
      state$ = new StateObservable<MyTypes.RootState>(
        new Subject(),
        mockState as MyTypes.RootState
      );
    });

    this.afterEach(done => {
      clearRoomKeys().then(res => {
        console.log(`clear room keys on server: ${res.data}`);
        done();
      });
    });

    // * passed
    it.skip('fetchRoomKey$ should output auth/AUTHENTICATE action', done => {
      const action$ = ActionsObservable.of<MyTypes.RootAction>(
        getRoomKey.request()
      );

      const expectActType: MyTypes.RootAction['type'] = 'auth/AUTHENTICATE';

      const output$ = fetchRoomKey$(action$, state$, undefined as any);

      output$.toPromise().then(action => {
        expect(action.type).equal(expectActType);
        done();
      });
    });

    // * passed
    it.skip('deauthenticate$ should output auth/SET_ROOM', done => {
      // make mock state
      const mockState: DeepPartial<MyTypes.RootState> = {
        authReducer: {
          username: 'test-username',
          roomKey: 'test-roomkey',
          authenticated: true,
        },
      };
      // make state's stream
      state$ = new StateObservable<MyTypes.RootState>(
        new Subject(),
        mockState as MyTypes.RootState
      );

      // action stream
      const action$ = ActionsObservable.of<MyTypes.RootAction>({
        type: 'auth/DEAUTHENTICATE',
      });

      const expectedAct: MyTypes.RootAction = {
        type: 'auth/SET_ROOM_KEY',
        payload: '',
      };

      const output$ = clearAfterExit$(action$, state$, undefined as any);

      output$.toPromise().then(action => {
        expect(action).to.equal(expectedAct);
        done();
      });
    });
  });
});
