import * as bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import { prisma } from "~/app/lib/prisma";
interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

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
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
