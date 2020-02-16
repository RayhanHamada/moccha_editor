import React from 'react';
import styled from 'styled-components';

const RunButton = styled.button``;

RunButton.defaultProps = {
	className:
		'run-code mx-10 my-2 border border-black p-1 rounded flex flex-row items-center',
	children: (
		<>
			<i className="fa fa-play-circle-o fa-2x"></i>
			<span className="ml-1">Run Code</span>
		</>
	),
};

export default RunButton;
