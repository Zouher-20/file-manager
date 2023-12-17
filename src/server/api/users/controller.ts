import { protectedProcedure, publicProcedure } from "../trpc";
import { addUserToGroupValidator, createUserValidator, usersByGroupValidator } from "./validators";
import { UserService } from "./service";
import bcrypt from 'bcryptjs'
const userService = new UserService();

export const createUserProcedure = publicProcedure
  .input(createUserValidator)
  .mutation(async ({ input }) => {
    const hashedPassword = await bcrypt.hash(input.password, 8)
    const toAdd = {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    };

    return userService.create(toAdd);
  });

export const getUsersOutsideGroup = protectedProcedure
  .input(usersByGroupValidator)
  .query(async ({ input, ctx }) => {
    try {
      const groupId = input
      const data = await userService.getOutGroup(ctx.session.user.id, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })

export const getUsersInGroup = protectedProcedure
  .input(usersByGroupValidator)
  .query(async ({ input, ctx }) => {
    try {
      const groupId = input
      const data = await userService.getInGroup(ctx.session.user.id, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })


export const addUserToGroup = protectedProcedure
  .input(addUserToGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, userId } = input
      const data = await userService.addToGroup(userId, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })
export const removeUserFromGroup = protectedProcedure
  .input(addUserToGroupValidator)
  .mutation(async ({ input, ctx }) => {
    try {
      const { groupId, userId } = input
      const data = await userService.removeFromGroup(userId, groupId);
      return data;
    } catch (error) {
      console.error('Procedure Error:', error);
    }
  })







