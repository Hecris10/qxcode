import "next-auth";
interface UserClient {
  id: string;
  email: string;
  name: string;
}

declare module "next-auth" {
  interface Session {
    user: UserClient & { accessToken: string };
  }
}
