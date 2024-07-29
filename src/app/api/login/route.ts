import * as bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { prisma } from "~/app/lib/prisma";

interface RequestBody {
  email: string;
  password: string;
}

interface UserClient {
  id: string;
  email: string;
  name: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.password, user.password))) {
      const userClient: UserClient = {
        id: user.id,
        email: user.email,
        name: user.name + "",
      };

      return new Response(JSON.stringify(userClient), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(null), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (e: any) {
    return new Response(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
