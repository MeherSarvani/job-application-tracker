"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSession } from "@/lib/auth-client";
import ProfileIconView from "./profileIcon";

export default function SignUpView() {
  const { data: session } = useSession();
  return session?.user?.name ? (
    <ProfileIconView userDetails={session!.user}></ProfileIconView>
  ) : (
    <>
      <Link href="/sign-in">
        <Button variant="secondary" className="cursor-pointer">
          Login
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="cursor-pointer">Signup</Button>
      </Link>
    </>
  );
}
