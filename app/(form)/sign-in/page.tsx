import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { MoveLeft } from 'lucide-react';
import { signInAction } from "@/lib/actions/users.actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string } | Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const handleSignIn = signInAction;

  return (
    <div className="bg-background h-screen">
      <Link href="/">
          <MoveLeft className="absolute top-4 left-4 " size={36}>
          </MoveLeft>
      </Link>

      {error && (
        <div className="mb-4 text-red-600">
          {error === "CredentialsSignin"
            ? "Invalid email or password."
            : "Unexpected error."}
        </div>
      )}
      <div className="flex h-full items-center justify-center">
          <div className="border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-8 rounded-md border px-6 py-12 shadow-md">
              <div className="flex items-center gap-y-2">
                  <Image
                      src="/ss_logo.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      className="h-16 w-16 rounded-full items-center"
                  />
                  <span className="font-bebas text-3xl">SimpleShop</span>
              </div>

              <form className="flex w-full flex-col gap-8" action={handleSignIn}>
                  <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                          <Input type="email" placeholder="Email" name="email" required />
                      </div>
                      <div className="flex flex-col gap-2">
                          <Input type="password" placeholder="Password" name="password" required />
                      </div>
                      <div className="flex flex-col gap-4">
                          <Button type="submit" className="mt-2 w-full">
                              Sign In
                          </Button>
                      </div>
                  </div>
              </form>

              <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                  Don't have an account?
                  <Link href="/sign-up" className="text-primary font-medium hover:underline">
                      Sign Up
                  </Link>
              </div>
          </div>
      </div>
    </div>
  );
}
