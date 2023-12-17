import { createTRPCRouter } from "~/server/api/trpc";
import {
  leaveGroup,
  updateGroup,
  getSharedGroups,
  deleteGroup,
  getUserGroups,
  getAllFileInGroup,
  createFile,
  deleteFile,
  createGroup,
  checkin,
  checkout
} from "./controller";

const trpcRoutes = {
  deleteGroup,
  getUserGroups: getUserGroups,
  leaveGroup: leaveGroup,
  getSharedGroups: getSharedGroups,
  getAllFileInGroup: getAllFileInGroup,
  createFile: createFile,
  addNewGroup: createGroup,
  updateGroup: updateGroup,
  deleteFile: deleteFile,
  checkin,
  checkout
};

export const fileRouter = createTRPCRouter(trpcRoutes);
