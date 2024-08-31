import { getServerSession, NextAuthOptions } from "next-auth";

interface UserSession {
    user: {
        name: string;
        email: string;
        image?: string | undefined;
    };
    name: string;
    email: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
}

export const useUserServerSession = async (authOptions: NextAuthOptions) => {
    return await getServerSession(authOptions) as UserSession;

}

