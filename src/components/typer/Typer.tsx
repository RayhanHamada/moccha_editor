import React, { useEffect } from 'react';
import TypeIt from 'typeit';

import 'tailwindcss/dist/tailwind.css';
import './Typer.scss';

const startType = () => {

	const line8 = new TypeIt('#line-8', {
		strings: '// Perfect !',
		html: true,
		speed: 65,
		cursor: false,
		lifeLike: true,
	});

	const line7 = new TypeIt('#line-7', {
		strings: 'console.log(helloFromMoccha("Hamada"));',
		html: true,
		speed: 65,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line8.go();
		},
	});

	const line6 = new TypeIt('#line-6', {
		strings: "// this is Hamada's code btw :)",
		html: true,
		speed: 65,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line7.go();
		},
	});


	const line5 = new TypeIt('#line-5', {
		strings: '// let me help you call that function',
		html: true,
		speed: 65,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line6.go();
		},
	});

	
	const line4 = new TypeIt('#line-4', {
		strings: '}',
		html: true,
		speed: 90,
		cursor: false,
		lifeLike: true
	});

	const line3 = new TypeIt('#line-3', {
		strings: '&nbsp &nbsp &nbsp &nbsp return `hello ${mocch`',
		html: true,
		speed: 90,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line4.go();
		},
	})
		.delete(2)
		.delete(2)
		.delete(2)
		.type('name}, my name is Moccha`;');

	const line2 = new TypeIt('#line-2', {
		strings: 'function helloWorld',
		html: true,
		speed: 90,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line3.go();
			line5.go();
		},
	})
		.delete(2)
		.delete(1)
		.delete(2)
		.type('FromMoccha(name: string) {');

	const line1 = new TypeIt('#line-1', {
		strings: "// this is moccha's code",
		html: true,
		speed: 90,
		cursor: false,
		lifeLike: true,
		afterComplete: () => {
			line2.go();
		},
	});

	

	

	

	

	

	

	line1.go();
};

const Typer = () => {
	useEffect(() => {
		startType();
	}, []);

	return (
		<div
			id="wrapper-typeit"
			className="ml-32 border-gray-700 border mr-10 px-10 py-10"
		>
			<p className="code-line-comment text-2xl" id="line-1" />
			<p className="code-line text-2xl" id="line-2"></p>
			<p className="code-line text-2xl" id="line-3"></p>
			<p className="code-line text-2xl" id="line-4"></p>
			<br />
			<br />
			<p className="code-line-comment text-2xl" id="line-5"></p>
			<p className="code-line-comment text-2xl" id="line-6"></p>
			<p className="code-line text-2xl" id="line-7"></p>
			<br />
			<p className="code-line-comment text-2xl" id="line-8"></p>
		</div>
	);
};

export default Typer;
