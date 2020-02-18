import { expect } from 'chai';

import reducer from './reducer';
import { setLanguage } from './actions';

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
				language: 'abap',
			};

			const action = setLanguage('cpp');
			const languageAfterSet = reducer(mockState, action).language;
			const expectedLanguageSet: AppGlobalTypes.SupportedLanguage = 'cpp';

			expect(languageAfterSet).to.be.equal(expectedLanguageSet);
		});
	});
});
