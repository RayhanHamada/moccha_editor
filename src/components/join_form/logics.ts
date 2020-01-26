import { bindActionCreators } from 'redux';

import { MyTypes } from '../../types';
import * as authActions from '../../features/auth/authAction';
import store, { history } from '../../store';

export const ownProps = {
	createRoom: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		ev.preventDefault();

		const {
			authReducer: { username },
		} = store.getState();
		/*
		 * check if the username is filled
		 */
		if (username === '') {
			alert('username field must not be empty');
			return;
		}

		/*
		 * make request to the server for the room key
		 */

		/*
		 * navigate to room
		 */

		store.dispatch(authActions.authenticate());
	},
	angka: 1,
};

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators(
		{
			setUsername: authActions.setUsername,
			setRoom: authActions.setRoom,
			authenticate: authActions.authenticate,
		},
		dispatch
	);

export const mapStateToProps = (
	{ authReducer }: MyTypes.RootState,
	op = ownProps
) => ({
	username: authReducer.username,
	room: authReducer.room,
	...op,
});

export type JoinFormProps = ReturnType<typeof mapDispatchToProps> &
	ReturnType<typeof mapStateToProps> &
	typeof ownProps;
