import React from 'react';
import styled from 'styled-components';
import { supportedLanguages } from '../../../globals';
import store from '../../../store';
import { MyTypes } from '../../../store/app-custom-types';
import { setLanguage } from '../../../features/editor-internal/actions';

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
		// get selected value as language
		const selectedLang = ev.target.options[ev.target.selectedIndex]
			.value as AppGlobalTypes.SupportedLanguage;

		// dispatch to store
		store.dispatch<MyTypes.RootAction>(setLanguage(selectedLang));
	},
	defaultValue: 'typescript' as AppGlobalTypes.SupportedLanguage,
};

export default SelectLanguage;
