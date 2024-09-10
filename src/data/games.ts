import { db, eq, GameSession, GameSessionPlayer } from "astro:db";

const getRunningGamesSession = async () => {
  return await db
    .select()
    .from(GameSession)
    .where(eq(GameSession.status, "running"));
};

const getPlayersForTheGame = async (gameId: number) => {
  return await db
    .select()
    .from(GameSessionPlayer)
    .where(eq(GameSessionPlayer.gameSessionId, gameId));
};

export const getRunningGamesData = async () => {
  const games = await getRunningGamesSession();
  const players = await Promise.all(
    games.map(async ({ id }) => await getPlayersForTheGame(id)),
  );

  return games.map((game, index) => ({
    ...game,
    players: players[index],
  }));
};
