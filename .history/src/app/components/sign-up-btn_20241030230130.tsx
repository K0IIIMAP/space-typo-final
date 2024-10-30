"use client";
import React from "react";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function AuthBtn({
  type,

  isPending,
}: {
  type: string;

  isPending?: boolean;
}) {
  return (
    <Button
      disabled={isPending}
      className=" disabled:opacity-50 mt-4 w-full p-3 bg-accent/100 text-white/80 rounded-md hover:bg-accent hover:scale-[1.01] focus:scale-[0.98] transition"
    >
      {type === "signUp" ? "Sign up" : "Log in"}
    </Button>
  );
}
