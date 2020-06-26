import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { MyTypes } from '../../../store/app-custom-types';

import ClearConsoleButton from '../toolbox/ClearConsoleButton';

import './index.scss';

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	consoleOutput: editorInternalReducer.consoleOutput,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const TerminalWrapper = (props: Props) => {
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
