import React from 'react';
import styled from 'styled-components';
import { MyTypes } from '../../../store/app-custom-types';
import { bindActionCreators } from 'redux';

const Button = styled.button`
	&:hover {
		background-color: #333333;
		color: #e41749;
	}
`;

Button.defaultProps = {
	className:
		'mx-8 my-2 ml-auto border border-black p-1 rounded flex flex-row items-center',
	id: 'show-console',
};

const mapStateToProps = ({}: MyTypes.RootState) => ({});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators({}, dispatch);

type ShowConsoleButtonProps = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

const ShowConsoleButton = (props: ShowConsoleButtonProps) => {
	return (
		<Button>
			<i className="fa fa-terminal fa-2x" id="console-logo"></i>
			<span className="ml-1" id="show-console-text">
				Show Console
			</span>
		</Button>
	);
};

export default ShowConsoleButton;
