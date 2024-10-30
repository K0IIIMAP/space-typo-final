"use client";
import { createUser } from "@/actions/actions";
import { SignUpSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useActionState } from "react";
import { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";

import AuthBtn from "./sign-up-btn";

type SignUpFormProps = {
  loginIsActive: boolean;
  setLoginIsActive: Dispatch<SetStateAction<boolean>>;
};
export default function SignUpForm({
  loginIsActive,
  setLoginIsActive,
}: SignUpFormProps) {
  const {
    register,

    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const [state, formAction, isPending] = useActionState(createUser, null);

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
          className="w-full p-3  border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Email"
          {...register("email")}
          required
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email?.message}`}</p>
        )}

        <input
          type="password"
          className="w-full p-3 mt-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Password"
          {...register("password")}
          required
          minLength={8}
          maxLength={25}
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password?.message}`}</p>
        )}

        <input
          type="password"
          className="w-full p-3 mt-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          required
          minLength={8}
        />
        {errors.confirmPassword && ( // Corrected this line
          <p className="text-red-500">{`${errors.confirmPassword?.message}`}</p>
        )}

        <AuthBtn type="signUp" isPending={isPending}></AuthBtn>
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
