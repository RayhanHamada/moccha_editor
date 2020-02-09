import { delay, mapTo } from 'rxjs/operators';

import { MyTypes } from '../../store/app-custom-types';
import { increment, decrement } from './actions';

export const asyncIncrement: MyTypes.AppEpic = action$ =>
	action$
		.ofType('counter/ASYNC_INCREMENT')
		.pipe(delay(2000), mapTo(increment()));

export const asyncDecrement: MyTypes.AppEpic = action$ =>
	action$
		.ofType('counter/ASYNC_INCREMENT')
		.pipe(delay(2000), mapTo(decrement()));
