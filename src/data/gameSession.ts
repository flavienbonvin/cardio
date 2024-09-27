import { getGame } from "@data/games";
import { getPlayer } from "@data/players";
import { db, eq, GameSession, GameSessionPlayer, Score } from "astro:db";

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

export const createGameSession = async (
  gameId: number,
  name: string,
  playerIds: number[],
) => {
  const game = await getGame(gameId);
  if (!game) return;

  const gameSession = await db
    .insert(GameSession)
    .values({
      createdAt: new Date(),
      updatedAt: new Date(),
      name,
      status: GameSessionStatus.running,
      gameId: gameId,
    })
    .returning({ insertedId: GameSession.id });

  playerIds.forEach(async (playerId) => {
    await createGameSessionPlayer(gameSession[0].insertedId, playerId);
  });
};

export const deleteGameSession = async (id: number) => {
  await db
    .delete(GameSessionPlayer)
    .where(eq(GameSessionPlayer.gameSessionId, id));
  await db.delete(Score).where(eq(Score.gameSessionId, id));
  await db.delete(GameSession).where(eq(GameSession.id, id));
};

export const getRunningGames = async () => {
  return await db
    .select()
    .from(GameSession)
    .where(eq(GameSession.status, GameSessionStatus.running));
};

export const getGameSessionsData = async (gameSessions: any[]) => {};
