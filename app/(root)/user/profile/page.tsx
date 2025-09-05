//userProfilePage

import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShippingForm from "../../shipping-address/ShippingForm";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import { getName } from "@/lib/actions/profile.actions";
import ProfileForm from "./profile-form";


const UserProfilePage = async (props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const session = await auth();

const existingName = await getName();

return (
  <>
    <div className="max-w-2xl mx-auto p-6 h-screen ">
      <h1 className="text-2xl font-bold mb-4"> Profile </h1>
      <div className="flex flex row-2 gap-2 space-y-6">
    <Card className=" bg-grey-100 p-auto border border-gray-300 rounded-lg shadow-sm">
        <ProfileForm defaultValues={{ name: existingName ?? "" }} />
        
        </Card>
        <Card className=" bg-grey-100 p-auto border border-gray-300 rounded-lg shadow-sm">
          <CardContent className="space-y-4">
          </CardContent>
        </Card>
      </div>
    </div>
  </>
);
};
export default UserProfilePage;

