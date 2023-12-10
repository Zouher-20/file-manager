import { protectedProcedure, publicProcedure } from "../trpc";
import { updateGroupValidator, deleteGroupValidator, searchValidator, addNewFileValidator, exitGroupValidator, getAllFileInGroupValidator, deleteMyFileValidator, sendRequsetValidator, filterFilestatusValidator, filterFileByCreatedAtValidator, creatNewGroupValidator, getGroupsValidator, responseValidator, editFileValidator, leaveGroupValidator } from "./validators";
import { FilesService } from "./service";


const filesService = new FilesService();


export const searchUser = protectedProcedure
  .input(searchValidator)
  .query(async ({ input }) => {
    try {
      const { page, pageSize, name, email, } = input;
      const data = await filesService.searchUser(name, email, page, pageSize);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });


export const leaveGroup = protectedProcedure
  .input(leaveGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const groupId = input;
      const data = await filesService.leaveGroup(groupId, ctx.session.user.id);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });
export const deleteGroup = protectedProcedure
  .input(deleteGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const groupId = input;
      const data = await filesService.deleteGroup(groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });
export const updateGroup = protectedProcedure
  .input(updateGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, groupName } = input;
      const data = await filesService.updateGroup(groupId, groupName);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const sendRequset = protectedProcedure
  .input(sendRequsetValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, receiverId } = input;
      const data = await filesService.sendRequset(ctx.session.user.id, receiverId, groupId,);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const getUserGroups = protectedProcedure
  .input(getGroupsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize } = input;
      const data = await filesService.getUserGroups(ctx.session.user.id, page, pageSize,);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })

export const getSharedGroups = protectedProcedure
  .input(getGroupsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize } = input;
      const data = await filesService.getSharedGroups(ctx.session.user.id, page, pageSize,);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })



export const getAllFileInGroup = protectedProcedure
  .input(getAllFileInGroupValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize, groupId } = input;
      const data = await filesService.getAllFileInGroup(ctx.session.user.id, page, pageSize, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const resposeToJoin = protectedProcedure
  .input(responseValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, state } = input;
      const data = await filesService.respose(ctx.session.user.id, groupId, state);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const createFile = protectedProcedure
  .input(responseValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, state } = input;
      const data = await filesService.respose(ctx.session.user.id, groupId, state);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const createGroup = protectedProcedure
  .input(creatNewGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupName } = input;
      const data = await filesService.addNewGroup(groupName, ctx.session.user.id);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const editFile = protectedProcedure
  .input(editFileValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { file, fileName, fileId, state } = input;
      const data = await filesService.editFile(ctx.session.user.id, fileId, state, file, fileName);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const addNewFile = protectedProcedure
  .input(addNewFileValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { file, groupId, fileName } = input;
      const data = await filesService.addNewFile(groupId, ctx.session.user.id, fileName, file);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const filterFileByCreatedAt = protectedProcedure
  .input(filterFileByCreatedAtValidator)
  .query(async ({ input }) => {
    try {
      const { groupId, page, pageSize, createdAt } = input;
      const data = await filesService.filterFileByCreatedAt(groupId, createdAt, page, pageSize);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const filterFileByStatus = protectedProcedure
  .input(filterFilestatusValidator)
  .query(async ({ input }) => {
    try {
      const { groupId, page, pageSize, status } = input;
      const data = await filesService.filterFileByStatus(groupId, status, page, pageSize);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const deleteMyFiles = protectedProcedure
  .input(deleteMyFileValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { fileId } = input;
      const data = await filesService.deleteMyFile(ctx.session.user.id, fileId,);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const getAllFileInAllGroup = protectedProcedure
  .input(getGroupsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize } = input;
      const data = await filesService.getAllFileInAllgroup(ctx.session.user.id, page, pageSize);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });

export const exitGroup = protectedProcedure
  .input(exitGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId } = input;
      const data = await filesService.exitGroup(ctx.session.user.id, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  });



