import { protectedProcedure, publicProcedure } from "../trpc";
import { createUserValidator } from "./validators";
import { UserService } from "./service";

const userService = new UserService();

export const createUserProcedure = publicProcedure
  .input(createUserValidator)
  .mutation(async ({ ctx, input }) => {
    const toAdd = {
      name: input.name,
      email: input.email,
      password: input.password,
    };

    return userService.create(toAdd);
  });
