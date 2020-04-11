declare namespace AppFeatures {
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
