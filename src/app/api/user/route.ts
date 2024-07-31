import * as bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { ApiHandlerError } from "~/lib/globals.types";
import { prisma } from "~/lib/prisma";
export interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  const errors: string[] = [];

  if (!body.name) {
    errors.push("name");
  }
  if (!body.email) {
    errors.push("email");
  }
  if (!body.password) {
    errors.push("password");
  }

  if (errors.length > 0) {
    const errorBody: ApiHandlerError = {
      status: 400,
      message: `This field is required: ${errors.join(", ")}`,
    };

    return new Response(JSON.stringify(errorBody), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    const { password, ...userWithoutPassword } = user;

    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: any) {
    return new Response(JSON.stringify(e), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
