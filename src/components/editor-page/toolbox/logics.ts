import { MyTypes } from '../../../store/app-custom-types';
import { bindActionCreators } from 'redux';

export const mapStateToProps = ({
	editorInternalReducer,
}: MyTypes.RootState) => ({
	languageId: editorInternalReducer.currentLanguage.id,
});

export const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

export type ToolBoxProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;
