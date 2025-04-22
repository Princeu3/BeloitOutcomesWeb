"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import WorldMap, { Destination } from "@/components/ui/world-map";

// Sample data for top employers, grad schools, and salary
const topEmployers = [
  { 
    name: "Microsoft", 
    logo: "/images/employers/microsoft.png", 
    count: 2,
    location: "Redmond, WA",
    roles: ["Software Engineer", "Product Manager"]
  },
  { 
    name: "Apple", 
    logo: "/images/employers/apple.png", 
    count: 1,
    location: "Cupertino, CA",
    roles: ["Data Scientist"]
  },
  { 
    name: "Northern Trust", 
    logo: "/images/employers/northern-trust.png", 
    count: 1,
    location: "Chicago, IL",
    roles: ["AI & Machine Learning Engineer"]
  },
  { 
    name: "Boston Consulting Group", 
    logo: "/images/employers/bcg.png", 
    count: 1,
    location: "Chicago, IL",
    roles: ["Strategy Consultant"]
  },
  { 
    name: "IBM", 
    logo: "/images/employers/ibm.png", 
    count: 1,
    location: "New York, NY",
    roles: ["Technology Consultant"]
  },
  { 
    name: "Wells Fargo", 
    logo: "/images/employers/wells-fargo.png", 
    count: 1,
    location: "San Francisco, CA",
    roles: ["Financial Analyst"]
  },
];

const topGradSchools = [
  { 
    name: "New York University", 
    logo: "/images/schools/nyu.png", 
    count: 1,
    programs: ["MS in Data Science"],
    location: "New York, NY"
  },
  { 
    name: "Washington University", 
    logo: "/images/schools/wustl.png", 
    count: 1,
    programs: ["PhD in Computational Biology"],
    location: "St. Louis, MO"
  },
  { 
    name: "Carnegie Mellon University", 
    logo: "/images/schools/cmu.png", 
    count: 1,
    programs: ["MS in Computer Science"],
    location: "Pittsburgh, PA"
  },
  { 
    name: "University of Minnesota", 
    logo: "/images/schools/umn.png", 
    count: 1,
    programs: ["PhD in Mathematics"],
    location: "Minneapolis, MN"
  },
  { 
    name: "University of Illinois Chicago", 
    logo: "/images/schools/uic.png", 
    count: 1,
    programs: ["MS in Business Analytics"],
    location: "Chicago, IL"
  },
];

const salaryByMajor = [
  { 
    major: "Computer Science", 
    median: 127500,
    range: { min: 95000, max: 160000 },
    companies: ["Microsoft", "Apple", "Google"]
  },
  { 
    major: "Quantitative Economics", 
    median: 100000,
    range: { min: 85000, max: 120000 },
    companies: ["Goldman Sachs", "Morgan Stanley"]
  },
  { 
    major: "Mathematics", 
    median: 145000,
    range: { min: 110000, max: 180000 },
    companies: ["Jane Street", "Two Sigma"]
  },
  { 
    major: "Business Economics", 
    median: 97500,
    range: { min: 80000, max: 115000 },
    companies: ["Deloitte", "EY"]
  },
  { 
    major: "Environmental Studies", 
    median: 85000,
    range: { min: 65000, max: 105000 },
    companies: ["EPA", "World Wildlife Fund"]
  },
  { 
    major: "Studio Art", 
    median: 75000,
    range: { min: 55000, max: 95000 },
    companies: ["Adobe", "Pixar"]
  },
  { 
    major: "Theatre Arts", 
    median: 200000,
    range: { min: 150000, max: 250000 },
    companies: ["Netflix", "Disney"]
  },
];

// Sample geographic data with coordinates
const destinationCountries = [
  // United States (multiple cities)
  { name: "New York, USA", code: "US", count: 45, coordinates: [-74.0060, 40.7128] },
  { name: "San Francisco, USA", code: "US", count: 35, coordinates: [-122.4194, 37.7749] },
  { name: "Chicago, USA", code: "US", count: 30, coordinates: [-87.6298, 41.8781] },
  { name: "Seattle, USA", code: "US", count: 25, coordinates: [-122.3321, 47.6062] },
  { name: "Boston, USA", code: "US", count: 20, coordinates: [-71.0589, 42.3601] },
  { name: "Los Angeles, USA", code: "US", count: 15, coordinates: [-118.2437, 34.0522] },
  
  // Asia
  { name: "Tokyo, Japan", code: "JP", count: 12, coordinates: [139.6503, 35.6762] },
  { name: "Shanghai, China", code: "CN", count: 15, coordinates: [121.4737, 31.2304] },
  { name: "Beijing, China", code: "CN", count: 10, coordinates: [116.4074, 39.9042] },
  { name: "Singapore", code: "SG", count: 8, coordinates: [103.8198, 1.3521] },
  { name: "Seoul, South Korea", code: "KR", count: 7, coordinates: [126.9780, 37.5665] },
  { name: "Mumbai, India", code: "IN", count: 9, coordinates: [72.8777, 19.0760] },
  { name: "Bangalore, India", code: "IN", count: 6, coordinates: [77.5946, 12.9716] },
  
  // Europe
  { name: "London, UK", code: "GB", count: 18, coordinates: [-0.1276, 51.5074] },
  { name: "Paris, France", code: "FR", count: 8, coordinates: [2.3522, 48.8566] },
  { name: "Berlin, Germany", code: "DE", count: 10, coordinates: [13.4050, 52.5200] },
  { name: "Amsterdam, Netherlands", code: "NL", count: 5, coordinates: [4.9041, 52.3676] },
  { name: "Stockholm, Sweden", code: "SE", count: 4, coordinates: [18.0686, 59.3293] },
  { name: "Zurich, Switzerland", code: "CH", count: 6, coordinates: [8.5417, 47.3769] },
  
  // Rest of Americas
  { name: "Toronto, Canada", code: "CA", count: 9, coordinates: [-79.3832, 43.6532] },
  { name: "Vancouver, Canada", code: "CA", count: 7, coordinates: [-123.1207, 49.2827] },
  { name: "Mexico City, Mexico", code: "MX", count: 7, coordinates: [-99.1332, 19.4326] },
  { name: "São Paulo, Brazil", code: "BR", count: 4, coordinates: [-46.6333, -23.5505] },
  
  // Oceania
  { name: "Sydney, Australia", code: "AU", count: 6, coordinates: [151.2093, -33.8688] },
  { name: "Melbourne, Australia", code: "AU", count: 4, coordinates: [144.9631, -37.8136] },
  
  // Africa
  { name: "Cape Town, South Africa", code: "ZA", count: 3, coordinates: [18.4241, -33.9249] },
  { name: "Nairobi, Kenya", code: "KE", count: 2, coordinates: [36.8219, -1.2921] }
];

