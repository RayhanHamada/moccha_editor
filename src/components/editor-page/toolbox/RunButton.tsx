import React from 'react';
import styled from 'styled-components';
import { MyTypes } from '../../../store/app-custom-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

const mapStateToProps = ({}: MyTypes.RootState) => ({});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

type RunButtonProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const RunButton = (props: RunButtonProps) => {
	return <Button />;
};

export default connect(mapStateToProps, mapDispatchToProps)(RunButton);
