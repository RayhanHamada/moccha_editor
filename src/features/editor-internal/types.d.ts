declare namespace AppFeatures {
	interface EditorInternal {
		/*
		 * code execution related
		 */

		isRunning: boolean;
		currentlySavedCode: string;
		token: string;

		/*
		 * editor related
		 */
		currentLanguage: AppGlobalTypes.Language;

		/*
		 * consoleRelated
		 */
		consoleOutput: string;
	}
}
