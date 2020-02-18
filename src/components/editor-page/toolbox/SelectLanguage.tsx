import React from 'react';
import styled from 'styled-components';

const Option = styled.option`
	/* border: 2px solid black; */
	background: #1e1e1e;
	color: #e41749;
`;

Option.defaultProps = {};

const SelectLanguage = styled.select`
	border: 1px solid black;
	height: 40px;
	background: transparent;
	border-radius: 7%;
`;

SelectLanguage.defaultProps = {
	children: (
		<>
			{supportedLanguages.map(lang => (
				<Option value={lang.toLowerCase()} key={lang}>
					{lang}
				</Option>
			))}
		</>
	),
	onChange: function(ev) {
		// editorRef.current?.forceUpdate(() => console.log('editor updated !'))
	},
};

export default SelectLanguage;
