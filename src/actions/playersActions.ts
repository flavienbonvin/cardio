import { createPlayer, deletePlayer, updatePlayer } from "@data/players";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const players = {
  createPlayer: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      await createPlayer(name);
    },
  }),
  deletePlayer: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
    }),
    handler: async ({ id }) => {
      await deletePlayer(id);
    },
  }),
  editPlayer: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    handler: async ({ id, name }) => {
      await updatePlayer(id, name);
    },
  }),
};
