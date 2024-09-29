import { decreaseScore, increaseScore } from "@data/score";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const score = {
  plus: defineAction({
    accept: "form",
    input: z.object({
      gameSessionId: z.number(),
      playerIdPlus: z.number(),
    }),
    handler: async ({ gameSessionId, playerIdPlus }) => {
      await increaseScore(gameSessionId, playerIdPlus);
    },
  }),
  minus: defineAction({
    accept: "form",
    input: z.object({
      gameSessionId: z.number(),
      playerIdMinus: z.number(),
    }),
    handler: async ({ gameSessionId, playerIdMinus }) => {
      await decreaseScore(gameSessionId, playerIdMinus);
    },
  }),
};
