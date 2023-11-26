import { db } from "~/server/db";

import { Prisma } from '@prisma/client'

export class UserService {
    async create(payload: Prisma.UserCreateInput) {
        return await db.user.create({
            data: payload,
        });
    }
}