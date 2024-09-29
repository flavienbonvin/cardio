import { getPlayer } from "@data/players";
import { and, db, eq, GameSessionPlayer, Player } from "astro:db";

export enum GameSessionStatus {
  running = "running",
  finished = "finished",
}

export const createGameSessionPlayer = async (
  gameSessionId: number,
  playerId: number,
) => {
  const player = await getPlayer(playerId);
  if (!player) return;

  await db.insert(GameSessionPlayer).values({
    gameSessionId,
    playerId,
  });
};

export const deleteGameSessionPlayer = async (id: number) => {
  await db
    .delete(GameSessionPlayer)
    .where(eq(GameSessionPlayer.gameSessionId, id));
};

export const getPlayersFromGameSession = async (gameSessionId: number) => {
  return await db
    .select()
    .from(Player)
    .leftJoin(
      GameSessionPlayer,
      and(
        eq(GameSessionPlayer.gameSessionId, gameSessionId),
        eq(Player.id, GameSessionPlayer.playerId),
      ),
    );
};
