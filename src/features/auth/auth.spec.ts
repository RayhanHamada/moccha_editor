import { expect } from 'chai';
import reducer from './reducer';
import {
  setUsername,
  getRoomKey,
  setRoomKey,
  setSocketID,
  setIsRM,
  setCursorColor,
  authenticate,
  deauthenticate,
  getRoomExistence,
  setCopied,
} from './actions';

const initialState: Features.Auth = {
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

describe("Auth", function() {
  describe('actions', () => {
    /**
     * * Test starts here
     */
    it(`auth/SET_USERNAME should set me.username to 'test-username'`, () => {
      const mockState = {
        ...initialState,
      };

      const expectedValue: Features.Auth = {
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
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expectedValue: Features.Auth = {
        ...mockState,
        roomKey: 'test-key',
      };

      const roomKey = 'test-key';
      // dispatch action to reducer
      const output = reducer(mockState, setRoomKey(roomKey));

      expect(output).deep.equal(expectedValue);
    });

    it(`auth/SET_SOCKET_ID should set socketId to 'test-socket'`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expected: Features.Auth = {
        ...mockState,
        me: {
          ...mockState.me,
          socketID: 'test-socket',
        },
      };

      const output = reducer(mockState, setSocketID('test-socket'));
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/SET_IS_RM should set me.isRM to true`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expected: Features.Auth = {
        ...mockState,
        me: {
          ...mockState.me,
          isRM: true,
        },
      };
      const output = reducer(mockState, setIsRM(true));
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/SET_CURSOR_COLOR should set me.cursorColor`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const output = reducer(mockState, setCursorColor());
      expect(output.me.cursorColor).not.empty;
    });

    it(`auth/AUTHENTICATE should set authenticated to be true`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expected: Features.Auth = {
        ...mockState,
        authenticated: true,
      };
      const output = reducer(mockState, authenticate());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/DEAUTHENTICATE should set authenticated to be false`, () => {
      const mockState: Features.Auth = {
        ...initialState,
        authenticated: true,
      };

      const expected: Features.Auth = {
        ...mockState,
        authenticated: false,
      };
      const output = reducer(mockState, deauthenticate());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/REQ_ROOM_EXISTENCE should set isLoading to be true`, () => {
      const mockState: Features.Auth = {
        ...initialState,
        roomKey: '093b38v8d9',
      };

      const expected: Features.Auth = {
        ...mockState,
        isLoading: true,
        loadingMsg: `Checking room 093b38v... existence, please wait...`,
      };

      const output = reducer(mockState, getRoomExistence.request());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/SUCCESS_ROOM_EXISTENCE should set isLoading to false`, () => {
      const mockState: Features.Auth = {
        ...initialState,
        isLoading: true,
      };

      const expected: Features.Auth = {
        ...mockState,
        isLoading: false,
        loadingMsg: '',
      };
      const output = reducer(mockState, getRoomExistence.success());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/CANCEL_ROOM should set isLoading to be false`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expected: Features.Auth = {
        ...mockState,
        isLoading: false,
        loadingMsg: '',
      };

      const output = reducer(mockState, getRoomExistence.cancel());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/FETCH_ROOM_KEY should set isLoading to be true`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };

      const expected: Features.Auth = {
        ...mockState,
        isLoading: true,
        loadingMsg: 'Fetching key, please wait...',
      };

      const output = reducer(mockState, getRoomKey.request());
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/GOT_ROOM_KEY should work`, () => {
      const mockState = {
        ...initialState,
        isLoading: true,
      };
      const expected: Features.Auth = {
        ...mockState,
        roomKey: 'room-key-example',
        isLoading: false,
        loadingMsg: '',
        me: {
          ...mockState.me,
          isRM: true,
        },
      };
      const output = reducer(mockState, getRoomKey.success('room-key-example'));
      expect(output).to.be.deep.equal(expected);
    });

    it(`auth/SET_COPIED should set copied to be true`, () => {
      const mockState: Features.Auth = {
        ...initialState,
      };
      const expected: Features.Auth = {
        ...mockState,
        copied: true,
      };
      const output = reducer(mockState, setCopied(true));
      expect(output).to.be.deep.equal(expected);
    });

    /**
     * * test end here
     */
  });
});
