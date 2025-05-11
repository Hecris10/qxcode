import { Logo } from "@/components/logo";

import { getLocale } from "@/server/actions/headers-actions";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "QX Code | Register",
  description: "Your codes last forever",
};

export default async function Register() {
  const locale = await getLocale();

  return (
    <main className="mx-auto w-scrs px-4 py-12">
      <section className="w-full md:min-w-[400px] text-white px-3 rounded-2xl m-auto">
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
    </main>
  );
}
