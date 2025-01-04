import Link from "next/link";
import { Logo } from "../logo";
import { MainLoginForm } from "./main-login-form";

export const Login = () => (
  <div className="w-full h-screen justify-center flex align-middle">
    <section className="w-[90%] max-w-[400px] text-white px-3 rounded-2xl m-auto">
      <Logo />
      <h2 className="text-center">Sign in to QxCode</h2>
      <MainLoginForm />
      <div className="flex w-[80%] mx-auto my-8"></div>
      <div className="w-full flex flex-col gap-5"></div>
      <div className="mx-auto">
        <p className="text-center text-slate-500 mx-auto">
          {`Don't have an account?`}{" "}
          <Link href={"/register"} className="font-bold text-slate-400">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  </div>
);
