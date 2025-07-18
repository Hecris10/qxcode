import type { AppRouter } from "@/server";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { createClient } from "jstack";
import { auth } from "./auth";

function getBaseUrl() {
  // 👇 Use browser URL if client-side
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // 👇 Use Vercel URL in production
  if (process.env.BETTER_AUTH_URL) {
    return `${process.env.BETTER_AUTH_URL}`;
  }

  // 👇 Default to localhost
  return `http://localhost:3000`;
}

/**
 * Your type-safe API client
 * @see https://jstack.app/docs/backend/api-client
 */
export const client = createClient<AppRouter>({
  baseUrl: `${getBaseUrl()}/api`,
  // you can pass client configuration here
  // plugins: [inferAdditionalFields<typeof auth>()],
});

export const authClient = createAuthClient({
  //you can pass client configuration here
  plugins: [inferAdditionalFields<typeof auth>()],
});
