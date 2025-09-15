import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">Could not find requested page</p>
      <Button variant="default" className="mt-4 px-6 py-4 rounded-lg">
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
