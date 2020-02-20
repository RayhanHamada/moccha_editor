import React from 'react';

import SelectLanguage from './SelectLanguage';
import { ToolBoxProps } from './logics';
import RunButton from './RunButton';

import './index.scss';

const ToolBox = (props: ToolBoxProps) => {
	return (
		<div id="tool-box" className="flex flex-row items-center">
			<RunButton />
			<SelectLanguage defaultValue={props.languageId} />
		</div>
	);
};

export default ToolBox;
