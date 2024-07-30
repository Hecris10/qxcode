import { useSession } from "next-auth/react";
import { FaApple, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { MdQrCodeScanner } from "react-icons/md";
import { MainLoginForm } from "~/components/login/main-login-form";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { data: session } = useSession();

  return (
    <section className="w-full max-w-[650px] text-white px-3 md:px-8 py-8 rounded-2xl mt-[6vh] md:my-auto border border-blue1 shadow-lg">
      <MdQrCodeScanner className="mx-auto w-24 h-24 text-slate-600" />
      <h2 className="text-center">Sign in to QxCode</h2>
      <MainLoginForm />
      <div className="flex w-[80%] mx-auto my-8">
        <div className="border-t border-blue1 w-full h-1/2 my-auto" />
        <p className="px-2 text-white">Or</p>
        <div className="border-t border-blue1 w-full h-1/2 my-auto" />
      </div>
      <div className="w-full flex flex-col gap-5">
        <Button className="bg-transparent border border-slate-700 shadow-lg text-white text-center rounded-2xl w-full">
          <FaGoogle className="mx-2" /> Continue with Google
        </Button>
        <Button className="bg-transparent border border-slate-700 shadow-lg text-white text-center rounded-2xl w-full">
          <FaMicrosoft className="mx-2" /> Continue with Microsoft
        </Button>
        <Button className="bg-white border hover:bg-zinc-400 border-slate-700 shadow-lg text-black text-center rounded-2xl w-full">
          <FaApple className="mx-2 w-6 h-6" /> Sign in with Apple
        </Button>
      </div>
    </section>
  );
}
