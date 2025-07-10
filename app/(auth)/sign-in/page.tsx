import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from 'lucide-react';
import SignInForm from "./SignInForm";


export default async function SignInPage({
 searchParams,
}: {
 searchParams: { error?: string } | Promise<{ error?: string }>;
}) {
 const { error } = await searchParams;

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

             <SignInForm />

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



