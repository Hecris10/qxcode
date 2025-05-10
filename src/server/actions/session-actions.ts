import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getServerSession = async () => auth.api.getSession({
    headers: await headers()
})