import { bindActionCreators } from 'redux';

import { MyTypes } from '../../types';
import * as authActions from '../../features/auth/authAction';

const ownProps = {};

export const mapStateToProps = ({}: MyTypes.RootState, op = ownProps) => ({
	...op,
});

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators(
		{
			deauthenticate: authActions.deauthenticate,
		},
		dispatch
	);

export type EditorProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps> &
	typeof ownProps;
