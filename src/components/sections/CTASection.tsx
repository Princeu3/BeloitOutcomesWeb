"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaArrowRight, FaCalendar, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-bl-full opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 rounded-tr-full opacity-50" />

      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1">
                Your Future Starts Here
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ready to Join Our
                <span className="text-primary block">Success Story?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-lg">
                Take the first step towards your extraordinary journey. Connect with us to learn more about Beloit&apos;s transformative education and global opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white rounded-full"
                asChild
              >
                <a 
                  href="https://admissions.beloit.edu/apply"
                  aria-label="Apply to Beloit College"
                >
                  Apply Now
                  <FaArrowRight className="ml-2" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full"
                asChild
              >
                <a 
                  href="https://admissions.beloit.edu/portal/visit"
                  aria-label="Schedule a campus visit"
                >
                  Schedule a Visit
                  <FaCalendar className="ml-2" aria-hidden="true" />
                </a>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 text-gray-600">
              <a 
                href="mailto:admissions@beloit.edu"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="Email admissions"
              >
                <FaEnvelope className="text-primary" aria-hidden="true" />
                <span>admissions@beloit.edu</span>
              </a>
              <a 
                href="https://www.google.com/maps/place/Beloit+College"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                aria-label="View Beloit College location on map"
              >
                <FaMapMarkerAlt className="text-primary" aria-hidden="true" />
                <span>Beloit, Wisconsin</span>
              </a>
            </div>
          </div>

          {/* Right Content - Quick Stats */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">94%</p>
                  <p className="text-sm text-gray-600">Employed or in Graduate School</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">100+</p>
                  <p className="text-sm text-gray-600">Global Companies Hiring Beloiters</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">50+</p>
                  <p className="text-sm text-gray-600">Countries Represented</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-4xl font-bold text-primary">8:1</p>
                  <p className="text-sm text-gray-600">Student-to-Faculty Ratio</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Average Starting Salary", value: "$85,550" },
              { label: "Graduate School Matriculation", value: "63%" },
              { label: "International Students", value: "14%" },
              { label: "Career Success Rate", value: "93%" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 