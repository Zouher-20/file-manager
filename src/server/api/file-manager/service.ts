/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { db } from "~/server/db";
import fs from "fs";
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
  async addNewGroup(groupName: string, userId: string) {
    return await db.group.create({
      data: {
        name: groupName,
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
  async updateGroup(id: number, groupName: string) {
    return await db.group.update({
      where: {
        id,
      },
      data: {
        name: groupName,
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
        takenById: userId
      }
    });
  }
  async checkoutFile(userId: string, fileId: number) {
    return await db.file.update({
      where: {
        id: fileId,
      },
      data: {
        takenById: null
      }
    });
  }


}
