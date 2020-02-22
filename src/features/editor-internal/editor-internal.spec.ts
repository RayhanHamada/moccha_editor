import { expect } from 'chai';

import { supportedLanguages } from '../../globals';
import { setLanguage, fetchSubmissionToken } from './actions';
import reducer from './reducer';

describe("editor internal's", function() {
	describe('action', function() {
		let mockState: AppFeatures.EditorInternal;

		this.beforeEach(() => {
			mockState = undefined as any;
		});

		// * passed
		it.skip('setLanguage should set language to Javascript', () => {
			// set mock state
			mockState = {
				isRunning: false,
				currentLanguage: {
					name: 'Typescript',
					nameInEditor: 'typescript',
					id: 74,
					version: '3.7.4',
				},
				consoleOutput: '',
				currentlySavedCode: '',
				token: '',
			};

			const expectedLanguage = supportedLanguages[1];
			const action = setLanguage(expectedLanguage);
			const languageAfterSet = reducer(mockState, action).currentLanguage;

			expect(languageAfterSet).to.be.deep.equal(expectedLanguage);
		});

		it('fetchSubmissionToken.request should set isRunning', () => {
			// set mock state
			mockState = {
				isRunning: false,
				currentLanguage: {
					name: 'Typescript',
					nameInEditor: 'typescript',
					id: 74,
					version: '3.7.4',
				},
				consoleOutput: '',
				currentlySavedCode: '',
				token: '',
			};

			/*
			 * should set isRunning to true
			 */
			const expectedValue = true;
			const action = fetchSubmissionToken.request();
			const afterValue = reducer(mockState, action).isRunning;

			expect(afterValue).to.be.equal(expectedValue);
		});

		it('fetchSubmissionToken.success should set token and consoleOuput', () => {
			// * set mock state
			mockState = {
				isRunning: false,
				currentLanguage: {
					name: 'Typescript',
					nameInEditor: 'typescript',
					id: 74,
					version: '3.7.4',
				},
				consoleOutput: '',
				currentlySavedCode: '',
				token: '',
			};

			/*
			 * set token
			 */
			let expectedValue = 'test-token';
			const action = fetchSubmissionToken.success(expectedValue);
			let output = reducer(mockState, action);

			let actualValue = output.token;
			expect(actualValue).to.be.equal(expectedValue);

			/*
			 * set consoleOutput
			 */
			expectedValue = "\n> Code is Running\n";
			output = reducer(mockState, action);

			actualValue = output.consoleOutput;

			expect(actualValue).to.be.equal(expectedValue);
		});
	});
});
