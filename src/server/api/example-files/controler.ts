import { protectedProcedure, publicProcedure } from "../trpc";
import { createFileValidator } from "./validators";
import { FilesService } from "./service";

const filesService = new FilesService();

export const createProcedure = protectedProcedure
    .input(createFileValidator)
    .mutation(async ({ ctx, input }) => {
        return filesService.create({
            ...input,
            createdBy: { connect: { id: ctx.session.user.id } },
            path: 'HARDCODED_PATH_TO_FILE',
            group: { connect: { id: 1 } },
        });
    });

export const getLatestProcedure = publicProcedure.query(({ ctx }) => {
    return filesService.getLatest();
});
