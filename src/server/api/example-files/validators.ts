import { z } from "zod";

export const createFileValidator = z.object({ name: z.string().min(1) })
