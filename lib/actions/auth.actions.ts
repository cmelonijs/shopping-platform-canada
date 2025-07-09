"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function signInAction(formData: FormData) {
 const email = formData.get("email");
 const password = formData.get("password");


 if (typeof email !== "string" || typeof password !== "string") {
   throw new Error("Email and password are required");
 }


 const res = await signIn("credentials", {
   redirect: false,
   email,
   password,
 });


 if (res?.error) {
   throw new AuthError(res.error);
 }


 redirect("/");
}

export async function signOutAction() {
 const res = await signOut({
   redirect: false,
 });

 if (res?.error) {
   throw new AuthError(res.error);
 }

 redirect("/");
}

