import {
  db,
  Game,
  GameSession,
  GameSessionPlayer,
  Player,
  Score,
} from "astro:db";

const generateScore = () => {
  return Array.from({ length: 10 }).map((_, index) => {
    return {
      id: index,
      gameSessionId: 1,
      winnerId: Math.floor(Math.random() * 2) + 1,
    };
  });
};

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Player).values([
    { name: "John Doe", id: 1 },
    { name: "Jane Doe", id: 2 },
  ]);

  await db.insert(Game).values([
    {
      id: 1,
      name: "Uno",
    },
    {
      id: 2,
      name: "Deutio",
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
