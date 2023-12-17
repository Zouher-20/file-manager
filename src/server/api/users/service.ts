import { db } from "~/server/db";

import { Prisma, User } from '@prisma/client'

export class UserService {
    async create(payload: Prisma.UserCreateInput) {
        return await db.user.create({
            data: payload,
        });
    }


    async getOutGroup(idUser: string, groupId: number): Promise<User[] | null> {
        return await db.user.findMany({
            where: {
                NOT: {
                    groups: {
                        some: {
                            groupId
                        }
                    }
                }
            }
        })
    }

    async getInGroup(idUser: string, groupId: number): Promise<User[] | null> {
        return await db.user.findMany({
            where: {
                AND: [
                    {
                        groups: {
                            some: {
                                groupId
                            }
                        }
                    },
                    {
                        id: {
                            not: idUser
                        }
                    }
                ]
            }
        })
    }

    async addToGroup(userId: string, groupId: number): Promise<User | null> {
        return await db.user.update({
            where: {
                id: userId
            },
            data: {
                groups: {
                    create: {
                        groupId,
                    }
                }
            }
        })
    }

    async removeFromGroup(userId: string, groupId: number): Promise<User | null> {
        return await db.user.update({
            where: {
                id: userId
            },
            data: {
                groups: {
                    deleteMany: {
                        groupId
                    }
                }
            }
        })
    }



}