"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { motion } from "framer-motion";

import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const currentPath = usePathname();
  const routes = [
    { label: "Home", path: "/" },
    { label: "Modes", path: "/modes", keyWord: "mode" },
    { label: "Challenges", path: "/challenges", keyWord: "challenge" },
  ];
  if (session?.user) {
    routes.push({ label: "Account", path: "/account" });
  } else {
    routes.push({ label: "Log in", path: "/log-in" });
  }

  return (
    <>
      <Link href="/" className="text-2xl font-bold max-sm:mb-2">
        Space Typo
      </Link>
      <nav>
        <ul className="flex gap-x-5 items-center ">
          {routes.map(({ label, path, keyWord }) => (
            <li
              key={path}
              className="text-white/50 hover:text-white/80 transition relative text-[14px] "
            >
              <Link
                href={path}
                className={cn(``, {
                  "text-white":
                    currentPath === path || currentPath.includes(keyWord!),
                })}
                onClick={() => {
                  if (
                    (path === "/modes" || path === "/challenges") &&
                    !session?.user
                  ) {
                    toast.warning("Log in to access modes and challenges", {
                      className: "bg-red-500 border-none text-white",
                    });
                  }
                }}
              >
                {label}
              </Link>
              {currentPath === path || currentPath.includes(keyWord!) ? (
                <motion.div
                  layoutId="header-active-link"
                  className=" absolute h-1 w-full bottom-[-5px] bg-accent"
                ></motion.div>
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
