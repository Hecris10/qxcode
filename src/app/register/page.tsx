import { Metadata } from "next";
import Link from "next/link";
import { MdQrCodeScanner } from "react-icons/md";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Qxcode | Register",
  description: "Your codes last forever",
};

export default async function Register() {
  return (
    <div className="py-8 w-full h-full">
      <section className="w-[90%] max-w-[400px] text-white px-3 md:px-8 py-8 rounded-2xl lg:mt-[6vh] lg:my-auto mx-auto mb-auto border lg:border-none shadow-lg lg:shadow-none">
        <MdQrCodeScanner className="mx-auto w-24 h-24 text-slate-600" />
        <h2 className="text-center">Register your account</h2>
        <SignupForm />
        <div className="mx-auto mt-10 ">
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
