"use server";
import { signIn, signOut } from "@/lib/auth";

import prisma from "@/lib/db";
import { LogInSchema, SignUpSchema } from "@/lib/schemas";

import bcrypt from "bcryptjs";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const createUser = async (data: FormData) => {
  const formValues = {
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  try {
    await SignUpSchema.parseAsync(formValues);

    const hashedPassword = await bcrypt.hash(formValues.password, 10);

    const user = await prisma.user.create({
      data: {
        email: formValues.email,
        hashedPassword,
      },
    });

    await signIn("credentials", formValues);
  } catch (error) {
    throw error; // NextAuth handles redirects by throwing an error, so we have to throw an error here to redirect the user to the login page if the user is already signed in.
  }
};
export const logIn = async (formData: FormData) => {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data",
    };
  }

  const authData = Object.fromEntries(formData.entries());
  const validatedAuthData = LogInSchema.safeParse(authData);

  if (!validatedAuthData.success) {
    return {
      message: "Invalid form data",
    };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    throw error; // next js redirects throws error, so we need to re throw it
  }
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/" });
};

export const submitData = async (
  currentPath: string,
  progress: number,
  isChallenge: boolean,
  statsCpm: number
) => {
  const session = await auth();

  if (!session?.user?.email) return;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const userCpm = user?.cpm;
  console.log(userCpm, statsCpm);
  const updatedCpm = userCpm === 0 ? statsCpm : (userCpm! + statsCpm) / 2;
  console.log(updatedCpm);
  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      ...user,
      cpm: updatedCpm,
    },
  });
  if (!isChallenge || progress !== 100) return;

  const challengesCompleted = user?.challengesCompleted;

  const isEasyChallenge = currentPath.includes("easy");
  const isDifficultChallenge = currentPath.includes("difficult");
  const isNormalChallenge = currentPath.includes("normal");
  const isImpossibleChallenge = currentPath.includes("impossible");

  if (isChallenge && isEasyChallenge && challengesCompleted === 0) {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ...user,
        challengesCompleted: challengesCompleted + 1,
        cpm: updatedCpm,
      },
    });
  } else if (isChallenge && isNormalChallenge && challengesCompleted === 1) {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ...user,
        challengesCompleted: challengesCompleted + 1,
        cpm: updatedCpm,
      },
    });
  } else if (isChallenge && isDifficultChallenge && challengesCompleted === 2) {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ...user,
        challengesCompleted: challengesCompleted + 1,
        cpm: updatedCpm,
      },
    });
  } else if (
    isChallenge &&
    isImpossibleChallenge &&
    challengesCompleted === 3
  ) {
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        ...user,
        challengesCompleted: challengesCompleted + 1,
        cpm: updatedCpm,
      },
    });
  }
  revalidatePath("/challenges");
};
