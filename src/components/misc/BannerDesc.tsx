/* eslint-disable react/no-children-prop */

import React from 'react';

import TextLoop from 'react-text-loop';
import styled from 'styled-components';

const texts = [
	'Collaboration',
	'Pair Programming',
	'Ngoding Bareng',
	'Nugas Bareng',
	'Projekan Bareng',
];

const BannerDesc = styled.span``;

BannerDesc.defaultProps = {
	className: 'banner-desc ml-32 text-3xl',
	children: (
		<>
			<TextLoop children={texts} /> Made Easy
		</>
	),
};

export default BannerDesc;
