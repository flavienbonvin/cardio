import { getGame } from "@data/games";
import {
  createGameSessionPlayer,
  deleteGameSessionPlayer,
} from "@data/gameSessionPlayer";
import { db, eq, GameSession, Score } from "astro:db";

export enum GameSessionStatus {
  running = "running",
  finished = "finished",
}

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
  await deleteGameSessionPlayer(id);
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
