
import {
  createTRPCRouter,
} from "~/server/api/trpc";
import { createProcedure, getLatestProcedure, getHello } from './controler'

const trpcRoutes = {
  create: createProcedure,
  getLatest: getLatestProcedure,
  hello: getHello,
}

export const fileRouter =
  createTRPCRouter(trpcRoutes);
