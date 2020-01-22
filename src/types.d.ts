import { StateType, ActionType } from 'typesafe-actions';

declare namespace MyTypes {
	export type RootAction = ActionType<
		typeof import('./store/rootAction').default
	>;
	export type RootState = StateType<
		ReturnType<typeof import('./store/rootReducer').default>
	>;
	export type Store = StateType<typeof import('./store').default>;
}

declare module 'typesafe-actions' {
	export interface Types {
		RootAction: ActionType<typeof import('./store/rootAction').default>;
		RootState: StateType<
			ReturnType<typeof import('./store/rootReducer').default>
		>;
		Store: StateType<typeof import('./store').default>;
	}
}
