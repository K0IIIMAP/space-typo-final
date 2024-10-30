import { logIn } from "@/actions/actions";
import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import AuthBtn from "./sign-up-btn";

type LogInFormProps = {
  loginIsActive: boolean;
  setLoginIsActive: Dispatch<SetStateAction<boolean>>;
};

export default function LogInForm({
  loginIsActive,
  setLoginIsActive,
}: LogInFormProps) {
  return (
    <div
      className={cn(
        `border-2 border-white/50 rounded-lg px-6 pt-6 text-white/80 bg-black/30 transition-all duration-300 fixed w-[384px]`,
        {
          "opacity-100": loginIsActive,
          "opacity-0": !loginIsActive,
          "translate-x-0": loginIsActive,
          "translate-x-[100%]": !loginIsActive,
        }
      )}
    >
      <h2 className="text-white/80 text-2xl font-bold text-center mb-6">
        Login
      </h2>
      <form className="text-white/80" action={logIn}>
        <input
          type="email"
          name="email"
          className="w-full p-3 mb-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Email"
          maxLength={40}
          required
        />
        <input
          type="password"
          name="password"
          className="w-full p-3 mb-6 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Password"
          required
          maxLength={25}
          minLength={8}
        />
        <AuthBtn type="logIn"></AuthBtn>
      </form>
      <p className="pt-20 pb-5 text-center">
        Don&apos;t have an account yet?{" "}
        <button
          className="font-semibold cursor-pointer underline"
          onClick={() => setLoginIsActive(false)}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
