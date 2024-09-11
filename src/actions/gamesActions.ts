import { createGame, deleteGame, updateGame } from "@data/games";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const games = {
  createGame: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      await createGame(name);
    },
  }),
  deleteGame: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
    }),
    handler: async ({ id }) => {
      await deleteGame(id);
    },
  }),
  editGame: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    handler: async ({ id, name }) => {
      await updateGame(id, name);
    },
  }),
};
