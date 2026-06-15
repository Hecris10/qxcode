import { z } from "zod";
import { j, privateProcedure, publicProcedure } from "../jstack";

export const controlledRouter = j.router({
  create: publicProcedure
    .input(
      z.object({
        uuid: z.string(),
        ip: z.string(),
        userAgent: z.string(),
        ip2: z.string(),
        locale: z.string(),
        referrer: z.string(),
        screenResolution: z.string(),
        timestamp: z.date(),
        pageUrl: z.string(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { db } = ctx;

      const { uuid, ...rest } = input;

      const relatedQrCode = await db.qRCode.findFirst({
        where: {
          uuid: input.uuid,
        },
        select: {
          id: true,
          link: true,
        },
      });
      if (!relatedQrCode || !relatedQrCode.link) {
        return c.superjson(null);
      }

      console.log({ input });

      const newController = await db.qrCodeController.create({
        data: {
          ...rest,
          pageUrl: relatedQrCode.link,
          qrCodeId: relatedQrCode.id,
        },
      });

      return c.superjson({ redirectUrl: newController?.pageUrl });
    }),
  get: privateProcedure.query(async ({ ctx, c }) => {
    const { db, auth } = ctx;
    const qrCodes = await db.qrCodeController.findMany({
      include: {
        qrCode: true,
      },
      where: {
        qrCode: {
          userId: auth?.session?.user.id!,
        },
      },
    });

    return c.superjson(qrCodes);
  }),
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodeData = await db.qrCodeController.findFirst({
        where: {
          id: input.id,
          qrCode: {
            userId: auth?.session?.user.id!,
          },
        },
        include: {
          qrCode: true,
        },
      });

      if (!qrCodeData) {
        throw new Error("QrCode not found");
      }

      return c.superjson(qrCodeData);
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;

      // deleteMany lets us scope by the owning qrCode's userId so a user can
      // only ever delete their own scan records. count === 0 means the record
      // either doesn't exist or isn't owned by this user.
      const deleted = await db.qrCodeController.deleteMany({
        where: {
          id: input.id,
          qrCode: {
            userId: auth.session.user.id,
          },
        },
      });
      if (deleted.count === 0) {
        throw new Error("QrCode not found");
      }

      return c.superjson({ id: input.id, deleted: deleted.count });
    }),
});
