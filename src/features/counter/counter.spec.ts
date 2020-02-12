import { expect } from 'chai';
import reducer from './reducer';
import {
	increment,
	decrement,
	incrementBy,
	decrementBy,
	asyncIncrement,
	asyncDecrement,
} from './actions';
import { StateObservable, ActionsObservable } from 'redux-observable';
import { MyTypes } from '../../store/app-custom-types';
import { Subject } from 'rxjs';
import { asyncIncrementEpic, asyncDecrementEpic } from './epics';

describe('Counter', function() {
	this.timeout(10000);

	let state$: StateObservable<MyTypes.RootState>;

	beforeEach(() => {
		state$ = new StateObservable<MyTypes.RootState>(
			new Subject(),
			undefined as any
		);
	});

	it('should do increment', () => {
		// set initial state
		const initState: AppFeatures.Counter = {
			count: 0,
		};

		// set expected value
		const expectedState: AppFeatures.Counter = {
			count: 1,
		};

		// make comparison
		expect(reducer(initState, increment())).deep.equal(expectedState);
	});

	it('should do decrement', () => {
		// set initial state
		const initState: AppFeatures.Counter = {
			count: 1,
		};

		// set expected value
		const expectedState: AppFeatures.Counter = {
			count: 0,
		};

		// make comparison
		expect(reducer(initState, decrement())).deep.equal(expectedState);
	});

	it('should do incrementBy', () => {
		// set initial state
		const initState: AppFeatures.Counter = {
			count: 1,
		};

		// set expected value
		const expectedState: AppFeatures.Counter = {
			count: 3,
		};

		// make comparison
		expect(reducer(initState, incrementBy(2))).deep.equal(expectedState);
	});

	it('should do decrementBy', () => {
		// set initial state
		const initState: AppFeatures.Counter = {
			count: 3,
		};

		// set expected value
		const expectedState: AppFeatures.Counter = {
			count: 0,
		};

		// make comparison
		expect(reducer(initState, decrementBy(3))).deep.equal(expectedState);
	});

	it('should do async increment', done => {
		// create asyncIncrement action stream
		const action$ = ActionsObservable.of(asyncIncrement());
		const expectedAction: MyTypes.RootAction = { type: 'counter/INCREMENT' };

		asyncIncrementEpic(action$, state$, null)
			.toPromise()
			.then(action => {
				expect(action).deep.equal(expectedAction);
				done();
			});
	});

	it('should do async decrement', done => {
		// create asyncIncrement action stream
		const action$ = ActionsObservable.of(asyncDecrement());
		const expectedAction: MyTypes.RootAction = { type: 'counter/DECREMENT' };

		asyncDecrementEpic(action$, state$, null)
			.toPromise()
			.then(action => {
				expect(action).deep.equal(expectedAction);
				done();
			});
	});
});
