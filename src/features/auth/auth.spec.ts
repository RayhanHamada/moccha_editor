import { expect } from 'chai';
import { StateObservable, ActionsObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import dotenv from 'dotenv';
dotenv.config();

import {
	setRoom,
	setUsername,
	authenticate,
	deauthenticate,
	getRoomKey,
} from './actions';
import { MyTypes } from '../../store/app-custom-types';
import { clearRoomKeys } from '../../api/api.util';
import { mockState } from '../mock-state';
import { fetchRoomKey$, deauthenticate$ } from './epics';
import reducer from './reducer';
import { DeepPartial } from 'redux';
import { PayloadAction } from 'typesafe-actions';

describe("Auth's", function() {
	describe('reducer', () => {
		let initialValue: AppFeatures.Auth;
		this.beforeEach(() => {
			initialValue = {
				username: '',
				roomKey: '',
				authenticated: false,
			};
		});

		it('should set username', () => {
			const expectedValue: AppFeatures.Auth = {
				username: 'test-username',
				roomKey: '',
				authenticated: false,
			};

			const username = 'test-username';
			// dispatch action to reducer
			const output = reducer(initialValue, setUsername(username));

			expect(output).deep.equal(expectedValue);
		});

		it('should set room key', () => {
			const expectedValue: AppFeatures.Auth = {
				username: '',
				roomKey: 'test-key',
				authenticated: false,
			};

			const roomKey = 'test-key';
			// dispatch action to reducer
			const output = reducer(initialValue, setRoom(roomKey));

			expect(output).deep.equal(expectedValue);
		});

		it('should set authenticate to true', () => {
			const expectedValue: AppFeatures.Auth = {
				username: '',
				roomKey: '',
				authenticated: true,
			};

			// dispatch action to reducer
			const output = reducer(initialValue, authenticate());

			expect(output).deep.equal(expectedValue);
		});

		it('should set authenticate to true', () => {
			const expectedValue: AppFeatures.Auth = {
				username: '',
				roomKey: '',
				authenticated: false,
			};

			// dispatch action to reducer
			const output = reducer(initialValue, deauthenticate());

			expect(output).deep.equal(expectedValue);
		});
	});

	describe('epics', function() {
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

		it('fetchRoomKey$ should output auth/AUTHENTICATE action', done => {
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

		it('deauthenticate$ should output auth/SET_ROOM', done => {
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
	