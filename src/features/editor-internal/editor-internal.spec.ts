import { expect } from 'chai';

import { setLanguage } from './actions';
import { supportedLanguages } from '../../globals';
import reducer from './reducer';

describe("editor internal's", function() {
	describe('reducer', function() {
		let mockState: AppFeatures.EditorInternal;

		this.beforeEach(() => {
			mockState = undefined as any;
		});

		it('should able to set language', () => {
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
			};

			const expectedLanguage = supportedLanguages[1];

			const action = setLanguage(expectedLanguage);

			const languageAfterSet = reducer(mockState, action).currentLanguage;

			expect(languageAfterSet).to.be.deep.equal(expectedLanguage);
		});
	});
});
