import Link from "next/link";
import { Logo } from "../logo";
import { MainLoginForm } from "./main-login-form";

export const Login = () => (
  <div className="w-full h-svh bg-blue4 justify-center flex align-middle">
    <section className="w-full max-w-[400px] text-white px-3 max-h-svh rounded-2xl m-auto">
      <Logo />
      <h2 className="text-center">Sign in to QxCode</h2>
      <MainLoginForm />
      <div className="mx-auto mt-5">
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
