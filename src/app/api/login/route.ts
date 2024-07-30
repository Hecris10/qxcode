import * as bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { signJWTToken } from "~/lib/jwt";
import { prisma } from "~/lib/prisma";

interface RequestBody {
  email: string;
  password: string;
}

interface UserClient {
  id: string;
  email: string;
  name: string;
  token: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user && (await bcrypt.compare(body.password, user.password + ""))) {
      const userClient: UserClient = {
        id: user.id,
        email: user.email,
        name: user.name + "",
        token: "",
      };

      const decodedUser = signJWTToken(userClient);

      if (!decodedUser) {
        return new Response(JSON.stringify(null), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      const result = { ...userClient, token: decodedUser };

      return new Response(JSON.stringify(result), {
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
    console.log("ERROR", e);
    return new Response(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