// Update the geographic data format for the new map
const destinationPoints: Destination[] = destinationCountries.map(country => ({
  start: { lat: 43.0730517, lng: -89.0317765, label: "Beloit College" },
  end: { lat: country.coordinates[1], lng: country.coordinates[0], label: country.name },
  count: country.count
}));

export default function CareerOutcomesSnapshot() {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const handleDotClick = (dot: Destination) => {
    console.log('Dot clicked:', dot.end.label);
  };

  const totalAlumni = 11000;
  const minorityEnrollment = 32;
  const internationalPercentage = 14;

  return (
    <section id="career-outcomes" className="py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Career Outcomes Snapshot</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover where Beloit graduates work, study, and thrive around the world. With {minorityEnrollment}% minority enrollment and {internationalPercentage}% international students, we are proud of our diverse community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map Visualization Card */}
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">Global Impact</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {totalAlumni.toLocaleString()} Alumni Worldwide
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm">
                Discover where Beloit alumni are making an impact around the world
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <WorldMap 
                dots={destinationPoints}
                lineColor="#3b82f6"
                showPopup={true}
                onDotClick={handleDotClick}
              />
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">Career Insights</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Explore employment, education, and compensation trends
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="employers" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="employers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Top Employers
                  </TabsTrigger>
                  <TabsTrigger value="gradschools" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Grad Schools
                  </TabsTrigger>
                  <TabsTrigger value="salary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Salaries
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="employers" className="mt-0">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {topEmployers.map((employer) => (
                        <motion.div 
                          key={employer.name} 
                          className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                                {employer.logo ? (
                                  <Image
                                    src={employer.logo}
                                    alt={employer.name}
                                    fill
                                    className="object-cover p-2"
                                  />
                                ) : (
                                  <span className="text-xl font-semibold text-muted-foreground">
                                    {employer.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-semibold text-foreground truncate">{employer.name}</p>
                                  <Badge variant="outline" className="shrink-0">
                                    {employer.count} {employer.count === 1 ? 'hire' : 'hires'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{employer.location}</p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {employer.roles.map((role) => (
                                    <Badge key={role} variant="secondary" className="text-xs font-normal">
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="gradschools" className="mt-0">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      {topGradSchools.map((school) => (
                        <motion.div 
                          key={school.name} 
                          className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-md transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <div className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="relative w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                                {school.logo ? (
                                  <Image
                                    src={school.logo}
                                    alt={school.name}
                                    fill
                                    className="object-cover p-2"
                                  />
                                ) : (
                                  <span className="text-xl font-semibold text-muted-foreground">
                                    {school.name.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-semibold text-foreground truncate">{school.name}</p>
                                  <Badge variant="outline" className="shrink-0">
                                    {school.count} {school.count === 1 ? 'student' : 'students'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{school.location}</p>
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                  {school.programs.map((program) => (
                                    <Badge key={program} variant="secondary" className="text-xs font-normal">
                                      {program}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="salary" className="mt-0">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-6">
                      {salaryByMajor.map((item) => (
                        <motion.div 
                          key={item.major} 
                          className="space-y-3 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{item.major}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs font-normal">
                                  Median: {formatSalary(item.median)}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  Range: {formatSalary(item.range.min)} - {formatSalary(item.range.max)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative pt-2">
                            <div className="absolute -top-1 left-0 text-xs text-muted-foreground">
                              {formatSalary(item.range.min)}
                            </div>
                            <div className="absolute -top-1 right-0 text-xs text-muted-foreground">
                              {formatSalary(item.range.max)}
                            </div>
                            <Progress 
                              value={(item.median - item.range.min) / (item.range.max - item.range.min) * 100} 
                              className="h-2 mt-4"
                            />
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {item.companies.map((company) => (
                              <Badge key={company} variant="secondary" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 italic">
                      *Based on reported salaries from recent graduates
                    </p>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button 
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a 
              href="#career-outcomes"
              aria-label="View detailed career outcomes data"
            >
              Explore Detailed Outcomes
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
} 