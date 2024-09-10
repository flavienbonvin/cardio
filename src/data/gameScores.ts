import { db, eq, Score } from "astro:db";

export const getGameDetails = async (gameId: number) => {
  return await db.select().from(Score).where(eq(Score.gameSessionId, gameId));
};
