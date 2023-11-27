import { z } from "zod";

export const createFileValidator = z.object({ name: z.string().min(1) })


export const searchValidator = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    page :z.number().default(1),
    pageSize:z.number().default(10)
  })

  export const sendRequsetValidator = z.object({
    receiverId: z.string().min(1),
    groupId :z.number(),
  })
  
  export const creatNewGroupValidator = z.object({
    groupName: z.string().min(1),
  })
  export const responseValidator  = z.object({
    state: z.boolean(),
    groupId :z.number(),
  })
  export const editFileValidator  = z.object({
    newContent: z.string(),
    fileId :z.number(),
  })

  export const getAllGroupsVailedator = z.object({
    page :z.number().default(1),
    pageSize:z.number().default(10)
  })
  