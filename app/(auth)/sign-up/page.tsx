import { CardHeader, Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MoveLeft } from "lucide-react";
import SignUpForm from "./SignUpForm";


export const metadata: Metadata = {
 title: "Sign up",
};


const SignUpPage = async (props: {
 searchParams: Promise<{ callbackUrl: string }>;
}) => {
 const { callbackUrl } = await props.searchParams;


 const session = await auth();


 if (session) {
   return redirect(callbackUrl || "/");
 }
 return (
   <div className="w-full max-w-md mx-auto">
     <Link href="/">
       <MoveLeft className="absolute top-4 left-4" size={36}>
       </MoveLeft>
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
         <CardTitle className="text-center">Sign Up</CardTitle>
         <CardDescription className="text-center">
           Sign up to create a new account
         </CardDescription>
       </CardHeader>
       <CardContent className="my-4">
         <SignUpForm />
       </CardContent>
     </Card>
   </div>
 );
};


export default SignUpPage;





