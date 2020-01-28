import { bindActionCreators } from 'redux';

import { MyTypes } from '../../types';
import * as authActions from '../../features/auth/authAction';

export const mapStateToProps = ({}: MyTypes.RootState) => ({});

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators(
		{
			deauthenticate: authActions.deauthenticate,
		},
		dispatch
	);

export type EditorProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
