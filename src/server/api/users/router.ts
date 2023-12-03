import { createTRPCRouter } from "~/server/api/trpc";
import { createUserProcedure } from "./controller";

const trpcRoutes = {
  create: createUserProcedure,
};

export const userRouter = createTRPCRouter(trpcRoutes);
