import { put } from "@vercel/blob";
import { z } from "zod";
import { j, privateProcedure } from "../jstack";

const uploadSchema = z.object({
  file: z.string(),
  fileName: z.string(),
  fileType: z.string(),
});

export const logoRouter = j.router({
  get: privateProcedure.query(async ({ ctx, c }) => {
    const { db, auth } = ctx;

    const logos = await db.logo.findMany({
      where: {
        userId: auth?.session?.user.id!,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return c.superjson(logos);
  }),
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const deletedLogo = await db.logo.delete({
        where: {
          id: input.id,
          userId: auth?.session?.user.id!,
        },
      });
      if (!deletedLogo) {
        throw new Error("Logo not found");
      }

      return c.superjson(deletedLogo);
    }),
  upload: privateProcedure
    .input(uploadSchema)
    .mutation(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;

      try {
        // Convert base64 to buffer
        const base64Data = input.file.split(",")[1];
        if (!base64Data) {
          throw new Error("Invalid base64 data");
        }

        const buffer = Buffer.from(base64Data, "base64");

        const fileName = `logo-${auth.session.user.id}-${input.fileName}`;
        const uploadedBlob = await put(`/logos/${fileName}`, buffer, {
          access: "public",
          contentType: input.fileType,
        });

        const logo = await db.logo.create({
          data: {
            userId: auth.session.user.id,
            name: input.fileName,
            url: uploadedBlob.url,
          },
        });

        return c.superjson(logo);
      } catch (error) {
        console.error("Error uploading logo:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to upload logo"
        );
      }
    }),
});
