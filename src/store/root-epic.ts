import { combineEpics } from 'redux-observable';

import * as counterEpic from '../features/counter/epics';

export default combineEpics(...Object.values(counterEpic));
