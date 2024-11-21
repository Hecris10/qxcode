import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Login } from "~/components/login";

export const metadata: Metadata = {
  title: "Qxcode | Login",
  description: "Your codes last forever",
};

export default function Index() {
  const auth = false;

  if (auth) {
    redirect("/home");
  }

  return <Login />;
}
