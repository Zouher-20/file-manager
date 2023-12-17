import { createTRPCRouter } from "~/server/api/trpc";
import {
  removeUserFromGroup,
  addUserToGroup, createUserProcedure, getUsersOutsideGroup,
  getUsersInGroup
} from "./controller";

const trpcRoutes = {
  create: createUserProcedure,
  addUserToGroup,
  getUsersOutsideGroup,
  getUsersInGroup,
  removeUserFromGroup
};

export const userRouter = createTRPCRouter(trpcRoutes);
