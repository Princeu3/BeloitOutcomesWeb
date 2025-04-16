import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/sections/HeroSection";
import OutcomesExplorer from "@/components/sections/OutcomesExplorer";
import CareerOutcomesSnapshot from "@/components/sections/CareerOutcomesSnapshot";
import SuccessStories from "@/components/sections/SuccessStories";
import EmployerTestimonials from "@/components/sections/EmployerTestimonials";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <OutcomesExplorer />
      <CareerOutcomesSnapshot />
      <SuccessStories />
      <EmployerTestimonials />
      <CTASection />
    </MainLayout>
  );
}
