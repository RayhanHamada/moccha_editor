import React from 'react';
import styled from 'styled-components';

import RunButton from './RunButton';

import './index.scss';

const ToolBox = styled.div``;

ToolBox.defaultProps = {
	id: 'tool-box',
	className: 'flex flex-row items-center',
	children: (
		<>
			<RunButton />
		</>
	),
};

export default ToolBox;
