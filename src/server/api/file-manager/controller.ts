import { protectedProcedure } from "../trpc";
import {
  updateGroupValidator,
  deleteGroupValidator,
  getAllFileInGroupValidator,
  deleteFileValidator,
  creatNewGroupValidator,
  getGroupsValidator,
  leaveGroupValidator,
  createFileValidator,
  checkinValidator,
  checkoutValidator,
  fileDetailsValidator,
  updateFileValidator,
  bulkCheckinValidator,
  getGroupByIdValidator,
} from "./validators";
import { FilesService } from "./service";
import fs from "fs/promises";
import path from "path";
import { existsSync, readFileSync } from "fs";
import { UserService } from "../users/service";
const filesService = new FilesService();
const userService = new UserService();


export const leaveGroup = protectedProcedure
  .input(leaveGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const groupId = input;
      const data = await filesService.leaveGroup(groupId, ctx.session.user.id);
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
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
      console.error("Procedure Error:", error);
    }
  });
export const updateGroup = protectedProcedure
  .input(updateGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, name, filesLimit, usersLimit, checkinTimeOut } = input;
      const data = await filesService.updateGroup(groupId, {
        name, filesLimit, usersLimit, checkinTimeOut
      });
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getUserGroups = protectedProcedure
  .input(getGroupsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize } = input;
      const data = await filesService.getUserGroups(
        ctx.session.user.id,
        page,
        pageSize,
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getSharedGroups = protectedProcedure
  .input(getGroupsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize } = input;
      const data = await filesService.getSharedGroups(
        ctx.session.user.id,
        page,
        pageSize,
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getAllFileInGroup = protectedProcedure
  .input(getAllFileInGroupValidator)
  .query(async ({ input, ctx }) => {
    try {
      const { page, pageSize, groupId } = input;
      const data = await filesService.getAllFileInGroup(
        ctx.session.user.id,
        page,
        pageSize,
        groupId,
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const createFile = protectedProcedure
  .input(createFileValidator)
  .mutation(async ({ input, ctx }) => {
    const { groupId, name, contents } = input;
    const destinationDirPath = path.join(process.cwd(), "public/upload");
    const filePath = path.join(destinationDirPath, name);

    try {
      if (!existsSync(destinationDirPath)) {
        fs.mkdir(destinationDirPath, { recursive: true });
      }
      await fs.writeFile(path.join(destinationDirPath, name), contents);

      const data = await filesService.createFile(
        ctx.session.user.id,
        groupId,
        name,
        filePath,
      );
      return data;
    } catch (error) {
      if (existsSync(filePath)) {
        fs.rm(filePath)
      }
      console.error("Procedure Error:", error);
    }
  });

export const createGroup = protectedProcedure
  .input(creatNewGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const inputObj = input;
      const data = await filesService.addNewGroup(
        inputObj,
        ctx.session.user.id,
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const deleteFile = protectedProcedure
  .input(deleteFileValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const fileId = input;
      const data = await filesService.deleteFile(ctx.session.user.id, fileId);
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });
export const checkin = protectedProcedure
  .input(checkinValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const fileId = input;
      const group = await filesService.getGroupByFile(fileId)
      if (group) {
        const data = await filesService.checkinFile(ctx.session.user.id, fileId).then((data) => {
          setTimeout(() => {
            filesService.checkoutFile(ctx.session.user.id, fileId);
          }, group.checkinTimeOut * 60000)
          return data
        })
        return data;
      }
      else {
        throw new Error('Invalid file')
      }
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const checkout = protectedProcedure
  .input(checkoutValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const fileId = input;
      const data = await filesService.checkoutFile(ctx.session.user.id, fileId);
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getFileDetails = protectedProcedure
  .input(fileDetailsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const fileId = input;
      const data = await filesService.getFileDetails(
        fileId
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getRawFile = protectedProcedure
  .input(fileDetailsValidator)
  .query(async ({ input, ctx }) => {
    try {
      const fileId = input;
      const data = await filesService.getFileDetails(
        fileId
      );
      if (data) {
        const fileBuffer = readFileSync(data.path, 'utf8');
        return { content: fileBuffer };
      }
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const updateFile = protectedProcedure
  .input(updateFileValidator)
  .mutation(async ({ input, ctx }) => {
    const { fileId, contents } = input;
    const destinationDirPath = path.join(process.cwd(), "public/upload");
    try {
      const data = await filesService.updateFile(fileId, contents);
      const filePath = path.join(destinationDirPath, data.name);

      if (!existsSync(filePath)) {
        throw new Error('File Not Found')
      }

      await fs.rm(filePath)
      await fs.writeFile(path.join(destinationDirPath, data.name), contents);
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const bulkCheckin = protectedProcedure
  .input(bulkCheckinValidator)
  .mutation(async ({ input, ctx }) => {
    const ids = input;
    try {
      const data = await filesService.bulkCheckin(ids, ctx.session.user.id);
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const getGroupById = protectedProcedure
  .input(getGroupByIdValidator)
  .query(async ({ input, ctx }) => {
    try {
      const groupId = input;
      const data = await filesService.getGroupById(
        groupId
      );
      return data
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });
