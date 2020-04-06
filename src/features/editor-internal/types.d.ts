declare namespace AppFeatures {
	interface EditorInternal {
		/*
		 * code execution related
		 */

		isRunning: boolean;
		currentlySavedCode: string;
		token: string;
		watchLangChangeFromSocket: boolean;

		/*
		 * editor related
		 */
		currentLanguage: AGT.Language;

		/*
		 * consoleRelated
		 */
		consoleOutput: string;

		/*
		 * whether the editor is in freeze state (read only state)
		 */
		shouldFreeze: boolean;

		/* 
		* refreshCount
		*/
		refreshCount: number;
	}
}
