import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import LogOut from "./logoutButton";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function ProfileIconView({
  userDetails,
}: {
  userDetails: { name: string; email: string };
}) {
  return (
    <>
      {userDetails?.name && (
        <>
          <p className="text-primary">Welcome, {userDetails.name}</p>
          <Link href="/dashboard">
            <Button variant="secondary" className="cursor-pointer p-4">
              Dashboard
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="cursor-pointer p-4" variant="ghost">
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {userDetails.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <div>
                    <p>{userDetails.name}</p>
                    <p>{userDetails.email}</p>
                  </div>
                </DropdownMenuLabel>
                <LogOut />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}
