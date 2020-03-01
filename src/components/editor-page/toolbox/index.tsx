import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../../store/app-custom-types';

import SelectLanguage from './SelectLanguage';
import RunButton from './RunButton';

import './index.scss';

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	langId: editorInternalReducer.currentLanguage.id,
});

type ToolBoxProps = ReturnType<typeof mapStateToProps>;

const ToolBox = (props: ToolBoxProps) => {
	return (
		<div id="tool-box" className="flex flex-row items-center">
			<RunButton />
			<SelectLanguage defaultValue={props.langId} />
		</div>
	);
};

export default connect(mapStateToProps)(ToolBox);
