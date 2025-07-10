"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/lib/actions/auth.actions";
import { useActionState } from "react";

export default function SignInForm() {
    const [state, action, pending] = useActionState(signInWithCredentials, undefined);

    return (
        <form className="flex w-full flex-col gap-8" action={action}>
            {state?.message && !state.success && (
                <div className="text-sm text-red-500">{state.message}</div>
            )}
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Input type="email" placeholder="Email" name="email" required />
                </div>
                <div className="flex flex-col gap-2">
                    <Input type="password" placeholder="Password" name="password" required />
                </div>
                <div className="flex flex-col gap-4">
                    <Button type="submit" className="mt-2 w-full" disabled={pending}>
                        {pending ? "Signing In..." : "Sign In"}
                    </Button>
                </div>
            </div>
        </form>
    );
}