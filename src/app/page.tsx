import { Metadata } from "next";
import { cookies } from "next/headers";
import { Login } from "~/components/login";

export const metadata: Metadata = {
  title: "Qxcode | Login",
  description: "Your codes last forever",
};

export default function Home() {
  const cookieStore = cookies();
  const tokenDev = cookieStore.get("next-auth.session-token")?.value;
  const tokenPrd = cookieStore.get("__Secure-next-auth.session-token")?.value;

  const auth = tokenDev || tokenPrd;

  if (!auth) {
    return <Login />;
  }

  return <>Dashboard</>;
}
