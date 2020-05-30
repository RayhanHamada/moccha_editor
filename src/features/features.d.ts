declare namespace AppFeatures {
	export interface Auth {
		/*
		 * username
		 */
		username: string;

		/*
		 * the room key, retrieved by using auth API
		 */
		roomKey: string;
		authenticated: boolean;

		/*
		 * for notify user a process is ongoing
		 */
		isLoading: boolean;
		loadingMsg: string;

		/*
		 * is this user is room master
		 */
		isRM: boolean;

		copied: boolean;
	}

	export interface EditorInternal {
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

	interface PlayerManager {
		/*
		 * our data
		 */
		me: Player;

		/*
		 * the room master name
		 */
		roomMaster: Player;

		/*
		 * players name
		 */
		players: Player[];

		/*
		 * indicate whether another player is attempting to join the room
		 */
		isPlayerOtwRoom: boolean;

		/*
		 * the recent joined player ID
		 */
		recentJoinedPlayer: Player;
	}

	interface Player {
		name: string;
		socketID?: string;
	}
}
