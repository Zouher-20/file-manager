import { protectedProcedure, publicProcedure } from "../trpc";
import { searchValidator ,sendRequsetValidator,creatNewGroupValidator,getAllGroupsVailedator,responseValidator,editFileValidator} from "./validators";
import { FilesService } from "./service";


const filesService = new FilesService();

export const searchUser = protectedProcedure
.input(searchValidator)
.query(async ({input}) => {
  try {
    const { page, pageSize ,name, email,} = input;
    const data = await filesService.searchUser(name, email, page, pageSize);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});

export const sendRequset = protectedProcedure
.input(sendRequsetValidator)
.mutation(async ({input ,ctx}) => {
  try {
    const { groupId, receiverId } = input;
    const data = await filesService.sendRequset(ctx.session.user.id, receiverId, groupId,);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});
export const getAllGroup = protectedProcedure
.input(getAllGroupsVailedator)
.query(async ({input ,ctx}) => {
  try {
    const {page , pageSize } = input;
    const data = await filesService.getAllGroups(ctx.session.user.id, page, pageSize,);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});
export const resposeToJoin = protectedProcedure
.input(responseValidator)
.query(async ({input ,ctx}) => {
  try {
    const {groupId , state } = input;
    const data = await filesService.respose(ctx.session.user.id, groupId, state);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});
export const createFile = protectedProcedure
.input(responseValidator)
.query(async ({input ,ctx}) => {
  try {
    const {groupId , state } = input;
    const data = await filesService.respose(ctx.session.user.id, groupId, state);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});
export const createGroup = protectedProcedure
.input(creatNewGroupValidator)
.query(async ({input ,ctx}) => {
  try {
    const {groupName } = input;
    const data = await filesService.addNewGroup(ctx.session.user.id, groupName,);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});


export const editFile = protectedProcedure
.input(editFileValidator)
.mutation(async ({input ,ctx}) => {
  try {
    const {fileId } = input;
    const data = await filesService.editFile(ctx.session.user.id, fileId);
    return data;
  } catch (error) {
    console.error('Procedure Error:', error);
  }
});






export const getHello = publicProcedure.query(() => {
    return 'Zouhair'
})
