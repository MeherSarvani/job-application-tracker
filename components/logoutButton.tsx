"use client";
import { signOut } from "@/lib/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={async () => {
        await signOut();
        router.push("/sign-in");
      }}
    >
      Logout
    </DropdownMenuItem>
  );
}
