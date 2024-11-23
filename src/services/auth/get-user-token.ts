import { cookies } from "next/headers";

export const getUserToken = async () => {
  const cookiesStore = await cookies();
  const authCookie = cookiesStore.get(`${process.env.AUTH_TOKEN_NAME}`);
  const accessToken = authCookie?.value;

  return accessToken;
};
