import { and, db, desc, eq, Score } from "astro:db";

export const getGameSessionScore = async (gameSessionId: number) => {
  return await db
    .select()
    .from(Score)
    .where(eq(Score.gameSessionId, gameSessionId));
};

export const increaseScore = async (
  gameSessionId: number,
  winnerId: number,
  date?: Date,
) => {
  await db.insert(Score).values({
    winnerId,
    gameSessionId,
    createdAt: date ?? new Date(),
    updatedAt: date ?? new Date(),
  });
};

export const decreaseScore = async (
  gameSessionId: number,
  winnerId: number,
) => {
  const scoresA = await db
    .select()
    .from(Score)
    .where(
      and(eq(Score.gameSessionId, gameSessionId), eq(Score.winnerId, winnerId)),
    )
    .orderBy(desc(Score.createdAt));

  await db.delete(Score).where(eq(Score.id, scoresA[0].id));
};
