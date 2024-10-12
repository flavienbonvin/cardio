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
  sync: defineAction({
    input: z
      .object({
        gameSessionId: z.number(),
        playerIdMinus: z.number().optional(),
        playerIdPlus: z.number().optional(),
        scoreDate: z.string(),
      })
      .array(),
    handler: async (games) => {
      const scoresToAdd = games.filter(
        (game) => !game.playerIdMinus && game.playerIdPlus,
      );

      const scoreToDecrease = games.filter(
        (game) => game.playerIdMinus && !game.playerIdPlus,
      );

      for (const game of scoresToAdd) {
        await increaseScore(
          game.gameSessionId,
          game.playerIdPlus!,
          new Date(game.scoreDate),
        );
      }

      for (const game of scoreToDecrease) {
        await decreaseScore(game.gameSessionId, game.playerIdMinus!);
      }
    },
  }),
};
