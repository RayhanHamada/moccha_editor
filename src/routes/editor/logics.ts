import { bindActionCreators } from 'redux';

import * as authActions from '../../features/auth/actions';
import { MyTypes } from '../../store/app-custom-types';

export const mapStateToProps = ({}: MyTypes.RootState) => ({});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			deauthenticate: authActions.deauthenticate,
		},
		dispatch
	);

export type EditorProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
