const depToDep = require('dep-to-dep');
const { makeEnvInJson } = require('dotenv-file-maker');

/**
 * convert all devDependencies to dependency
 */
if (process.env.NODE_ENV === 'production') {
    
}

(async () => {
	await depToDep.convert('./package.json', 'toDep', [/^@types\//]).catch(() => {
		console.error('failed to convert ./package.json');
	});

	await makeEnvInJson('./.env-cmdrc.json', 'prod', './envListPath').catch(
		() => {
			console.error('failed to make env in json');
		}
	);
})();
