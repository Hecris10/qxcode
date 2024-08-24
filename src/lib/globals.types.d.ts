import "next-auth";
interface UserClient {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  image?: string;
}

declare module "next-auth" {
  interface Session {
    user: UserClient & { accessToken: string };
  }
}

export interface ApiHandlerError {
  status: number;
  message: string;
}
