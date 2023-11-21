
import {
  createTRPCRouter,
} from "~/server/api/trpc";
import { createProcedure, getLatestProcedure } from './controler'

const trpcRoutes = {
  create: createProcedure,
  getLatest: getLatestProcedure

}

export const postRouter =
  createTRPCRouter(trpcRoutes);
