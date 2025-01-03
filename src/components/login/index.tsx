import Link from "next/link";
import { Logo } from "../logo";
import { MainLoginForm } from "./main-login-form";

export const Login = () => (
  <div className="w-screen h-screen flex align-top lg:align-middle justify-center p-4">
    <section className="w-[90%] max-w-[400px] text-white px-3 md:px-8 py-8 rounded-2xl lg:mt-[6vh] lg:my-auto mx-auto mb-auto border lg:border-none shadow-lg lg:shadow-none">
      <Logo />
      <h2 className="text-center">Sign in to QxCode</h2>
      <MainLoginForm />
      <div className="flex w-[80%] mx-auto my-8">
        {/* <div className="border-t border-blue1 w-full h-1/2 my-auto" />
        <p className="px-2 text-white">Or</p>
        <div className="border-t border-blue1 w-full h-1/2 my-auto" /> */}
      </div>
      <div className="w-full flex flex-col gap-5">
        {/* <GoogleLoginButton /> */}
        {/* <Button className="bg-transparent border border-slate-700 shadow-lg text-white text-center rounded-2xl w-full">
          <FaMicrosoft className="mx-2" /> Continue with Microsoft
        </Button>
        <Button className="bg-white border hover:bg-zinc-400 border-slate-700 shadow-lg text-black text-center rounded-2xl w-full">
          <FaApple className="mx-2 w-6 h-6" /> Sign in with Apple
        </Button> */}
      </div>
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
