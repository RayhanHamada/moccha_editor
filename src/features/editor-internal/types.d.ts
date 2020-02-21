declare namespace AppFeatures {
	interface EditorInternal {
		/*
		 * code execution related
		 */

		isRunning: boolean;
		currentlySavedCode: string;

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
