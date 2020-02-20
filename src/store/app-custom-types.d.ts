import { ActionType, StateType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import { Dispatch } from 'redux';

declare namespace MyTypes {
	/*
	 * root of all action in this app
	 */
	type RootAction = ActionType<typeof import('./rootAction').default>;

	/*
	 * root of all state in this app
	 */
	type RootState = StateType<
		ReturnType<typeof import('./rootReducer').default>
	>;
	/*
	 * app store
	 */
	type Store = StateType<typeof import('.').default>;

	/*
	 * specify custom Dispatch type,
	 * (instead of write Dispatch<MyTypes.RootAction> in every mapDispatchToProps function)
	 */
	type AppDispatch = Dispatch<RootAction>;

	/*
	 * specify custom Epic type, (from redux-observable)
	 */
	type AppEpic = Epic<RootAction, RootAction, RootState>;
}
