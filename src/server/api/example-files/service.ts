import { db } from "~/server/db";

import { Prisma } from '@prisma/client'

export class FilesService {
    async create(payload: Prisma.FileCreateInput) {

        return await db.file.create({
            data: payload,
        });
    }


    async getLatest() {
        return await db.file.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: 'HARDCODED' }, }
        })
    }
}