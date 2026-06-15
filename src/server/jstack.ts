import { auth } from "@/lib/auth";
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";
import { headers } from "next/headers";
import { db } from "./prisma";

interface Env {
  Bindings: {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  };
}

export const j = jstack.init<Env>();

/**
 * Type-safely injects database into all procedures
 *
 * @see https://jstack.app/docs/backend/middleware
 */
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  // const { DATABASE_URL } = env(c)

  return await next({ db });
});

const authMiddleware = j.middleware(async ({ c, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Require a resolved user id. Without this guard a missing `user.id` would
  // flow into Prisma `where: { userId: undefined }` clauses, which Prisma
  // treats as "no filter" and would leak every user's rows. Failing closed
  // here keeps all downstream queries scoped to the authenticated user.
  if (!session || !session.session || !session.user?.id) {
    throw new HTTPException(401, {
      message: "Unauthorized, sign in to continue.",
    });
  }

  return await next({ auth: { session, userId: session.user.id } });
});

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece yousse to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure.use(databaseMiddleware);
export const privateProcedure = j.procedure
  .use(authMiddleware)
  .use(databaseMiddleware);
