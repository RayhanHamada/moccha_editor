import React from 'react';
import { connect } from 'react-redux';

import ClearConsoleButton from '../toolbox/ClearConsole';
import { TerminalProps, mapStateToProps, mapDispatchToProps } from './logics';

import './index.scss';

const TerminalWrapper = (props: TerminalProps) => {
	return (
		<div className="" id="terminal-wrapper">
			<ClearConsoleButton />
			<textarea
				name="console"
				id="console"
				value={props.consoleOutput}
				readOnly
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(TerminalWrapper);
