const fs = require('fs');

(async () => {
	const envs = ['NODE_ENV', 'BASE_SERVER_URL', 'MOCK_BASE_SERVER_URL'];

	const envObj = {
		prod: envs.reduce((prev, curr) => ({
			...prev,
			[curr]: process.env[curr],
		}), {}),
	};

	await fs.promises.writeFile('./.env-cmdrc.json', JSON.stringify(envObj));
})();
