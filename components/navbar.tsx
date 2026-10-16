import { Briefcase } from "lucide-react";
import Link from "next/link";
import SignUpView from "./signupView";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container flex items-center px-4 h-16 mx-auto justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase></Briefcase>
          <p>Job Tracker</p>
        </Link>
        <div className="flex items-center gap-2">
          <SignUpView />
        </div>
      </div>
    </nav>
  );
}
