import { Login } from "@/components/login";
import { getServerSession } from "@/server/actions/session-actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "QX Code | Login",
  description: "Your codes last forever",
};

export default async function Index() {
  const auth = await getServerSession();

  if (auth) {
    redirect("/home");
  }

  return <Login />;
}
