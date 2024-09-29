import { games } from "actions/gamesActions";
import { gameSessions } from "actions/gamesSessionActions";
import { players } from "actions/playersActions";
import { score } from "actions/score";

export const server = {
  players,
  games,
  gameSessions,
  score,
};
