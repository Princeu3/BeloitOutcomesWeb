import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import dynamic from "next/dynamic";
import CareerOutcomesSnapshot from "@/components/sections/CareerOutcomesSnapshot";
import CTASection from "@/components/sections/CTASection";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const OutcomesExplorer = dynamic(() => import("@/components/sections/OutcomesExplorer"));
const SuccessStories = dynamic(() => import("@/components/sections/SuccessStories"));
const EmployerTestimonials = dynamic(() => import("@/components/sections/EmployerTestimonials"));

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
