import { Group } from "@prisma/client";
import { z } from "zod";


export const createFileValidator = z.object({ name: z.string().min(1) })


export const searchValidator = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  page: z.number().default(1),
  pageSize: z.number().default(10)
})

export const sendRequsetValidator = z.object({
  receiverId: z.string().min(1),
  groupId: z.number(),
})

export const creatNewGroupValidator = z.object({
  groupName: z.string().min(1),
})
export const responseValidator = z.object({
  state: z.boolean(),
  groupId: z.number(),
})
export const editFileValidator = z.object({
  fileName: z.string(),
  fileId: z.number(),
  state: z.boolean(),
  file: z.instanceof(File)
})
export const addNewFileValidator = z.object({
  fileName: z.string(),
  groupId: z.number(),
  file: z.instanceof(File)
})

export const deleteFileValidator = z.object({
  fileId: z.number(),
})
export const getAllGroupsVailedator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10)
})
export const getAllFileInGroupVailedator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number()
})

export const filterFileByCreatedAtVailedator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number(),
  createdAt: z.boolean().default(true),

})
export const filterFilestatusVailedator = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(10),
  groupId: z.number(),
  status: z.string().default("-1"),

})
export const deleteMyFileVailedator = z.object({
  fileId: z.number(),
})

export const exitGroupVailedator = z.object({
  groupId: z.number(),
})
