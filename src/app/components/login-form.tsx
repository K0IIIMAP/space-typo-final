"use client";
import { logIn } from "@/actions/actions";
import { cn } from "@/lib/utils";
import React, {
  Dispatch,
  SetStateAction,
  useActionState,
  useState,
} from "react";

import AuthBtn from "./sign-up-btn";
import { LogInSchema } from "@/lib/schemas";
import { z } from "zod";
type LogInFormProps = {
  loginIsActive: boolean;
  setLoginIsActive: Dispatch<SetStateAction<boolean>>;
};
export default function LogInForm({
  loginIsActive,
  setLoginIsActive,
}: LogInFormProps) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (prevState: unknown, formData: FormData) => {
    const formValues = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await LogInSchema.parseAsync(formValues);

      await logIn(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors);
      } else {
        setErrors({ general: "Invalid credentials." });
        location.reload();
      }
    }
  };
  const [, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "initial",
  });
  return (
    <div
      className={cn(
        `border-2 border-white/50 rounded-lg px-6 pt-6 text-white/80  bg-black/30 transition-all duration-300 fixed w-[384px] `,
        {
          "opacity-100": loginIsActive, // Visible when login is active
          "opacity-0": !loginIsActive, // Invisible when signup is active
          "translate-x-0": loginIsActive, // Stay in place when login is active
          "translate-x-[100%]": !loginIsActive, // Slide to the right when signup is active
        }
      )}
    >
      <h2 className="text-white/80 text-2xl font-bold text-center mb-6">
        Login
      </h2>
      <form className="text-white/80" action={formAction}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-white/80 rounded-md bg-white/0 focus:outline-none focus:scale-[1.01] transition"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <AuthBtn type="logIn" isPending={isPending}></AuthBtn>
        {errors.general && (
          <p className="text-red-500 text-sm mt-2"> {errors.general}</p>
        )}
      </form>
      <p className=" pt-20 pb-5 text-center">
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
