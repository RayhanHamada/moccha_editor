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
	}
}
