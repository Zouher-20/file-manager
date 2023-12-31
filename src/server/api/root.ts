import { fileRouter } from "~/server/api/file-manager/router";
import { userRouter } from "~/server/api/users/router";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
