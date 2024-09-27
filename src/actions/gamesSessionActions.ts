import { createGameSession, deleteGameSession } from "@data/gameSession";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const gameSessions = {
  createGameSession: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
      gameId: z.number(),
      playerIds: z.array(z.number()),
    }),
    handler: async ({ gameId, name, playerIds }) => {
      await createGameSession(gameId, name, playerIds);
    },
  }),
  deleteGameSession: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
    }),
    handler: async ({ id }) => {
      await deleteGameSession(id);
    },
  }),
  editGameSession: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
      gameId: z.number(),
      playerId: z.number(),
    }),
    handler: async ({ id, gameId, playerId }) => {
      console.log(id, gameId, playerId);
    },
  }),
};
