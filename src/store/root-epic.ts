import { combineEpics } from 'redux-observable';

import * as auth from '../features/auth/epics';
import * as edin from '../features/editor-internal/epics';
import * as pm from '../features/player-manager/epics';

export default combineEpics(
  ...Object.values(auth),
  ...Object.values(edin),
  ...Object.values(pm)
);
