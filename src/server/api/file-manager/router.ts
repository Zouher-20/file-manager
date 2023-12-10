
import {
  createTRPCRouter,
} from "~/server/api/trpc";
import {
  leaveGroup, updateGroup, getSharedGroups, deleteGroup, exitGroup, getUserGroups, getAllFileInGroup,
  getAllFileInAllGroup, searchUser, addNewFile, deleteMyFiles, createGroup, sendRequset, resposeToJoin,
  editFile, filterFileByCreatedAt, filterFileByStatus
} from './controller'

const trpcRoutes = {
  deleteGroup,
  getUserGroups: getUserGroups,
  leaveGroup: leaveGroup,
  getSharedGroups: getSharedGroups,
  getAllFileInGroup: getAllFileInGroup,
  addNewFile: addNewFile,
  addNewGroup: createGroup,
  updateGroup: updateGroup,
  updateFile: editFile,
  sendJion: sendRequset,
  resposeJoin: resposeToJoin,
  filterFileByCreatedAt: filterFileByCreatedAt,
  filterFileByStatus: filterFileByStatus,
  deleteMyFiles: deleteMyFiles,
  exitGroup: exitGroup,
  getAllFileInAllGroup: getAllFileInAllGroup,
  searchUser: searchUser
}

export const fileRouter =
  createTRPCRouter(trpcRoutes);
