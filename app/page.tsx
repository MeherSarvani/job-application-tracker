import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import HeroImageSection from "@/components/heroImages";
import FeaturesSection from "@/components/featuresSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-6xl mb-6 text-black text-center">
              Welcome to the Job Tracking App
            </h1>
            <p className="text-center text-xl mb-10 text-muted-foreground">
              Keep track of your job applications and progress effortlessly.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <Link href="/sign-up">
                <Button size="lg" className="px-8 h-12 font-medium text-lg">
                  Start for free <ArrowRight className="ml-2"></ArrowRight>
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free forever. No credit card required
              </p>
            </div>
          </div>
        </section>
        {/* Hero images Section */}
        <HeroImageSection></HeroImageSection>
        {/* features Section */}
        <FeaturesSection></FeaturesSection>
      </main>
    </div>
  );
}
