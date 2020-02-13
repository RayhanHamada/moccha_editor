import { bindActionCreators } from 'redux';

import { MyTypes } from '../../store/app-custom-types';
import * as authActions from '../../features/auth/actions';

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			setUsername: authActions.setUsername,
			setRoom: authActions.setRoom,
			authenticate: authActions.authenticate,
			fetchRoomKey: authActions.getRoomKey.request
		},
		dispatch
	);

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	username: authReducer.username,
	roomKey: authReducer.roomKey,
	authenticated: authReducer.authenticated
});

export type JoinFormProps = ReturnType<typeof mapDispatchToProps> &
	ReturnType<typeof mapStateToProps>;
