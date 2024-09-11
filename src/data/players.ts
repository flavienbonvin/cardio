import { db, eq, Player } from "astro:db";

export const getAllPlayers = async () => {
  return await db.select().from(Player);
};

export const createPlayer = async (name: string) => {
  await db.insert(Player).values({
    name: name,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const deletePlayer = async (id: number) => {
  await db.delete(Player).where(eq(Player.id, id));
};

export const updatePlayer = async (id: number, name: string) => {
  await db.update(Player).set({ name: name }).where(eq(Player.id, id));
};

export const getPlayer = async (id: number) => {
  const [res] = await db.select().from(Player).where(eq(Player.id, id));
  return res;
};
