import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Login } from "~/components/login";
import { isUserLoggedIn } from "~/services/auth/auth-actions";

export const metadata: Metadata = {
  title: "QX Code | Login",
  description: "Your codes last forever",
};

export default async function Index() {
  const auth = await isUserLoggedIn();

  if (auth.isAuth) {
    redirect("/home");
  }

  return <Login />;
}
