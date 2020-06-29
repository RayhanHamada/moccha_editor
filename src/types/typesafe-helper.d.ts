import { StateType, ActionType } from 'typesafe-actions';

/**
 * this is type helper for typesafe-action module
 */
declare module 'typesafe-actions' {
	export interface Types {
		RootAction: ActionType<typeof import('../store/rootAction').default>;
		RootState: StateType<ReturnType<typeof import('../store/rootReducer').default>>;
		Store: StateType<typeof import('../store').default>;
	}
}
