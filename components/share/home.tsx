import { House } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Button variant="outline" size="sm" className="p-4 shadow-none">
        <House className="mr-2" />
        Home
    </Button>
  );
}