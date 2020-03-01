declare namespace AppFeatures {
	interface Auth {
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
	}
}
