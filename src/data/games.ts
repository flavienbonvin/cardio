import { db, eq, Game } from "astro:db";

export const getAllGames = async () => {
  return await db.select().from(Game);
};

export const createGame = async (name: string) => {
  await db.insert(Game).values({
    name: name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const deleteGame = async (id: number) => {
  await db.delete(Game).where(eq(Game.id, id));
};

export const updateGame = async (id: number, name: string) => {
  await db.update(Game).set({ name: name }).where(eq(Game.id, id));
};

export const getGame = async (id: number) => {
  const [res] = await db.select().from(Game).where(eq(Game.id, id));
  return res;
};
