"use client";
import { motion } from "framer-motion";
import { Link as LinkIcon, Mail, Phone, QrCode, Wifi } from "lucide-react";
import Link from "next/link";
import { Logo } from "../logo";
import { Card } from "../ui/card";
import { MainLoginForm } from "./main-login-form";

export const Login = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-16 relative">
        <motion.div
          className="absolute right-0 hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/register"
            className="bg-blue-500 text-white p-3 rounded-md"
          >
            Sign up
          </Link>
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Effortless QR Code Creation.
          <br />
          <span className="text-blue-400">
            Forever Free. Always Customizable.
          </span>
        </motion.h1>
        <motion.p
          className="text-gray-400 text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create fully customizable QR codes that never expire
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {[
            {
              icon: QrCode,
              title: "Text QR Codes",
              desc: "Create QR codes for text messages",
            },
            {
              icon: LinkIcon,
              title: "URL Links",
              desc: "Generate QR codes for websites",
            },
            {
              icon: Wifi,
              title: "WiFi Access",
              desc: "Share WiFi credentials easily",
            },
            { icon: Mail, title: "Email", desc: "Quick email address sharing" },
            {
              icon: Phone,
              title: "Phone Numbers",
              desc: "Direct dial QR codes",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <Card className="p-4 bg-[#151b2d] border-none  transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-lg mx-auto"
        >
          <Card className="p-6  border-none">
            <div>
              <Logo />
            </div>
            <h2 className="text-xl text-center font-semibold mb-6">
              Sign in to QxCode
            </h2>
            <MainLoginForm />
            <div className="text-center mt-4">
              <Link href="/register" className="text-slate-400">
                {`Don't have an account? Click here to register`}
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
};
