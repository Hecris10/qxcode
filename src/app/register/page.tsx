import { Metadata } from "next";
import Link from "next/link";
import { MdQrCodeScanner } from "react-icons/md";
import { getPagePathServer } from "~/utils/server/get-page-path-server";
import { PageProps } from "../../../.next/types/app/page";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Qxcode | Register",
  description: "Your codes last forever",
};

export default async function Register({ params }: PageProps) {
  const path = await getPagePathServer();
  return (
    <div className="py-8 w-full h-full">
      <section className="w-full h-full my-auto mx-auto max-w-[650px] text-white px-3 md:px-8 py-8 rounded-2xl mt-[6vh] md:my-auto border border-blue1 shadow-lg">
        <MdQrCodeScanner className="mx-auto w-24 h-24 text-slate-600" />
        <h2 className="text-center">Register your account</h2>
        <RegisterForm pageUrl={path} />
        <div className="mx-auto mt-10">
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
