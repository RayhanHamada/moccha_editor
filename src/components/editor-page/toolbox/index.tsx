import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../../store/app-custom-types';

import SelectLanguage from './SelectLanguage';
import RunButton from './RunButton';

import './index.scss';

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	langId: editorInternalReducer.currentLanguage.id,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const ToolBox = (props: Props) => {
	return (
		<div id="tool-box" className="flex flex-row items-center">
			<RunButton />
			<SelectLanguage value={props.langId} />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox);
