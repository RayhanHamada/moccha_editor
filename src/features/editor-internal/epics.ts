import { map, debounceTime } from 'rxjs/operators';
import { PayloadAction } from 'typesafe-actions';
import { ofType } from 'redux-observable';

import { MyTypes } from '../../store/app-custom-types';
import { saveCode } from './actions';

export const saveCode$: MyTypes.AppEpic = action$ =>
	action$.pipe(
		ofType('ed-internal/INCOMING_CODE_CHANGES'),
		debounceTime(2000),
		map(action => {
			const payload = (action as PayloadAction<
				'ed-internal/INCOMING_CODE_CHANGES',
				string
			>).payload;

			return saveCode(payload);
		})
	);

export const runCode$: MyTypes.AppEpic = (action$, state$) =>
	action$.pipe(ofType('ed-internal/RUN_CODE'));
