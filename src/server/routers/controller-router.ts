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

      const relatedQrCode = await db.qRCode.findFirst({
        where: {
          uuid: input.uuid,
        },
        select: {
          id: true,
        },
      });
      if (!relatedQrCode) {
        return c.superjson(null);
      }

      const newController = await db.qrCodeController.create({
        data: {
          ...input,
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
      const { db } = ctx;
      const deletedQrCode = await db.qrCodeController.delete({
        where: {
          id: input.id,
          qrCode: {
            userId: (input.id, input.id)!,
          },
        },
      });
      if (!deletedQrCode) {
        throw new Error("QrCode not found");
      }

      return c.superjson(deletedQrCode);
    }),
});
