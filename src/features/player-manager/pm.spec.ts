import { expect } from 'chai';

import reducer from './reducer';
import { addPlayer, setPlayers, removePlayer, clearPlayers } from './actions';

const mockState: Features.PlayerManager = {
  players: [],
};

describe('Player Manager', function() {
  describe('actions', function() {
    it(`pm/ADD_PLAYER should add player`, () => {
      const initialState: Features.PlayerManager = {
        ...mockState,
      };

      const expected: Features.PlayerManager = {
        ...initialState,
        players: [
          {
            username: 'test-player',
            cursorColor: 'test-color',
            isRM: false,
            socketID: 'test-socket-id',
          },
        ],
      };

      const output = reducer(
        initialState,
        addPlayer({
          username: 'test-player',
          cursorColor: 'test-color',
          isRM: false,
          socketID: 'test-socket-id',
        })
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`pm/SET_PLAYERS should set toSet`, () => {
      const initialState: Features.PlayerManager = {
        ...mockState,
      };

      const expected: Features.PlayerManager = {
        ...initialState,
        players: [
          {
            username: 'test-player1',
            cursorColor: 'cursor-color1',
            isRM: false,
            socketID: 'socket-id-1',
          },
          {
            username: 'test-player2',
            cursorColor: 'cursor-color2',
            isRM: true,
            socketID: 'socket-id-2',
          },
        ],
      };

      const output = reducer(
        initialState,
        setPlayers([
          {
            username: 'test-player1',
            cursorColor: 'cursor-color1',
            isRM: false,
            socketID: 'socket-id-1',
          },
          {
            username: 'test-player2',
            cursorColor: 'cursor-color2',
            isRM: true,
            socketID: 'socket-id-2',
          },
        ])
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`pm/REMOVE_PLAYER should remove a player`, () => {
      const initialState: Features.PlayerManager = {
        ...mockState,
        players: [
          {
            username: 'test-player1',
            cursorColor: 'cursor-color1',
            isRM: false,
            socketID: 'socket-id-1',
          },
          {
            username: 'test-player2',
            cursorColor: 'cursor-color2',
            isRM: true,
            socketID: 'socket-id-2',
          },
        ],
      };

      const expected: Features.PlayerManager = {
        ...initialState,
        players: [
          {
            username: 'test-player2',
            cursorColor: 'cursor-color2',
            isRM: true,
            socketID: 'socket-id-2',
          },
        ],
      };

      const output = reducer(
        initialState,
        removePlayer({
          username: 'test-player1',
          cursorColor: 'cursor-color1',
          isRM: false,
          socketID: 'socket-id-1',
        })
      );

      expect(output).to.be.deep.equal(expected);
    });

    it(`pm/CLEAR_PLAYERS should clear all players`, () => {
      const initialState: Features.PlayerManager = {
        ...mockState,
        players: [
          {
            username: 'test-player1',
            cursorColor: 'cursor-color1',
            isRM: false,
            socketID: 'socket-id-1',
          },
          {
            username: 'test-player2',
            cursorColor: 'cursor-color2',
            isRM: true,
            socketID: 'socket-id-2',
          },
        ],
      };

      const expected: Features.PlayerManager = {
        ...initialState,
        players: [],
      };

      const output = reducer(initialState, clearPlayers());

      expect(output).to.be.deep.equal(expected);
    });
  });
});
