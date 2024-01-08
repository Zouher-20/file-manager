/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";
import { Group } from "@prisma/client";

export class FilesService {
  async getUserGroups(
    idUser: string,
    page: number,
    pageSize: number,
  ): Promise<Group[] | null> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    return await db.group.findMany({
      where: {
        createdById: idUser,
      },
    });
  }

  async getSharedGroups(
    idUser: string,
    page: number,
    pageSize: number,
  ): Promise<Group[] | null> {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    return await db.group.findMany({
      where: {
        AND: [
          {
            createdById: {
              not: {
                equals: idUser,
              },
            },
          },
          {
            users: {
              some: {
                userId: {
                  equals: idUser,
                },
              },
            },
          },
        ],
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async addNewGroup(groupData: {
    name: string;
    checkinTimeOut: number;
    filesLimit: number;
    usersLimit: number;
  }, userId: string) {
    return await db.group.create({
      data: {
        ...groupData,
        createdById: userId,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          ],
        },
      },
    });
  }
  async deleteGroup(id: number) {
    return await db.group.delete({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
  }
  async leaveGroup(id: number, userId: string) {
    return await db.user.update({
      where: {
        id: userId,
      },
      data: {
        groups: {
          deleteMany: {
            groupId: id,
          },
        },
      },
    });
  }
  async updateGroup(id: number, groupData: {
    name: string;
    checkinTimeOut: number;
    filesLimit: number;
    usersLimit: number;
  }) {
    return await db.group.update({
      where: {
        id,
      },
      data: {
        ...groupData
      },
    });
  }

  async updateFile(fileId: number, content: string) {
    return await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        updatedAt: new Date(),
      },
    });
  }

  async getAllFileInGroup(
    userId: string,
    page: number,
    pageSize: number,
    groupId: number,
  ) {
    return db.group.findUnique({
      where: { id: groupId },
      include: { files: true },
    });
  }
  async createFile(
    userId: string,
    groupId: number,
    name: string,
    path: string,
  ) {
    return db.file.create({
      data: {
        name,
        groupId,
        path,
        createdById: userId,
      },
    });
  }
  async deleteFile(userId: string, fileId: number) {
    return await db.file.delete({
      where: {
        id: fileId,
      },
    });
  }
  async checkinFile(userId: string, fileId: number) {
    return await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        takenById: userId,
        checkedinAt: new Date(),
      },
    });
  }
  async checkoutFile(userId: string, fileId: number) {
    return await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        takenById: null,
        checkedinAt: null,
      },
    });
  }
  async getFileDetails(fileId: number) {
    return await db.file.findUnique({
      where: {
        id: fileId,
      },
      include: {
        createdBy: true,
        takenBy: true,
      },
    });
  }

  async bulkCheckin(filesIds: number[], userId: string) {
    return await db.file.updateMany({
      where: {
        id: {
          in: filesIds,
        },
      },
      data: {
        takenById: userId,
        checkedinAt: new Date(),
      },
    });
  }

  async isFileAvailable(fileId: number) {
    const data = await db.file.findUnique({
      where: {
        id: fileId,
      },
    });
    return data?.takenById === null;
  }

  async getGroupConfig(groupId: number) {
    return await db.group.findUnique({
      select: {
        id: true,
        usersLimit: true,
        checkinTimeOut: true,
        filesLimit: true,
      },
      where: {
        id: groupId
      }
    })
  }
  async getGroupByFile(fileId: number) {
    return await db.group.findFirst({
      where: {
        files: {
          some: {
            id: fileId
          }
        }
      }
    })
  }
  async getGroupById(groupId: number) {
    return await db.group.findUnique({
      where: {
        id: groupId
      }
    })
  }
}
