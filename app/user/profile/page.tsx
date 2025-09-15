//userProfilePage

import { Card } from "@/components/ui/card";
import { getName } from "@/lib/actions/profile.actions";
import ProfileForm from "./ProfileForm";
import ShippingForm from "@/app/(root)/shipping-address/ShippingForm";
import { getAddress } from "@/lib/actions/address.actions";

const UserProfilePage = async () => {
  const existingName = await getName();
  const existingAddress = await getAddress();
  return (
    <>
      <div className="mx-auto p-6 h-screen ">
        <h1 className="text-2xl font-bold mb-4"> Profile </h1>
        <div className="flex gap-4 items-stretch">
          <Card className=" bg-grey-100 p-4 border border-gray-300 rounded-lg shadow-sm">
            <ProfileForm defaultValues={existingName || undefined} />
          </Card>
          <Card className=" bg-grey-100 p-4 border border-gray-300 rounded-lg shadow-sm">
            <ShippingForm
              defaultValues={existingAddress ?? undefined}
              context="profile"
            />
          </Card>
        </div>
      </div>
    </>
  );
};
export default UserProfilePage;
