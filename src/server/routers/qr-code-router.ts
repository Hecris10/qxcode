import { env } from "hono/adapter";
import uniqolor from "uniqolor";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import {
  type DeviceType,
  formatReferrer,
  localeToCountry,
  parseUserAgent,
} from "@/utils/scan-analytics.utils";
import { updateQrCodeInputSchema } from "../db/qr-code-schema.utils";
import { j, privateProcedure, publicProcedure } from "../jstack";

export const qrCodeRouter = j.router({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.enum(["link", "text", "email", "phone", "wifi"]),
        content: z.string(),
        text: z.string().optional().nullable(),
        link: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        phone: z.string().optional().nullable(),
        ssid: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
        isControlled: z.boolean().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const { BETTER_AUTH_URL } = env(c);
      const uuid = uuidv4();

      if (input.isControlled && input.type === "link") {
        input.content = `${BETTER_AUTH_URL}/redirect/${uuid}`;
      }


      const newQrCode = await db.qRCode.create({
        data: {
          ...input,
          userId: auth?.session?.user.id!,
          uuid,
          deletedAt: null,
        },
      });
      if (!newQrCode) {
        throw new Error("QrCode not created");
      }

      return c.superjson(newQrCode);
    }),
  get: privateProcedure
    .input(z.object({ isControlled: z.boolean().optional() }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;

      const userId = auth?.session?.user.id!;
      const qrCodes = await db.qRCode.findMany({
        where: {
          userId: userId,
          isControlled: input.isControlled,
          deletedAt: null,
        },
        include: {
          logo: true,
        },
      });
      if (!qrCodes) {
        return c.superjson([]);
      }

      return c.superjson(qrCodes);
    }),
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodeData = await db.qRCode.findFirst({
        where: {
          id: input.id,
          userId: auth?.session?.user.id!,
          deletedAt: null,
        },
        include: {
          logo: true,
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
      const deletedQrCode = await db.qRCode.update({
        where: {
          id: input.id,
          userId: auth?.session?.user.id!,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      if (!deletedQrCode) {
        throw new Error("QrCode not found");
      }

      return c.superjson(deletedQrCode);
    }),
  update: privateProcedure
    .input(updateQrCodeInputSchema)
    .mutation(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      console.log({ input });
      const updatedQrCode = await db.qRCode.update({
        where: {
          id: input.id,
          userId: auth?.session?.user.id!,
        },
        data: {
          ...input,
        },
      });

      return c.superjson(updatedQrCode);
    }),
  getByLogoId: privateProcedure
    .input(z.object({ logoId: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodes = await db.qRCode.findMany({
        where: {
          logoId: input.logoId,
          userId: auth?.session?.user.id!,
          deletedAt: null,
        },
        include: {
          logo: true,
        },
      });
      if (!qrCodes) {
        return c.superjson([]);
      }

      return c.superjson(qrCodes);
    }),
  getQRCodeLinkByUui: privateProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodeLink = await db.qRCode.findFirst({
        where: {
          uuid: input.uuid,
          userId: auth?.session?.user.id!,
          deletedAt: null,
        },
        select: {
          link: true,
        },
      });

      if (!qrCodeLink) {
        throw new Error("QrCode not found");
      }
      const code = qrCodeLink;
      if (!code || !code.link) throw new Error("QrCode link not found");
      return c.superjson({ link: code.link });
    }),
  getName: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, c, input }) => {
      const { db } = ctx;
      const qrCodeName = await db.qRCode.findFirst({
        where: {
          uuid: input.uuid,
          deletedAt: null,
        },
        select: {
          name: true,
        },
      });
      if (!qrCodeName) {
        throw new Error("QrCode not found");
      }
      const code = qrCodeName;
      if (!code || !code.name) throw new Error("QrCode name not found");
      return c.superjson({ name: code.name });
    }),
  getCountUserControlledQrCodes: privateProcedure.query(
    async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodeCount = await db.qRCode.count({
        where: {
          userId: auth?.session?.user.id!,
          isControlled: true,
          deletedAt: null,
        },
      });

      if (!qrCodeCount) {
        return c.superjson({ count: 0 });
      }
      return c.superjson({ count: qrCodeCount });
    }
  ),
  getTopQrCodes: privateProcedure
    .input(z.object({ limit: z.number().optional().nullable().default(20) }))
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const qrCodes = await db.qRCode.findMany({
        where: {
          userId: auth?.session?.user.id!,
          isControlled: true,
        },
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true,
          _count: {
            select: {
              qrCodeControllers: true,
            },
          },
        },
        orderBy: {
          qrCodeControllers: {
            _count: "desc",
          },
        },
        take: 20,
      });

      const topQrCodes = qrCodes.map((qrCode) => {
        const { color } = uniqolor(qrCode.name);
        return {
          id: qrCode.id,
          name: qrCode.name,
          type: qrCode.type,
          createdAt: qrCode.createdAt,
          scanCount: qrCode._count.qrCodeControllers,
          fill: color,
        };
      });

      return c.superjson(topQrCodes);
    }),
  getQrCodeStats: privateProcedure.query(async ({ ctx, c }) => {
    const { db, auth } = ctx;
    const userId = auth?.session?.user.id!;
    const now = new Date();
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    // Compute the week bounds on copies so we don't mutate `now` (the original
    // code called now.setDate(...) twice, shifting `now` into the future and
    // corrupting every `createdAt < now` comparison below).
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);

    // Get all stats in a single query using Prisma's aggregation
    const [
      totalQrCodes,
      totalQrCodesLastMonth,
      totalScans,
      totalScansLastMonth,
      activeQrCodes,
      activeQrCodesLastMonth,
    ] = await Promise.all([
      // Total QR codes
      db.qRCode.count({
        where: { userId },
      }),
      // Total QR codes last month
      db.qRCode.count({
        where: {
          userId,
          createdAt: {
            gte: lastMonth,
            lt: now,
          },
        },
      }),
      // Total scans
      db.qrCodeController.count({
        where: {
          qrCode: {
            userId,
          },
        },
      }),
      // Total scans last month
      db.qrCodeController.count({
        where: {
          qrCode: {
            userId,
          },
          createdAt: {
            gte: lastMonth,
            lt: now,
          },
        },
      }),
      // Active QR codes
      db.qRCode.count({
        where: {
          userId,
          isControlled: true,
        },
      }),
      // Active QR codes last month
      db.qRCode.count({
        where: {
          userId,
          isControlled: true,
          createdAt: {
            gte: lastMonth,
            lt: now,
          },
          deletedAt: null,
        },
      }),
    ]);

    // Calculate differences and percentages
    const totalQrCodesDifference = totalQrCodes - totalQrCodesLastMonth;
    const totalScansDifferencePercent =
      totalScansLastMonth > 0
        ? ((totalScans - totalScansLastMonth) / totalScansLastMonth) * 100
        : 0;
    const activeQrCodesDifferencePercent =
      activeQrCodesLastMonth > 0
        ? ((activeQrCodes - activeQrCodesLastMonth) / activeQrCodesLastMonth) *
          100
        : 0;

    // Get expiring QR codes stats
    const [expiringThisWeek, expiringLastMonth] = await Promise.all([
      db.qRCode.count({
        where: {
          userId,
          expirationDate: {
            gte: startOfThisWeek,
            lte: endOfThisWeek,
          },
        },
      }),
      db.qRCode.count({
        where: {
          userId,
          expirationDate: {
            gte: startOfThisWeek,
            lte: endOfThisWeek,
          },
          createdAt: {
            gte: lastMonth,
            lt: now,
          },
        },
      }),
    ]);

    const expiringDifferencePercent =
      expiringLastMonth > 0
        ? ((expiringThisWeek - expiringLastMonth) / expiringLastMonth) * 100
        : 0;

    return c.superjson({
      totalQrCodes,
      totalQrCodesDifference,
      totalScans,
      totalScansDifferencePercent,
      activeQrCodes,
      activeQrCodesDifferencePercent,
      expiringThisWeek,
      expiringDifferencePercent,
    });
  }),

  getQrCodesScans: privateProcedure
    .input(
      z.object({
        filter: z.enum(["30_DAYS", "7_DAYS", "90_DAYS", "LAST_YEAR"]),
      })
    )
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const userId = auth?.session?.user.id!;
      const now = new Date();
      const startDate = new Date();

      // Set the start date based on the filter
      switch (input.filter) {
        case "30_DAYS":
          startDate.setDate(now.getDate() - 30);
          break;
        case "7_DAYS":
          startDate.setDate(now.getDate() - 7);
          break;
        case "90_DAYS":
          startDate.setMonth(now.getMonth() - 3);
          break;
        case "LAST_YEAR":
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Use Prisma's groupBy to get the counts directly from the database
      const scans = await db.qrCodeController.groupBy({
        by: ["createdAt"],
        where: {
          qrCode: { userId },
          createdAt: {
            gte: startDate,
            lte: now,
          },
        },
        _count: {
          _all: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      // Format the dates and group the results
      const dateFormatter =
        input.filter === "LAST_YEAR"
          ? (date: Date) =>
              new Intl.DateTimeFormat("en-US", { month: "short" }).format(date)
          : (date: Date) =>
              new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(date);

      // Group the results by formatted date
      const groupedScans = scans.reduce((acc, scan) => {
        const formattedDate = dateFormatter(scan.createdAt);
        if (!acc[formattedDate]) {
          acc[formattedDate] = 0;
        }
        acc[formattedDate] += scan._count._all;
        return acc;
      }, {} as Record<string, number>);

      // Convert to array format
      const formattedScans = Object.entries(groupedScans).map(
        ([date, scans]) => ({
          date,
          scans,
        })
      );

      return c.superjson(formattedScans);
    }),

  // All of the user's QR codes plus their scan counts, for the dashboard
  // "Your QR Codes" grid/list.
  getQrCodesWithScans: privateProcedure.query(async ({ ctx, c }) => {
    const { db, auth } = ctx;
    const userId = auth?.session?.user.id!;

    const qrCodes = await db.qRCode.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        uuid: true,
        name: true,
        type: true,
        content: true,
        link: true,
        isControlled: true,
        createdAt: true,
        _count: {
          select: {
            qrCodeControllers: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = qrCodes.map((qrCode) => ({
      id: qrCode.id,
      uuid: qrCode.uuid,
      name: qrCode.name,
      type: qrCode.type,
      content: qrCode.content,
      link: qrCode.link,
      isControlled: qrCode.isControlled,
      createdAt: qrCode.createdAt,
      scanCount: qrCode._count.qrCodeControllers,
    }));

    return c.superjson(result);
  }),

  // Latest scans across all of the user's QR codes, with device / location /
  // referrer derived from the captured headers.
  getRecentScans: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional().default(10),
      })
    )
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const userId = auth?.session?.user.id!;

      const scans = await db.qrCodeController.findMany({
        where: {
          qrCode: { userId },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
        select: {
          id: true,
          createdAt: true,
          ip: true,
          ip2: true,
          userAgent: true,
          locale: true,
          referrer: true,
          qrCode: {
            select: { name: true },
          },
        },
      });

      const recentScans = scans.map((scan) => {
        const { deviceType, os, browser } = parseUserAgent(scan.userAgent);
        return {
          id: scan.id,
          qrCodeName: scan.qrCode?.name ?? "Unknown",
          timestamp: scan.createdAt,
          ip: scan.ip || scan.ip2 || "-",
          location: localeToCountry(scan.locale),
          device: os !== "Unknown" ? os : deviceType,
          browser,
          referrer: formatReferrer(scan.referrer),
        };
      });

      return c.superjson(recentScans);
    }),

  // Scans grouped by device type (Mobile / Desktop / Tablet) for the
  // "Device Usage" chart.
  getDeviceUsage: privateProcedure.query(async ({ ctx, c }) => {
    const { db, auth } = ctx;
    const userId = auth?.session?.user.id!;

    const scans = await db.qrCodeController.findMany({
      where: {
        qrCode: { userId },
      },
      select: { userAgent: true },
    });

    const counts: Record<DeviceType, number> = {
      Mobile: 0,
      Desktop: 0,
      Tablet: 0,
    };
    for (const scan of scans) {
      counts[parseUserAgent(scan.userAgent).deviceType]++;
    }

    const total = scans.length;
    const order: DeviceType[] = ["Mobile", "Desktop", "Tablet"];
    const usage = order.map((name) => ({
      name,
      count: counts[name],
      value: total > 0 ? Math.round((counts[name] / total) * 100) : 0,
    }));

    return c.superjson({ total, usage });
  }),

  // Scans grouped by country (derived from the accept-language header) for the
  // "Scan Locations" panel.
  getScanLocations: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).optional().default(8),
      })
    )
    .query(async ({ ctx, c, input }) => {
      const { db, auth } = ctx;
      const userId = auth?.session?.user.id!;

      const scans = await db.qrCodeController.findMany({
        where: {
          qrCode: { userId },
        },
        select: { locale: true },
      });

      const counts = new Map<string, number>();
      for (const scan of scans) {
        const country = localeToCountry(scan.locale);
        counts.set(country, (counts.get(country) ?? 0) + 1);
      }

      const total = scans.length;
      const locations = Array.from(counts.entries())
        .map(([location, count]) => ({
          location,
          count,
          percent: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, input.limit);

      return c.superjson({ total, locations });
    }),
});
