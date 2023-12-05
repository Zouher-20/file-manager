/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from '~/server/db'
import fs from 'fs'

export class FilesService {

  //TODO this for get all MyGroups  with users With count of files
  async getAllGroups(idUser: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const userGroups = await db.usersOnGroups.findMany({
      where: {
        userId: idUser
      },
    })

    const groupsIds = userGroups.map(el => el.id)
    const result = await db.group.findMany({
      where: {
        id: {
          in: groupsIds
        }
      }
    }) || []
    return result
  }
  // TODO this for get all File Ingroup 
  async getAllFileInGroup(
    userId: string,
    page: number,
    pageSize: number,
    groupId: number
  ) {
    const skip = (page - 1) * pageSize
    const take = pageSize

    const userInGroup = await db.usersOnGroups.findFirst({
      where: {
        userId: userId,
        groupId: groupId,
        status: true
      }
    })

    if (!userInGroup) {
      throw Error('user is not in group')
    }
    const files = await db.file.findMany({
      where: {
        groupId: groupId
      },
      skip,
      take
    })
    return {
      files
    }
  }
  async addNewGroup(groupName: string, userId: string) {
    const newGroup = await db.group.create({
      data: {
        name: groupName
      }
    })
    // Link the user to the group
    await db.usersOnGroups.create({
      data: {
        user: {
          connect: { id: userId }
        },
        group: {
          connect: { id: newGroup.id }
        },
        status: true
      }
    })
  }
  //TODO this for AddNew file and Create Upload in public Folder
  async addNewFile(
    groupId: number,
    userId: string,
    fileName: string,
    file: File
  ) {
    const userInGroup = await db.usersOnGroups.findFirst({
      where: {
        userId: userId,
        groupId: groupId,
        status: true
      }
    })
    if (userInGroup) {
      this.saveFile(file, fileName)
      const newFile = await db.file.create({
        data: {
          path: `./public/${fileName}.Txt`,
          name: fileName,
          createdBy: {
            connect: { id: userId }
          },
          group: {
            connect: { id: userInGroup.groupId }
          },
          status: userId
        }
      })
      return newFile
    } else {
      console.log('User is not in a group with status: true')
    }
  }

  //TODO this for Upload file in public Folder
  saveFile(file: File, fileName: string) {
    const data = fs.readFileSync(file.webkitRelativePath);
    fs.writeFileSync(`./public/${fileName}.Txt`, data);
    fs.unlinkSync(file.webkitRelativePath);
    return;
  }


  //TODO this for edite file and reupload
  async editFile(userId: string, fileId: number, state: boolean, file: File, fileName: string) {
    if (state) {
      await db.$transaction(async (prisma) => {
        const existingFile = await prisma.file.findUnique({
          where: { id: fileId },
          include: { createdBy: true, group: { include: { users: true } } },
        });
        if (!existingFile) {
          throw new Error('File not found');
        }
        const userInGroup = existingFile.group.users.find(
          (user) => user.userId === userId && user.status
        );
        if (!userInGroup) {
          throw new Error('User is not in the group with status: true');
        }

        if (existingFile.status !== userId) {
          throw new Error('File is currently being edited by another user');
        }

        // Lock the file for editing by setting the status to the user ID
        await prisma.file.update({
          where: { id: fileId },
          data: { status: userId },
        });

        this.saveFile(file, fileName);
      });
    } else {
      await db.file.update({
        where: { id: fileId },
        data: { status: "-1" },
      });
    }

    console.log('File edited successfully');
  }
  //TODO this for search user
  async searchUser(
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
  async sendRequset(userId: string, receiverId: string, groupId: number) {
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
        userId: userId
      }
    })
    if (receiverUserInGroup) {
      throw new Error('Receiver already in group')
    }
    const receiverUser = await db.user.findUnique({
      where: {
        id: receiverId
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
  async respose(userId: string, groupId: number, state: boolean) {
    const pendingRequest = await db.usersOnGroups.findFirst({
      where: {
        userId,
        groupId,
        status: false
      }
    })

    if (!pendingRequest) {
      throw new Error('No pending join request for the user in the group')
    }
    if (state === false) {
      await db.usersOnGroups.delete({
        where: {
          id: pendingRequest.id
        }
      })
    } else {
      await db.usersOnGroups.update({
        where: {
          id: pendingRequest.id
        },
        data: {
          status: state
        }
      })
    }
  }
  //TODO this for exit in my group
  async exitGroup(userId: string, groupId: number) {
    const exit = await db.usersOnGroups.findFirst({
      where: {
        userId,
        groupId
      }
    })

    if (!exit) {
      throw new Error('No pending join request for the user in the group')
    }

    await db.usersOnGroups.delete({
      where: {
        id: exit.id
      }
    })
  }
  //TODO this for  get file in all My groups
  async getAllFileInAllgroup(userId: string, page: number, pageSize: number) {
    const files = await db.usersOnGroups.findMany({
      where: {
        userId: userId,
        status: true
      },
      include: {
        group: {
          include: {
            files: true
          }
        }
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return files
  }
  //TODO this for delete my File 
  async deleteMyFile(userId: string, fileId: number) {
    await db.file.delete({
      where: {
        createdById: userId,
        id: fileId
      }
    })
  }
  //TODO this for all files for free or for not free
  async filterFileByStatus(
    groupId: number,
    status: string,
    page: number,
    pageSize: number
  ) {
    const files = await db.file.findMany({
      where: {
        groupId: groupId,
        status: status
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return files
  }
  //TODO this for get all files for created by asc or desc
  async filterFileByCreatedAt(
    groupId: number,
    createdAt: boolean,
    page: number,
    pageSize: number
  ) {
    const files = await db.file.findMany({
      where: {
        groupId: groupId
      },
      orderBy: {
        createdAt: createdAt ? 'asc' : 'desc'
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return files
  }
}
