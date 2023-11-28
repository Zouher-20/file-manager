
import {
  createTRPCRouter,
} from "~/server/api/trpc";
import {exitGroup,getAllGroup,getAllFileInGroup, getAllFileInAllGroup ,searchUser,addNewFile,deleteMyFiles, createGroup,sendRequset,resposeToJoin,editFile,filterFileByCreatedAt,filterFileByStatus} from './controler'

const trpcRoutes = {
  getAllGroup:getAllGroup,
  getAllFileInGroup:getAllFileInGroup,
  addNewFile :addNewFile,
  addNewGroup:createGroup,
  updateFile:editFile,
  sendJion:sendRequset,
  resposeJoin:resposeToJoin,
  filterFileByCreatedAt:filterFileByCreatedAt,
  filterFileByStatus:filterFileByStatus,
  deleteMyFiles:deleteMyFiles,
  exitGroup:exitGroup,
  getAllFileInAllGroup:getAllFileInAllGroup,
  searchUser:searchUser
}

export const fileRouter =
  createTRPCRouter(trpcRoutes);
