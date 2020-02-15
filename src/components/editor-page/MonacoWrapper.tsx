import React, { createRef } from 'react';
import monaco from 'monaco-editor';
import MonacoEditor, { ChangeHandler } from 'react-monaco-editor';
import 'tailwindcss/dist/tailwind.css';
import './MonacoWrapper.scss';

const MonacoWrapper = () => {
	const iVal = `function hello(nama: string) {
    console.log(\`halo \${nama}!\`);
}
    
hello('moccha');`;

	return (
		<div id="monaco-wrapper" className="ml-10">
			<MonacoEditor
				height={480}
				width={1000}
				theme="vs-dark"
				language="typescript"
				value={iVal}
			/>
		</div>
	);
};

export default MonacoWrapper;
