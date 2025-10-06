import { getUserById } from "@/lib/actions/auth.actions";
import ProfileUsersForm from "./userIdForm";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    return <div className="p-4 text-center text-red-600">User not found.</div>;
  }

  const role = user.role === "admin" ? "admin" : "user";
  return (
    <div className="max-w-xl mx-auto mt-8">
      <ProfileUsersForm
        defaultValues={{
          id: user.id,
          name: user.name,
          email: user.email ?? "",
          role: role,
        }}
      />
    </div>
  );
}
