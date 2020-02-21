import { combineEpics } from 'redux-observable';

import * as authEpic from '../features/auth/epics';
import * as editorInternalEpic from '../features/editor-internal/epics';

export default combineEpics(
	...Object.values(authEpic),
	...Object.values(editorInternalEpic)
);
