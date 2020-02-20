declare namespace AppFeatures {
	interface EditorInternal {
		/*
		 * code execution related
		 */

		isRunning: boolean;

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
