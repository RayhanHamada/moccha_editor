import { createAction } from 'typesafe-actions';

export const increment = createAction('counter/INCREMENT')();
export const decrement = createAction('counter/DECREMENT')();

export const incrementBy = createAction(
	'counter/INCREMENT_BY',
	(by: number) => {
		return {
			by,
		};
	}
)();

export const decrementBy = createAction(
	'counter/DECREMENT_BY',
	(by: number) => {
		return {
			by,
		};
	}
)();
