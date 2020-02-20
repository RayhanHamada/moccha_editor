import { combineEpics } from 'redux-observable';

import * as authEpic from '../features/auth/epics';

export default combineEpics(...Object.values(authEpic));
