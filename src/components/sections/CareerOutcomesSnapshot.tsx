"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Button, Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";

// Sample data for top employers, grad schools, and salary
const topEmployers = [
  { name: "Microsoft", logo: "/images/employers/microsoft.png", count: 2 },
  { name: "Apple", logo: "/images/employers/apple.png", count: 1 },
  { name: "Northern Trust", logo: "/images/employers/northern-trust.png", count: 1 },
  { name: "Boston Consulting Group", logo: "/images/employers/bcg.png", count: 1 },
  { name: "IBM", logo: "/images/employers/ibm.png", count: 1 },
  { name: "Wells Fargo", logo: "/images/employers/wells-fargo.png", count: 1 },
];

const topGradSchools = [
  { name: "New York University", logo: "/images/schools/nyu.png", count: 1 },
  { name: "Washington University", logo: "/images/schools/wustl.png", count: 1 },
  { name: "Carnegie Mellon University", logo: "/images/schools/cmu.png", count: 1 },
  { name: "University of Minnesota", logo: "/images/schools/umn.png", count: 1 },
  { name: "University of Illinois Chicago", logo: "/images/schools/uic.png", count: 1 },
];

const salaryByMajor = [
  { major: "Computer Science", median: 127500 },
  { major: "Quantitative Economics", median: 100000 },
  { major: "Mathematics", median: 145000 },
  { major: "Business Economics", median: 97500 },
  { major: "Environmental Studies", median: 85000 },
  { major: "Studio Art", median: 75000 },
  { major: "Theatre Arts", median: 200000 },
];

// Sample geographic data
const destinationCountries = [
  { name: "United States", code: "US", count: 145, color: "#003366" },
  { name: "China", code: "CN", count: 25, color: "#F1B82D" },
  { name: "United Kingdom", code: "GB", count: 18, color: "#8B2332" },
  { name: "India", code: "IN", count: 15, color: "#336699" },
  { name: "Japan", code: "JP", count: 12, color: "#003366" },
  { name: "Germany", code: "DE", count: 10, color: "#F1B82D" },
  { name: "Canada", code: "CA", count: 9, color: "#8B2332" },
  { name: "France", code: "FR", count: 8, color: "#336699" },
  { name: "Mexico", code: "MX", count: 7, color: "#003366" },
  { name: "Australia", code: "AU", count: 6, color: "#F1B82D" },
];

export default function CareerOutcomesSnapshot() {
  const [activeTab, setActiveTab] = useState("employers");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  // Find country details if one is selected
  const selectedCountryData = selectedCountry 
    ? destinationCountries.find(country => country.code === selectedCountry) 
    : null;

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Career Outcomes Snapshot</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover where Beloit graduates work, study, and thrive around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map Visualization - Takes 3 columns on large screens */}
          <Card className="lg:col-span-3 shadow-md">
            <CardBody className="p-0 relative min-h-[400px]">
              <div className="p-4 border-b">
                <h3 className="text-xl font-bold text-primary">Global Destinations</h3>
                <p className="text-sm text-gray-500">
                  {selectedCountry ? 'Click on a country to see details' : 'Beloit alumni across the world'}
                </p>
              </div>

              <div className="relative w-full h-[350px] bg-gray-100">
                {/* This would be replaced with an actual interactive map component */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">Interactive world map would be displayed here</p>
                </div>

                {/* Country selection overlay */}
                {selectedCountryData && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center mb-2">
                      <Image 
                        src={`https://flagcdn.com/32x24/${selectedCountryData.code.toLowerCase()}.png`}
                        alt={`${selectedCountryData.name} flag`}
                        width={32}
                        height={24}
                        className="mr-2"
                      />
                      <h4 className="font-bold text-primary">{selectedCountryData.name}</h4>
                    </div>
                    <p className="text-sm mb-3">
                      <span className="font-medium">{selectedCountryData.count}</span> alumni
                    </p>
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => setSelectedCountry(null)}
                    >
                      Close
                    </Button>
                  </motion.div>
                )}
              </div>

              <div className="p-4 bg-gray-50">
                <h4 className="text-sm font-semibold mb-2">Top Destinations</h4>
                <div className="flex flex-wrap gap-2">
                  {destinationCountries.slice(0, 6).map((country) => (
                    <Button
                      key={country.code}
                      size="sm"
                      className="text-xs"
                      color={country.code === selectedCountry ? "primary" : "default"}
                      variant={country.code === selectedCountry ? "solid" : "bordered"}
                      onClick={() => setSelectedCountry(country.code)}
                    >
                      <Image 
                        src={`https://flagcdn.com/16x12/${country.code.toLowerCase()}.png`}
                        alt={`${country.name} flag`}
                        width={16}
                        height={12}
                        className="mr-1"
                      />
                      {country.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Tabs for Employers, Schools, Salary - Takes 2 columns */}
          <Card className="lg:col-span-2 shadow-md">
            <CardBody>
              <Tabs 
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                color="primary"
                className="w-full"
              >
                <Tab key="employers" title="Top Employers">
                  <div className="py-2 space-y-4">
                    {topEmployers.map((employer) => (
                      <div key={employer.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex items-center justify-center">
                            {/* Placeholder for employer logo */}
                            <p className="text-xs font-bold text-gray-500">{employer.name.charAt(0)}</p>
                          </div>
                          <span className="font-medium">{employer.name}</span>
                        </div>
                        <span className="text-primary font-semibold">{employer.count}</span>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="gradschools" title="Grad Schools">
                  <div className="py-2 space-y-4">
                    {topGradSchools.map((school) => (
                      <div key={school.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-md mr-3 flex items-center justify-center">
                            {/* Placeholder for school logo */}
                            <p className="text-xs font-bold text-gray-500">{school.name.charAt(0)}</p>
                          </div>
                          <span className="font-medium">{school.name}</span>
                        </div>
                        <span className="text-primary font-semibold">{school.count}</span>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="salary" title="Median Salary">
                  <div className="py-2 space-y-4">
                    {salaryByMajor.map((item) => (
                      <div key={item.major} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{item.major}</span>
                          <span className="text-sm font-bold text-primary">{formatSalary(item.median)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${(item.median / 100000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-gray-500 mt-4">
                      *Based on reported salaries from recent graduates
                    </p>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button 
            as="a" 
            href="/outcomes" 
            color="primary"
            variant="solid"
            size="lg"
            className="bg-primary text-white px-8"
          >
            Explore Detailed Outcomes
          </Button>
        </div>
      </div>
    </section>
  );
} 