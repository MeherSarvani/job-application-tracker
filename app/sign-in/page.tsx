"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async function (e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const result = await signIn.email({ email, password });
      if (result.error) {
        setError("Error occurred during login ");
      } else {
        setError("");
        router.push("/dashboard");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "an error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="min-w-lg border-gray-400 shadow-lg">
          <CardHeader className="flex flex-col items-center gap-2 font-bold">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {" "}
              Sign in to your account to continue.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-4 mb-4">
              {error && (
                <p className="text-destructive text-sm mt-2 bg-destructive/15 p-2 rounded text-center">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  minLength={8}
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-primary focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-4">
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <p>
                Don`t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
