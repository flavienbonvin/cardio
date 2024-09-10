import { defineAction } from "astro:actions";
import { db, GameSession } from "astro:db";
import { z } from "astro:schema";

export const games = {
  createGameSession: defineAction({
    input: z.object({
      name: z.string(),
      gameId: z.number(),
    }),
    handler: async (input) => {
      await db.insert(GameSession).values({
        name: input.name,
        gameId: input.gameId,
        status: "running",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    },
  }),
};
