import { createTRPCRouter } from "~/server/api/trpc";
import { createUserProcedure } from "./controler";

const trpcRoutes = {
  create: createUserProcedure,
};

export const userRouter = createTRPCRouter(trpcRoutes);
