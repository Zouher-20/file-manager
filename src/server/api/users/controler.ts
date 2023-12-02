import { publicProcedure } from "../trpc";
import { createUserValidator } from "./validators";
import { UserService } from "./service";
import bcrypt from 'bcryptjs'
const userService = new UserService();

export const createUserProcedure = publicProcedure
  .input(createUserValidator)
  .mutation(async ({ input }) => {
    const hashedPassword = await bcrypt.hash(input.password , 8)
    const toAdd = {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    };

    return userService.create(toAdd);
  });
