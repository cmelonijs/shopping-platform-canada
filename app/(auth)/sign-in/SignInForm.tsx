"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { signInWithCredentials } from "@/lib/actions/auth.actions";

// SignInForm component for user authentication (we are doing client-side rendering)
const SignInForm = () => {
  // Using useActionState to handle the sign-in action
  // It manages the state of the action, including success and error messages
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  // Using useSearchParams to get the user to redirect to their previous page after signing in
  const searchParams = useSearchParams();

  // If not provided, it defaults to the home page ("/")
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    // We are providing a pending state to indicate if the form is currently being submitted
    // We will use this to disable the button while the sign-in process is ongoing
    const { pending } = useFormStatus();

    return (
      // As you can see here, we are disabling the button while the sign-in process is ongoing
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing in..." : "sign In"}
      </Button>
    );
  };

  return (
    // Using form action to handle the sign-in process
    // The action will be triggered when the form is submitted
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        {/* Label for the form input field */}
        <div>
          <Label className="mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Dont have an account?{" "}
          <Link href="/sign-up" target="_self" className="link font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
