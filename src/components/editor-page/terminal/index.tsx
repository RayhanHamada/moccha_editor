import React from 'react';
import { connect } from 'react-redux';

import { MyTypes } from '../../../store/app-custom-types';

import ClearConsoleButton from '../toolbox/ClearConsoleButton';

import './index.scss';

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	consoleOutput: editorInternalReducer.consoleOutput,
});

export type TerminalProps = ReturnType<typeof mapStateToProps>;

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

export default connect(mapStateToProps)(TerminalWrapper);
