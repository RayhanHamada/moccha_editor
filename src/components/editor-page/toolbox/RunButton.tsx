import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MyTypes } from '../../../store/app-custom-types';
import * as edInActions from '../../../features/editor-internal/actions';

const Button = styled.button`
	/* &::after */
	&:hover {
		background-color: #333333;
		color: #e41749;
	}
`;

Button.defaultProps = {
	className:
		'run-code mx-10 my-2 border border-black p-1 rounded flex flex-row items-center',
	children: (
		<>
			<i className="fa fa-play-circle-o fa-2x" id="run-icon"></i>
			<span className="ml-1" id="run-text">
				Run Code
			</span>
		</>
	),
};

const mapStateToProps = ({ editorInternalReducer }: MyTypes.RootState) => ({
	isRunning: editorInternalReducer.isRunning,
});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			saveCode: edInActions.saveCode,
			runCode: edInActions.runCode,
			requestToken: edInActions.fetchSubmissionToken.request,
		},
		dispatch
	);

type RunButtonProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const RunButton = (props: RunButtonProps) => {
	return (
		<Button
			onClick={() => {
				if (!props.isRunning) props.requestToken();
			}}
		/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(RunButton);
