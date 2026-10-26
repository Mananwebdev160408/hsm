import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryCards } from "@/components/home/CategoryCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CompareTeaser } from "@/components/home/CompareTeaser";
import { AssetLockerTeaser } from "@/components/home/AssetLockerTeaser";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryCards />
      <HowItWorks />
      <CompareTeaser />
      <AssetLockerTeaser />
    </div>
  );
}
