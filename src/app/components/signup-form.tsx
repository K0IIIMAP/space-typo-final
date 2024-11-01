"use client";

import { cn } from "@/lib/utils";

import React, { useActionState, useState } from "react";
import { Dispatch, SetStateAction } from "react";

import AuthBtn from "./sign-up-btn";
import { SignUpSchema } from "@/lib/schemas";
import { z } from "zod";
import { createUser } from "@/actions/actions";

type SignUpFormProps = {
  loginIsActive: boolean;
  setLoginIsActive: Dispatch<SetStateAction<boolean>>;
};
export default function SignUpForm({
  loginIsActive,
  setLoginIsActive,
}: SignUpFormProps) {
  const handleFormSubmit = async (prevState: unknown, formData: FormData) => {
    try {
      const formValues = {
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      };
      await SignUpSchema.parseAsync(formValues);

      await createUser(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors);
      } else {
        location.reload(); // to refresh
      }
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "initial",
  });
  const [errors, setErrors] = useState({});

  return (
    <div
      className={cn(
        `border-2 border-white/50 rounded-lg px-6 pt-6  text-white/80 bg-black/30 fixed w-[384px] transition-all  duration-300`,
        {
          "opacity-0": loginIsActive, // Invisible when login is active
          "opacity-100": !loginIsActive, // Visible when signup is active
          "translate-x-[100%]": loginIsActive, // Slide to the right when login is active
          "translate-x-0": !loginIsActive, // Stay in place when signup is active
        }
      )}
    >
      <h2 className="text-white/80 text-2xl font-bold text-center mb-6">
        Sign up
      </h2>
      <form className="text-white/80" action={formAction}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3  border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{`${errors.email}`}</p>}

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password}`}</p>
        )}

        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mt-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword}`}</p>
        )}

        <AuthBtn type="signUp" isPending={isPending}></AuthBtn>
        {errors.general && (
          <p className="text-red-500">{`${errors.general}`}</p>
        )}
      </form>
      <p className="pt-10 pb-3 text-center">
        Already have an account?{" "}
        <button
          className="font-semibold cursor-pointer underline"
          onClick={() => setLoginIsActive(true)}
        >
          Log In
        </button>
      </p>
    </div>
  );
}
