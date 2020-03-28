import { StateObservable, ActionsObservable } from 'redux-observable';
import { expect } from 'chai';
import { DeepPartial } from 'redux';
import { Subject } from 'rxjs';
import dotenv from 'dotenv';
dotenv.config();

import { MyTypes } from '../../store/app-custom-types';
import { fetchRoomKey$, deauthenticate$ } from './epics';
import { clearRoomKeys } from '../../api/api.util';
import { mockState } from '../mock-state';
import reducer from './reducer';
import {
	setRoom,
	setUsername,
	deauthenticate,
	getRoomKey,
} from './actions';

describe("Auth's", function() {
	describe('reducer', () => {
		let mockState: Partial<AppFeatures.Auth>;
		this.beforeEach(() => {
			mockState = undefined as any;
		});

		// * passed
		it.skip('should set username', () => {
			mockState = {
				username: '',
				roomKey: '',
				authenticated: false,
			};

			const expectedValue: Partial<AppFeatures.Auth> = {
				username: 'test-username',
				roomKey: '',
				authenticated: false,
			};

			const username = 'test-username';
			// dispatch action to reducer
			const output = reducer(mockState, setUsername(username));

			expect(output).deep.equal(expectedValue);
		});

		// * passed
		it.skip('should set room key', () => {
			mockState = {
				username: '',
				roomKey: '',
				authenticated: false,
			};

			const expectedValue: Partial<AppFeatures.Auth> = {
				username: '',
				roomKey: 'test-key',
				authenticated: false,
			};

			const roomKey = 'test-key';
			// dispatch action to reducer
			const output = reducer(mockState, setRoom(roomKey));

			expect(output).deep.equal(expectedValue);
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

			const output$ = fetchRoomKey$(action$, state$, null);

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
			const action$: ActionsObservable<MyTypes.RootAction> = ActionsObservable.of(
				{ type: 'auth/DEAUTHENTICATE' }
			);

			const expectedAct: MyTypes.RootAction = {
				type: 'auth/SET_ROOM',
				payload: {
					roomKey: '',
				},
			};

			const output$ = deauthenticate$(action$, state$, null);

			output$.toPromise().then(action => {
				expect(action).to.be.deep.equal(expectedAct);
				done();
			});
		});
	});
});
