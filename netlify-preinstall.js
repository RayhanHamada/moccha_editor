const fs = require('fs');

(async () => {
	/**
	 * read package.json and convert devDependencies to dependencies
	 */
	const file = await fs.promises
		.readFile('./package.json', { encoding: 'utf-8' })
		.catch(() => {
			console.error('failed at reading package.json');
		});

	const parsedFile = JSON.parse(file);

	const newParsedFile = {
		...parsedFile,
		devDependencies: {},
		dependencies: {
			...parsedFile.dependencies,
			...parsedFile.devDependencies,
		},
	};

	await fs.promises
		.writeFile('./package.json', JSON.stringify(newParsedFile))
		.catch(() => {
			console.error(`error when writing to package.json`);
		});
})();
