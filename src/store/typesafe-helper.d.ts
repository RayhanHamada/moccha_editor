import { StateType, ActionType } from 'typesafe-actions';

/**
 * this is type helper for typesafe-action module
 */
declare module 'typesafe-actions' {
	interface Types {
		RootAction: ActionType<typeof import('./rootAction').default>;
		RootState: StateType<ReturnType<typeof import('./rootReducer').default>>;
		Store: StateType<typeof import('.').default>;
	}
}
