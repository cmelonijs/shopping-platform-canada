//userProfilePage
import {Label} from "@/components/ui/label";
import { Card,CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
 export default function UserProfilePage() {
   return (

     <div className="max-w-2xl mx-auto p-6 h-screen ">
       <h1 className="text-2xl font-bold mb-4"> Profile </h1>
       
    <Card className=" bg-grey-100 p-auto border border-gray-300 rounded-lg shadow-sm">
      <CardContent className="space-y-4">
      
        <Label htmlFor="name"> Name: </Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
        />
        <Label htmlFor="email" > Email: </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="JohnDoe@example.com"
        />
      </CardContent>

      
       </Card>
     </div>
   );
 }

