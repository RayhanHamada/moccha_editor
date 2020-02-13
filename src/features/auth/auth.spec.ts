import { expect } from 'chai';
import { StateObservable, ActionsObservable } from 'redux-observable';
import {
	setRoom,
	setUsername,
	authenticate,
	deauthenticate,
	getRoomKey,
} from './actions';
import reducer from './reducer';
import { MyTypes } from '../../store/app-custom-types';
import { Subject } from 'rxjs';
import { fetchRoomKey$ } from './epics';
import { clearRoomKeys } from '../../api/api.util';
import { mockState } from '../mock-state';
import { DeepPartial } from 'redux';

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

		it('fetchRoomKey$ should output getRoomKey.success action', done => {
			const action$ = ActionsObservable.of<MyTypes.RootAction>(
				getRoomKey.request()
			);

			const expectActType: MyTypes.RootAction['type'] = 'auth/GOT_ROOM_KEY';

			const output$ = fetchRoomKey$(action$, state$, null);

			output$.toPromise().then(action => {
				expect(action.type).equal(expectActType);
				done();
			});
		});

		it('authenticate$ should output auth/AUTHENTICATE action', done => {
			// create mock state
			const ms: DeepPartial<MyTypes.RootState> = {
				authReducer: {
					username: 'berisi',
				},
			};
			state$ = new StateObservable<MyTypes.RootState>(
				new Subject(),
				ms as MyTypes.RootState
			);

			const action$ = ActionsObservable.of(
				getRoomKey.success({ roomKey: 'test-key' })
			);

			const expectActType: MyTypes.RootAction['type'] = 'auth/AUTHENTICATE';
			const output$ = authAndNavigateToEditor$(action$, state$, null);

			output$.toPromise().then(action => {
				expect(action.type).equal(expectActType);
				done();
			});
		});
	});
});
