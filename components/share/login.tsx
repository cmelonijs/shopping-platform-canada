import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <Button variant="outline" size="sm" className="p-4 shadow-none">
        <UserRound className="mr-2" />
        Login
    </Button>
  );
}