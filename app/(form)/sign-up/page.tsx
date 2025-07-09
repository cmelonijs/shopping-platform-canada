import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { MoveLeft } from 'lucide-react';




export default function SignUp() {
 return (
   <div className="bg-background h-screen">
     <Link href="/">
       <MoveLeft className="absolute top-4 left-4 " size={36}>
       </MoveLeft>
     </Link>
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
         <div className="flex w-full flex-col gap-8">
           <div className="flex flex-col gap-4">
             <div className="flex flex-col gap-2">
               <Input type="email" placeholder="Email" required />
             </div>
             <div className="flex flex-col gap-2">
               <Input type="password" placeholder="Password" required />
             </div>
             <div className="flex flex-col gap-4">
               <Button type="submit" className="mt-2 w-full">
                 Sign Up
               </Button>
             </div>
           </div>
         </div>
         <div className="text-muted-foreground flex justify-center gap-1 text-sm">
           Already have an account?
           <Link href="/sign-in" className="text-primary font-medium hover:underline">
             Sign In
           </Link>
         </div>
       </div>
     </div>
   </div>
 );
}

