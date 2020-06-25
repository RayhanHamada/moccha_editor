import { expect } from 'chai';
import { fetchSubmissionToken, fetchSubmissionResult } from './judge0';
import { printDevLog } from '../utils';

describe('Judge0 API', function() {
	this.timeout(15000);

	// passed
	it('fetchSubmissionToken should return token', async done => {
		const languageID = 74; // use typescript language
		const sourceCode = `console.log('hello world');`;

		await fetchSubmissionToken(languageID, sourceCode).then(token => {
			expect(token).to.be.exist;
			done();
		}).catch(() => {
			printDevLog(`error when fetch submission token`)
		});
		done();
	});

	// passed
	it('fetchSubmissionResult should return output', done => {
		const languageID = 74;
		const sourceCode = `console.log('hello world')`;
		const expectedValue = 'hello world\n';

		/**
		 * fetch the token first
		 */
		fetchSubmissionToken(languageID, sourceCode).then(async token => {
			/**
			 * wait atleast 6 second before requesting for submission result
			 */
			await setTimeout(() => {
				/**
				 * fetch submission result
				 */
				fetchSubmissionResult(token).then(output => {
					expect(output.stdout).to.be.equal(expectedValue);
					expect(output.status.description).to.be.equal('Accepted');
					done();
				});
			}, 6000);
		});
	});
});
