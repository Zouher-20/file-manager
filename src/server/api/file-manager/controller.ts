import { protectedProcedure, publicProcedure } from "../trpc";
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
} from "./validators";
import { FilesService } from "./service";
import fs from "fs/promises";
import path from "path";
import { existsSync } from "fs";

const filesService = new FilesService();

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
      const { groupId, groupName } = input;
      const data = await filesService.updateGroup(groupId, groupName);
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
    try {
      const { groupId, name, contents } = input;

      const destinationDirPath = path.join(process.cwd(), "public/upload");
      if (!existsSync(destinationDirPath)) {
        fs.mkdir(destinationDirPath, { recursive: true });
      }
      await fs.writeFile(path.join(destinationDirPath, name), contents);

      const filePath = path.join(destinationDirPath, name);

      const data = await filesService.createFile(
        ctx.session.user.id,
        groupId,
        name,
        filePath,
      );
      return data;
    } catch (error) {
      console.error("Procedure Error:", error);
    }
  });

export const createGroup = protectedProcedure
  .input(creatNewGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupName } = input;
      const data = await filesService.addNewGroup(
        groupName,
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
      const data = await filesService.checkinFile(ctx.session.user.id, fileId);
      return data;
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

