import React, { createRef } from 'react';

import ClearConsoleButton from '../toolbox/ClearConsole';
import { TerminalProps } from './logics';

import './index.scss';

const TerminalWrapper = (props: TerminalProps) => {
	return (
		<div className="" id="terminal-wrapper">
			<ClearConsoleButton />
			<textarea
				name="console"
				id="console"
				value={'test123'}
				disabled
			></textarea>
		</div>
	);
};

export default TerminalWrapper;
