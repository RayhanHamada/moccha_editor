import { expect } from 'chai';
import { createSubmissionAPI, getSubmissionAPI } from './judge0';
import { printDevLog } from '../utils';

describe.skip('Judge0 API', function() {
  this.timeout(15000);

  // passed
  it('createSubmissionAPI should return token', done => {
    const languageID = 74; // use typescript language
    const sourceCode = `console.log('hello world');`;

    createSubmissionAPI(languageID, sourceCode)
      .then(token => {
        printDevLog(`token ${JSON.stringify(token)}`);
        expect(token).to.be.exist;
        done();
      })
      .catch(() => {
        printDevLog(`error when fetch submission token`);
        done();
      });
  });

  // passed
  it('fetchSubmissionResult should return output', done => {
    const languageID = 74;
    const sourceCode = `console.log('hello world')`;
    const expectedValue = 'hello world\n';

    /**
     * fetch the token first
     */
    createSubmissionAPI(languageID, sourceCode).then(token => {
      /**
       * wait atleast 6 second before requesting for submission result
       */
      setTimeout(() => {
        /**
         * fetch submission result
         */
        getSubmissionAPI(token)
          .then(output => {
            expect(output.stdout).to.be.equal(expectedValue);
            expect(output.status.description).to.be.equal('Accepted');
            done();
          })
          .catch(() => {
            printDevLog('error when getting submission result !');
            done();
          });
      }, 6000);
    });
  });
});
