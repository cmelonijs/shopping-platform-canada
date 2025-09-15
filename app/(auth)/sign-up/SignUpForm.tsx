"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signUpUser } from "@/lib/actions/auth.actions";

// Simlar way to SignInForm
const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing up..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="mb-2">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password" className="mb-2">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="mb-2">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="link font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
