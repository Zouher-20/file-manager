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
  checkout,
  getFileDetails,
  getRawFile,
  updateFile,
  bulkCheckin,
  getGroupById
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
  updateFile,
  getFileDetails: getFileDetails,
  getRawFile,
  checkin,
  checkout,
  bulkCheckin,
  getGroupById
};

export const fileRouter = createTRPCRouter(trpcRoutes);
