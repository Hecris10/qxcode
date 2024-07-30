import { cookies } from "next/headers";
import { Login } from "~/components/login";

export default function Home() {
  const cookieStore = cookies();
  const auth = cookieStore.get("next-auth.session-token")?.value;

  if (!auth) {
    return <Login />;
  }

  return <>Dashboard</>;
}
