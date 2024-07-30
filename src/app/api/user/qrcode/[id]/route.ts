import { NextRequest } from "next/server";
import { verifyJWTToken } from "~/lib/jwt";
import { prisma } from "~/lib/prisma";

interface RequestParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RequestParams) {
  const accessToken = request.headers.get("Authorization");

  if (!accessToken || !verifyJWTToken(accessToken)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const userCQrCode = await prisma.qRCode.findMany({
    where: {
      userId: params.id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  return new Response(JSON.stringify(userCQrCode), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
