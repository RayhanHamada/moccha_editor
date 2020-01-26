import { MyTypes } from './types';
import { bindActionCreators } from 'redux';

const ownProps = {};

export const mapStateToProps = (
	{ authReducer }: MyTypes.RootState,
	op = ownProps
) => ({
	authenticated: authReducer.authenticated,
	...op,
});

export const mapDispatchToProps = (dispatch: MyTypes.RootDispatch) =>
	bindActionCreators({}, dispatch);

export type AppProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps> &
	typeof ownProps;
