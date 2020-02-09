/* eslint-disable react/no-children-prop */

import React from 'react';

import TextLoop from 'react-text-loop';

const BannerDesc = () => {
	const texts = [
		'Collaboration',
		'Pair Programming',
		'Ngoding Bareng',
		'Nugas Bareng',
		'Projekan Bareng',
	];

	return (
		<span className="banner-desc ml-32 text-3xl">
			<TextLoop children={texts} /> Made Easy
		</span>
	);
};

export default BannerDesc;
