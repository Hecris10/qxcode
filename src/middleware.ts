export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/settings:path*", "/home:path*", "/api/user:path*"],
};
