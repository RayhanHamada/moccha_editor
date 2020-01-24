/* eslint-disable react/no-children-prop */

import React from 'react';

import TextLoop from 'react-text-loop';

const BannerDesc = () => {
	const texts = [
		'Pair Programming',
		'Ngoding Bareng',
		<p key="bucin">
			<strike>Bucin</strike> Projekan Bareng
		</p>,
		'Nugas Bareng',
	];

	return (
		<p className="banner-desc ml-32 text-3xl">
			<TextLoop children={texts} /> Made Easy
		</p>
	);
};

export default BannerDesc;