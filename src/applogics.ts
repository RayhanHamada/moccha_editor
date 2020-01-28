import { MyTypes } from './types';
import { bindActionCreators } from 'redux';

export const mapStateToProps = ({ authReducer }: MyTypes.RootState) => ({
	authenticated: authReducer.authenticated,
});

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators({}, dispatch);

export type AppProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
