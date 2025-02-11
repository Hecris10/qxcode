import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Logo } from "~/components/logo";
import { getLocale } from "~/utils/server/locale";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Qxcode | Register",
  description: "Your codes last forever",
};

export default async function Register() {
  const locale = await getLocale();

  return (
    <div className="w-full h-full min-h-svh justify-center flex align-middle pb-2 lg:py-2 overflow-y-auto">
      <section className="w-full max-w-[400px]  text-white px-3 max-h-svh rounded-2xl m-auto">
        <Link className="lg:hidden" href={"/"}>
          <ChevronLeft />
        </Link>
        <Logo className="mx-auto w-24 h-24" />
        <h2 className="text-center">Register your account</h2>

        <SignupForm locale={locale} />
        <div className="mx-auto mt-4">
          <p className="text-center text-slate-500 mx-auto">
            {`Already have an account?  `}
            <Link href={"/"} className="font-bold text-slate-400">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
