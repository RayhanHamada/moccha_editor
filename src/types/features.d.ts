declare namespace Features {
  export interface Auth {
    /**
     * our player data
     */
    me: Player;

    /**
     * the room key, retrieved by using auth API or friend share
     */
    roomKey: string;

    /**
     * determine if we're authenticated or not
     */
    authenticated: boolean;

    /**
     * for notify user a process is ongoing
     */
    isLoading: boolean;

    /**
     * determine whether the loading icon should appears
     */
    loadingMsg: string;

    /**
     * copied
     */
    copied: boolean;
  }

  export interface EditorInternal {
    /**
     * is the code is being ran
     */
    isRunning: boolean;

    /**
     * currently saved code
     */
    currentlySavedCode: string;

    /**
     * token for judge0 API
     */
    token: string;

    /**
     * to notify us if another player changing the language
     */
    watchLangChangeFromSocket: boolean;

    /**
     * editor related
     */
    currentLanguage: AGT.Language;

    /**
     * consoleRelated
     */
    consoleOutput: string;

    /**
     * whether the editor is in freeze state (read only state)
     */
    shouldFreeze: boolean;

    /**
     * refreshCount
     */
    refreshCount: number;
  }

  interface PlayerManager {
    /**
     * players name
     */
    players: Player[];
  }

  interface Player {
    /**
     * name of the player
     */
    username: string;

    /**
     * socketID of the player
     */
    socketID: string;

    /**
     * cursor color of the player
     */
    cursorColor: string;

    /**
     * is this player is room master
     */
    isRM: boolean;
  }
}
