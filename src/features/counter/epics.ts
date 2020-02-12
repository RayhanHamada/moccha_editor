import { delay, mapTo } from 'rxjs/operators';

import { MyTypes } from '../../store/app-custom-types';
import { increment, decrement } from './actions';
import { ofType } from 'redux-observable';

export const asyncIncrementEpic: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('counter/ASYNC_INCREMENT'),
		delay(2000),
		mapTo(increment())
	);

export const asyncDecrementEpic: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('counter/ASYNC_DECREMENT'),
		delay(2000),
		mapTo(decrement())
	);
