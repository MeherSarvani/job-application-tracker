"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
export default function HeroImageSection() {
  const [activeTab, setActiveTab] = useState("organize"); //organize,hired,manage
  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center gap-4 mb-8">
            <Button
              className="px-8 h-12 font-medium text-lg"
              onClick={() => setActiveTab("organize")}
              variant={activeTab === "organize" ? "secondary" : "default"}
            >
              Organize applications
            </Button>
            <Button
              className="px-8 h-12 font-medium text-lg"
              onClick={() => setActiveTab("hired")}
              variant={activeTab === "hired" ? "secondary" : "default"}
            >
              Get Hired
            </Button>
            <Button
              className="px-8 h-12 font-medium text-lg"
              onClick={() => setActiveTab("manage")}
              variant={activeTab === "manage" ? "secondary" : "default"}
            >
              Manage Board
            </Button>
          </div>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-lg border border-gray-200 shadow-2xl">
            {activeTab === "organize" && (
              <Image
                src="/hero-images/hero1.png"
                alt="hero image 1"
                width={1200}
                height={800}
              ></Image>
            )}
            {activeTab === "hired" && (
              <Image
                src="/hero-images/hero2.png"
                alt="hero image 2"
                width={1200}
                height={800}
              ></Image>
            )}
            {activeTab === "manage" && (
              <Image
                src="/hero-images/hero3.png"
                alt="hero image 3"
                width={1200}
                height={800}
              ></Image>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
