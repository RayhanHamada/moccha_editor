import { bindActionCreators } from 'redux';

import { MyTypes } from '../../types';
import * as authActions from '../../features/auth/authAction';

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators(
		{
			setUsername: authActions.setUsername,
			setRoom: authActions.setRoom,
			authenticate: authActions.authenticate,
		},
		dispatch
	);

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	username: authReducer.username,
	room: authReducer.room,
});

export type JoinFormProps = ReturnType<typeof mapDispatchToProps> &
	ReturnType<typeof mapStateToProps>;
