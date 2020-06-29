import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { MyTypes } from '../../../types/app-state';
import * as edinActions from '../../../features/editor-internal/actions';
import { connect } from 'react-redux';

const Button = styled.button`
	&:hover {
		background-color: #333333;
		color: #e41749;
	}
`;

Button.defaultProps = {
	className:
		'mx-8 mb-2 border border-black p-1 rounded flex flex-row items-center',
	id: 'show-console',
};

const mapStateToProps = ({}: MyTypes.RootState) => ({});

const mapDispatchToProps = (dispatch: MyTypes.AppDispatch) =>
	bindActionCreators(
		{
			resetConsole: edinActions.clearConsole,
		},
		dispatch
	);

type Props = AGT.Props<typeof mapStateToProps, typeof mapDispatchToProps>;

const ClearConsoleButton = (props: Props) => {
	return (
		<Button
			onClick={ev => {
				ev.persist();
				props.resetConsole();
			}}
		>
			<i className="fa fa-terminal fa-2x" id="console-logo"></i>
			<span className="ml-1" id="clear-console-text">
				Clear Console
			</span>
		</Button>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(ClearConsoleButton);
