import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "./logo";
export const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="border-b  border-gray-800">
        <div className="mx-auto container px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold">QX Code</span>
          </div>

          <Link
            href="/register"
            className="bg-blue-600 p-3 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <>{children}</>
      <footer className="border-t border-gray-800">
        <div className="container py-10">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} QX Code. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
