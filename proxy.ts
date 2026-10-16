import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export default async function proxy(request: NextRequest) {
  const session = await getSession();
  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  const isSignInPage = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUppage = request.nextUrl.pathname.startsWith("/sign-up");
  if (isDashboardPage && !session?.user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if ((isSignInPage || isSignUppage) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}
