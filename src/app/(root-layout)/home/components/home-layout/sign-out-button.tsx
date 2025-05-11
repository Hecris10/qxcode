"use client";

import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";

export const SignOutButton = () => {
  const router = useRouter();
  const signOutUser = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // redirect to login page
        },
      },
    });
  };
  return (
    <button
      aria-label="sign-out-button"
      onClick={signOutUser}
      type="submit"
      className="gap-4 flex my-auto align-middle "
    >
      <MdLogout className="w-6 h-6 font-bold fill-red-400 my-auto" />
      <span className="lg:hidden">Log out</span>
    </button>
  );
};
