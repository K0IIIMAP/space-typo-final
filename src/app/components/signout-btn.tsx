"use client";
import { signOutUser } from "@/actions/actions";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function SignOutBtn() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      className="bg-accent/100 hover:bg-accent/95 mt-10"
      onClick={() =>
        startTransition(async () => {
          try {
            await signOutUser();
          } catch (error) {
            location.reload();
          }
        })
      }
    >
      Sign out
    </Button>
  );
}
