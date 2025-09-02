"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema, signUpFormSchema } from "../validator";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

// sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully!",
    };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      message: formatError(err),
    };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

// sign up the user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    // validate the form data
    const { name, email, password } = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // hash the password
    const hased = await hash(password, 10);

    // insert user into your users table
    await prisma.user.create({
      data: { name, email, password: hased },
    });

    // sign in the user
    await signIn("credentials", { email, password });

    return {
      success: true,
      message: "Signed up successfully!",
    };
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }

    return {
      success: false,
      message: formatError(err),
    };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) throw new Error("User not found");

  return user;
}
