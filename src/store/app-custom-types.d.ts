import { ActionType, StateType } from 'typesafe-actions';
import { Dispatch } from 'redux';

declare namespace MyTypes {
	type RootAction = ActionType<typeof import('./rootAction').default>;
	type RootState = StateType<
		ReturnType<typeof import('./rootReducer').default>
	>;
	type Store = StateType<typeof import('.').default>;
	type AppDispatch = Dispatch<RootAction>;
}
