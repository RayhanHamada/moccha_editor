import { expect } from 'chai';
import { fetchSubmissionToken, fetchSubmissionResult } from './judge0';

describe('Judge0 API', function() {
	this.timeout(10000);

	// * passed
	it.skip('fetchSubmissionToken should return token', done => {
		const languageID = 74; // use typescript language
		const sourceCode = `console.log('hello world');`;

		fetchSubmissionToken(languageID, sourceCode).then(token => {
			expect(token).to.be.exist;
			done();
		});
	});

	// * passed
	it.skip('fetchSubmissionResult should return output', done => {
		const languageID = 74;
		const sourceCode = `console.log('hello world')`;
		const expectedValue = 'hello world\n';

		/*
		 * fetch the token first
		 */
		fetchSubmissionToken(languageID, sourceCode).then(async token => {
			await setTimeout(() => {
				/*
				 * fetch submission result
				 */
				fetchSubmissionResult(token).then(output => {
					expect(output).to.be.equal(expectedValue);
					done();
				});
			}, 6000);
		});
	});
});
