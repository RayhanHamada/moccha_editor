import { createRef } from 'react';
import { MyTypes } from '../../../store/app-custom-types';
import { bindActionCreators } from 'redux';

export const mapStateToProps = ({}: MyTypes.RootState) => ({});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

export type TerminalProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
