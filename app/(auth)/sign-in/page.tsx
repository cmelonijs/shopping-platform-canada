import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";
import { MoveLeft } from "lucide-react";

// Sets the title for the browser tab
export const metadata: Metadata = {
  title: "Sign in",
};

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;

  // Check if the user is already authenticated
  const session = await auth();

  // After authentication, redirect to home page or specified callback URL
  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    // Sign-in page layout (design)
    // We are using Shadcn UI components for the card layout here
    <div className="w-full max-w-md mx-auto">
      <Link href="/">
        <MoveLeft className="absolute top-4 left-4" size={36}></MoveLeft>
      </Link>
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              src="/images/logo.png"
              width={100}
              height={100}
              alt={`${APP_NAME} LOGO`}
              priority={true}
            />
          </Link>
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="my-4">
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
