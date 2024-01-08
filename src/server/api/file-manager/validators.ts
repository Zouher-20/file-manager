import { z } from "zod";

export const deleteGroupValidator = z.number();
export const leaveGroupValidator = z.number();
export const getGroupByIdValidator = z.number();

export const bulkCheckinValidator = z.array(z.number())
export const updateGroupValidator = z.object({
  name: z.string().min(1),
  groupId: z.number(),
  checkinTimeOut: z.number().min(1),
  filesLimit: z.number().min(1),
  usersLimit: z.number().min(1),
});

export const updateFileValidator = z.object({
  fileId: z.number(),
  contents: z.string()
})
export const creatNewGroupValidator = z.object({
  name: z.string().min(1),
  checkinTimeOut: z.number().min(1),
  filesLimit: z.number().min(1),
  usersLimit: z.number().min(1),
});

export const editFileValidator = z.object({
  fileName: z.string(),
  fileId: z.number(),
  state: z.boolean(),
  file: z.instanceof(File),
});
export const createFileValidator = z.object({
  name: z.string(),
  groupId: z.number(),
  contents: z.string(),
});

export const getGroupsValidator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
});
export const getAllFileInGroupValidator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number(),
});

export const filterFileByCreatedAtValidator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number(),
  createdAt: z.boolean().default(true),
});
export const filterFilestatusValidator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number(),
  status: z.string().default("-1"),
});
export const deleteFileValidator = z.number();
export const checkinValidator = z.number();
export const checkoutValidator = z.number();
export const fileDetailsValidator = z.number();




export const exitGroupValidator = z.object({
  groupId: z.number(),
});
