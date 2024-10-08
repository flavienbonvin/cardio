import {
  db,
  Game,
  GameSession,
  GameSessionPlayer,
  Player,
  Score,
} from "astro:db";

const generateScore = () => {
  return Array.from({ length: 23 }).map((_, index) => {
    return {
      id: index,
      gameSessionId: 1,
      winnerId: Math.floor(Math.random() * 2) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
};

export default async function seed() {
  await db.insert(Player).values([
    { name: "Pedro", id: 1, createdAt: new Date(), updatedAt: new Date() },
    { name: "Flavien", id: 2, createdAt: new Date(), updatedAt: new Date() },
  ]);

  await db.insert(Game).values([
    {
      id: 1,
      name: "Uno",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Deutio",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await db.insert(GameSession).values([
    {
      id: 1,
      name: "Game 1",
      gameId: 1,
      status: "running",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Game 2",
      gameId: 2,
      status: "finished",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: "Game 3",
      gameId: 1,
      status: "deleted",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  await db.insert(GameSessionPlayer).values([
    {
      gameSessionId: 1,
      playerId: 1,
    },
    {
      gameSessionId: 1,
      playerId: 2,
    },
  ]);

  await db.insert(Score).values([...generateScore()]);
}
