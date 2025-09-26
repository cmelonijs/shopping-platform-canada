import { getUserById } from "@/lib/actions/auth.actions";
import ProfileAdminForm from "./userIdForm";

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUserById(params.userId);
 
  if (!user) {
    return (
      <div className="p-4 text-center text-red-600">
      User not found.
      </div>
    );
  }
const role = user.role === "admin" ? "admin" : "user";
  return (
    <div className="max-w-xl mx-auto mt-8">
      <ProfileAdminForm
        defaultValues={{
          id:user.id,
          name: user.name,
          email: user.email ??"",
          role : role,
        }}
      />
    </div>
  );
}
