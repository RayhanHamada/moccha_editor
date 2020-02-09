import { bindActionCreators } from 'redux';

import { MyTypes } from './store/app-custom-types';

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

export type AppProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
