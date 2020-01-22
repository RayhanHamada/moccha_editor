import { createAction } from 'typesafe-actions';

export const increment = createAction('INCREMENT')();
export const decrement = createAction('DECREMENT')();

export const incrementBy = createAction('INCREMENT_BY', (by: number) => {
	return {
		by,
	};
})();

export const decrementBy = createAction('DECREMENT_BY', (by: number) => {
	return {
		by,
	};
})();
