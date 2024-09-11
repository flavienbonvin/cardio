import { column, defineDb, defineTable } from "astro:db";

export const Game = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

export const Player = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

export const GameSession = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    status: column.text(),
    gameId: column.number({ references: () => Game.columns.id }),
    createdAt: column.date(),
    updatedAt: column.date(),
  },
});

export const GameSessionPlayer = defineTable({
  columns: {
    gameSessionId: column.number({ references: () => GameSession.columns.id }),
    playerId: column.number({ references: () => Player.columns.id }),
  },
});

export const Score = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    gameSessionId: column.number({ references: () => GameSession.columns.id }),
    winnerId: column.number({ references: () => Player.columns.id }),
  },
});

export default defineDb({
  tables: {
    Game,
    Player,
    GameSession,
    GameSessionPlayer,
    Score,
  },
});
