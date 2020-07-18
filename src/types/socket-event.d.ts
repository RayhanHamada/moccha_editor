/**
 * types for socket event emitter
 */
declare namespace Emitter {
  interface EmitEvent<
    Name extends string = string,
    Payload extends Record<string, any> = Record<string, any>
  > {
    name: Name;
    data: Payload & { roomKey: string };
  }

  type EventList =
    | EmitEvent<
        'cl',
        {
          /**
           * language id
           */
          langId: number;
        }
      >
    | EmitEvent<
        'player-join',
        {
          /**
           * our player data
           */
          player: Features.Player;
        }
      >
    | EmitEvent<
        'player_leave',
        {
          /**
           * our player data
           */
          player: Features.Player;
        }
      >
    | EmitEvent<
        'editor_sync',
        {
          /**
           * recently joined player socket id
           */
          recentClientId: string;

          /**
           * our code
           */
          code: string;

          /**
           * language Id
           */
          langId: number;

          /**
           * all players data in the room
           */
          players: Features.Player[];
        }
      >
    /**
     * event type for editor
     */
    | EmitEvent<
        'text-insertion',
        {
          idx: number;
          text: string;
        }
      >
    | EmitEvent<
        'text-deletion',
        {
          len: number;
          idx: number;
        }
      >
    | EmitEvent<
        'text-replacement',
        {
          idx: number;
          len: number;
          text: string;
        }
      >;
}

declare namespace Receiver {
  export type CL = {
    /**
     * language id
     */
    langId: number;
  };

  export type PlayerJoin = {
    /**
     * other player data
     */
    player: Features.Player;
  };

  export type PlayerLeave = {
    /**
     * other player data
     */
    player: Features.Player;
  };

  export type EditorSync = {
    /**
     * recently joined player socket id
     */
    recentClientId: string;

    /**
     * our code
     */
    code: string;

    /**
     * language Id
     */
    langId: number;

    /**
     * all players data in the room
     */
    players: Features.Player[];
  };
}
