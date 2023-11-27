import { db } from "~/server/db";


export class FilesService {
  
  async getAllGroups(idUser: string, page: number , pageSize: number ) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
  
    const userGroups = await db.usersOnGroups.findMany({
      where: {
        userId: idUser,
      },
      include: {
        group: true,
        user: true,
      },
      skip,
      take,
    });
    const groups = await Promise.all(userGroups.map(async (userGroup) => {
      const filesCount = await db.file.count({
          where: {
              groupId: userGroup.group.id,
          },
      });

      return {
          ...userGroup,
          group: {
              ...userGroup.group,
              filesCount,
          },
      };
  }));


    return {
      groups,
    };
  }

  async getAllFileInGroup(userId: string, page: number , pageSize: number , groupId:number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
     
    const userInGroup = await db.usersOnGroups.findFirst({
      where: {
        userId: userId,
        groupId:groupId,
        status: true
      }
    })

    if (!userInGroup) {
      throw Error('user is not in group')
    }
    const files = await db.file.findMany({
      where: {
        groupId: groupId,
      },
      skip,
      take,
    });
    return {
      files,
    };
  }
  
  
    async addNewGroup(groupName: string, userId: string) {
      const newGroup = await db.group.create({
        data: {
          path: groupName,
        },
      });
    
      // Link the user to the group
      await db.usersOnGroups.create({
        data: {
          user: {
            connect: { id: userId },
          },
          group: {
            connect: { id: newGroup.id },
          },
          status: true,
        },
      });
    }
  
    async addNewFile (
      groupId: number,
      userId: string,
      filePath: string,
    ) {

    
      const userInGroup = await db.usersOnGroups.findFirst({
        where: {
          userId: userId,
          groupId:groupId,
          status: true
        }
      })
      if (userInGroup) {
        const newFile = await db.file.create({
          data: {
            path: filePath,
            createdBy: {
              connect: { id: userId }
            },
            group: {
              connect: { id: userInGroup.groupId }
            },
            status: true
          }
        })
        return newFile
      } else {
        console.log('User is not in a group with status: true')
      }
    }
  
    async editFile (userId: string, fileId: number) {
      await db.$transaction(async prisma => {
        const file = await prisma.file.findUnique({
          where: { id: fileId },
          include: { createdBy: true, group: { include: { users: true } } }
        })
        if (!file) {
          throw new Error('File not found')
        }
        const userInGroup = file.group.users.find(
          user => user.userId === userId && user.status
        )
  
        if (!userInGroup) {
          throw new Error('User is not in the group with status: true')
        }
  
        if (file.status) {
          throw new Error('File is currently being edited by another user')
        }
  
        await prisma.file.update({
          where: { id: fileId },
          data: { status: true }
        })
      })
      console.log('File edited successfully')
    }
    //TODO this for search user
    async searchUser (
      name: string,
      email: string,
      page: number,
      pageSize: number
    ) {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              email: {
                contains: email
              }
            },
            {
              name: {
                contains: name
              }
            }
          ]
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      return users
    }
    //TODO this for send requset to join group
    async sendRequset (
      userId: string,
      receiverId: string,
      groupId: number
    ) {
      const userInGroup = await db.usersOnGroups.findFirst({
        where: {
          userId: userId,
          status: true
        }
      })
  
      if (!userInGroup) {
        throw new Error('Sender user not found')
      }
      const receiverUserInGroup = await db.usersOnGroups.findFirst({
        where: {
          userId: userId,
     }
      })
      if(receiverUserInGroup){
        throw new Error('Receiver already in group')
      }
      const receiverUser = await db.user.findUnique({
        where: {
          id: receiverId,
        }
      })
    
  
      if (!receiverUser) {
        throw new Error('Receiver user not found')
      }
  
      await db.usersOnGroups.create({
        data: {
          userId: userId,
          groupId: groupId,
          status: false
        }
      })
    }
    
    //TODO this for receive requset  to join group
    async respose(userId: string, groupId: number, state: boolean ) {
      const pendingRequest = await db.usersOnGroups.findFirst({
        where: {
          userId,
          groupId,
          status: false,
        },
      });
    
      if (!pendingRequest) {
        throw new Error('No pending join request for the user in the group');
      }
      if (state ===false) {
        await db.usersOnGroups.delete({
          where: {
            id: pendingRequest.id,
          },
        });
      }
      else {
        await db.usersOnGroups.update({
          where: {
            id: pendingRequest.id,
    
          },
          data: {
            status: state,
          },
        });
      }
    }
    async exitGroup(userId: string, groupId: number) {
      const exit = await db.usersOnGroups.findFirst({
        where: {
          userId,
          groupId,
        },
      });
    
      if (!exit) {
        throw new Error('No pending join request for the user in the group');
      }
    
        await db.usersOnGroups.delete({
          where: {
            id: exit.id,
          },
        });
    
    }
  }