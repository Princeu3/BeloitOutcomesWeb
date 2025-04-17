"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Command } from "@/components/ui/command";
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface AlumniProfile {
  id: string;
  name: string;
  year: number;
  major: string;
  division: string;
  outcomeType: string;
  employer: string;
  title: string;
  location: string;
  country: string;
  countryCode: string;
  citizenship: string;
  linkedin: string;
  salary: string;
  skills: string[];
  languages: string[];
  quote: string;
}

interface Filters {
  year: Set<string>;
  major: Set<string>;
  division: Set<string>;
  outcomeType: Set<string>;
  citizenship: Set<string>;
}

// Sample student outcomes data
const outcomeProfiles = [
  {
    id: "vy-mai",
    name: "Vy Mai",
    country: "Vietnam",
    countryCode: "VN",
    major: "Double Major at Beloit College: Quantitative Economics and Anthropology",
    year: 2022,
    outcomeType: "Graduate School",
    employer: "Apple | NYU",
    title: "Data Scientist Intern | MSDS Student",
    location: "New York, NY",
    linkedin: "vy-mai",
    salary: "130,000",
    skills: [
      "Microsoft Azure Machine Learning",
      "Data Analytics",
      "Microsoft Power BI",
      "Customer Research"
    ],
    languages: ["English", "Vietnamese"],
    quote: "Beloit's interdisciplinary approach combining economics and anthropology gave me unique insights into human-centered data science that sets me apart in the tech industry."
  },
  {
    id: "abdul-aziz",
    name: "Abdul Aziz",
    country: "Pakistan",
    countryCode: "PK",
    major: "Double Major at Beloit College: Computer Science and Business Economics",
    year: 2022,
    outcomeType: "Employment",
    employer: "Northern Trust",
    title: "Sr Analyst Software Engineer | AI & Machine Learning",
    location: "Chicago, IL",
    linkedin: "abdul-aziz",
    salary: "110,000",
    skills: [
      "Large Language Models (LLM)",
      "LLMOps",
      "LangChain",
      "NLP & Machine Learning"
    ],
    languages: ["English", "Urdu", "Punjabi", "Arabic", "Persian"],
    quote: "Beloit's dual focus on computer science and economics gave me a unique perspective on applying AI and machine learning solutions to real-world business problems in the financial sector."
  },
  {
    id: "mahima-sharma",
    name: "Mahima Sharma",
    country: "India",
    countryCode: "IN",
    major: "Double Major at Beloit College: Mathematics and Computer Science",
    year: 2021,
    outcomeType: "Employment",
    employer: "Microsoft",
    title: "Software Engineer II",
    location: "Seattle, WA",
    linkedin: "mahima-sharma",
    salary: "145,000",
    skills: [
      "Java",
      "JavaScript",
      "Python",
      "Machine Learning",
      "Data Mining"
    ],
    languages: ["English", "Nepali", "French"],
    quote: "Beloit's personalized education in mathematics and computer science, combined with research opportunities like the Pakula Biomedical Research Program, gave me the perfect foundation for my career in software engineering."
  },
  {
    id: "danielle-strejc",
    name: "Danielle Strejc",
    country: "USA",
    countryCode: "US",
    major: "Major at Beloit College: Quantitative Economics",
    year: 2020,
    outcomeType: "Graduate School",
    employer: "Previously at Deloitte",
    title: "Previously Risk & Financial Advisory Analyst",
    location: "Chicago, IL",
    linkedin: "danielle-strejc",
    salary: "85,000",
    skills: [
      "Data Visualization",
      "SQL",
      "Google BigQuery",
      "Sustainability Analytics"
    ],
    languages: ["English"],
    quote: "Beloit's quantitative economics program gave me the analytical foundation I needed to excel in both data analytics and sustainability consulting."
  },
  {
    id: "sandeep-acharya",
    name: "Sandeep Acharya",
    country: "Nepal",
    countryCode: "NP",
    major: "Double Major at Beloit College: Computer Science and Mathematics",
    year: 2019,
    outcomeType: "Graduate School",
    employer: "Washington University",
    title: "Computational Biologist",
    location: "St. Louis, MO",
    linkedin: "sandeep-acharya",
    skills: [
      "Scikit-Learn",
      "Programming",
      "Research",
      "Multi-omics Data Integration",
      "Genomic Analysis"
    ],
    languages: ["English", "Nepali", "Hindi"],
    quote: "Beloit's rigorous computer science and mathematics curriculum provided me with the fundamental skills to pursue computational biology at the doctoral level."
  },
  {
    id: "shambhavi-upadhyaya",
    name: "Shambhavi Upadhyaya",
    country: "India",
    countryCode: "IN",
    major: "Double Major at Beloit College: Mathematics and Studio Art",
    year: 2019,
    outcomeType: "Self-employed",
    employer: "Self-employed Artist",
    title: "Professional Artist",
    location: "Mumbai, India",
    linkedin: "shambhavi-upadhyaya",
    salary: "3,000",
    skills: [
      "Fine Art",
      "Workshop Facilitation",
      "Commissioned Art",
      "Creative Direction",
      "Digital Marketing"
    ],
    languages: ["English", "Hindi", "Nepali", "French"],
    quote: "Beloit's liberal arts approach allowed me to pursue both mathematics and studio art, giving me unique analytical and creative perspectives that I apply to my work as an artist and previously in technology."
  },
  {
    id: "nach-karnik",
    name: "Nachiket 'Nach' Karnik",
    country: "India",
    countryCode: "IN",
    major: "Double Major at Beloit College: Economics & Management and Theatre Arts",
    year: 2008,
    outcomeType: "Employment",
    employer: "Boston Consulting Group",
    title: "Project Leader",
    location: "St. Paul, MN",
    linkedin: "nach-karnik",
    salary: "200,000",
    skills: [
      "Data Analysis",
      "Content Management",
      "Cross-Cultural Communication",
      "Strategy Consulting",
      "Marketing Strategy"
    ],
    languages: ["English", "Marathi", "Hindi"],
    quote: "Beloit's unique combination of economics and theatre arts gave me both the analytical rigor and communication skills that make me effective in consulting."
  },
  {
    id: "aaron-bauhs",
    name: "Aaron Bauhs",
    country: "USA",
    countryCode: "US",
    major: "Double Major at Beloit College: Studio Art and Business Administration",
    year: 2005,
    outcomeType: "Employment",
    employer: "IBM",
    title: "Partner",
    location: "Chicago, IL",
    linkedin: "aaron-bauhs",
    salary: "250,000",
    skills: [
      "Strategy",
      "Sales",
      "Management",
      "Program Management",
      "Client Relationship Management"
    ],
    languages: ["English"],
    quote: "Beloit's creative fusion of studio art and business administration taught me to connect creativity with structure, which has been fundamental to my success in business strategy and consulting."
  },
  {
    id: "ankit-dahiya",
    name: "Ankit Dahiya",
    country: "India",
    countryCode: "IN",
    major: "Double Major at Beloit College: Quantitative Economics and Environmental Studies",
    year: 2024,
    outcomeType: "Employment",
    employer: "Wells Fargo",
    title: "Analyst",
    location: "United States",
    linkedin: "ankit-dahiya",
    salary: "85,000",
    skills: [
      "Energy Sector Analysis",
      "Equity Research",
      "Financial Market Research",
      "Data Analytics"
    ],
    languages: ["English", "Hindi"],
    quote: "Beloit's blend of quantitative economics and environmental studies gave me the analytical skills and interdisciplinary perspective that helps me stand out in the financial sector."
  }
];

// Simplified outcome types
const outcomeTypes = ["Employment", "Graduate School", "Self-employed"];

// More focused filter options
const graduationYears = [2024, 2023, 2022, 2021, 2020, 2019];
const majors = [
  "Computer Science",
  "Mathematics",
  "Economics",
  "Anthropology",
  "Studio Art",
  "Theatre Arts",
  "Environmental Studies",
  "Business Economics",
  "Quantitative Economics"
];

// Define filter types
type FilterKeys = "year" | "major";

export default function OutcomesExplorer() {
  const [filters, setFilters] = useState<Record<FilterKeys, Set<string>>>({
    year: new Set([]),
    major: new Set([]),
  });
  
  const [filteredProfiles, setFilteredProfiles] = useState<typeof outcomeProfiles>([]);
  const [showAll, setShowAll] = useState(false);
  const hasActiveFilters = filters.year.size > 0 || filters.major.size > 0;

  // Apply filters effect
  useEffect(() => {
    if (!hasActiveFilters && !showAll) {
      setFilteredProfiles([]);
      return;
    }

    const filteredResults = outcomeProfiles.filter((profile) => {
      // Return true if no filters of this type are selected, or if profile matches any selected filter
      const yearFilter = filters.year.size === 0 || filters.year.has(profile.year.toString());
      
      // Enhanced major filter to match any selected major within the combined majors
      const majorFilter = filters.major.size === 0 || 
        Array.from(filters.major).some(selectedMajor => 
          profile.major.toLowerCase().includes(selectedMajor.toLowerCase())
        );
      
      return yearFilter && majorFilter;
    });
    
    setFilteredProfiles(filteredResults);
  }, [filters, showAll, hasActiveFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setShowAll(false);
    setFilters((prev) => ({
      ...prev,
      [filterType]: new Set([value]),
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setShowAll(false);
    setFilters({
      year: new Set([]),
      major: new Set([]),
    });
  };

  // Toggle show all
  const handleShowAll = () => {
    setShowAll(true);
    setFilters({
      year: new Set([]),
      major: new Set([]),
    });
  };

  return (
    <section className="py-12 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Alumni Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Beloit graduates are making an impact globally through their diverse career paths and achievements.
          </p>
        </div>

        {/* Refined Filters */}
        <Card className="mb-8 shadow-md border-border/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h3 className="text-lg font-semibold text-foreground">Filter Alumni</h3>
            <p className="text-sm text-muted-foreground">Use the filters below to find specific alumni outcomes or click Show All to view everyone</p>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-70"
                  >
                    <path
                      d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  Graduation Year
                </label>
                <Select
                  onValueChange={(value: string) => handleFilterChange("year", value)}
                  value={Array.from(filters.year)[0] || ""}
                >
                  <SelectTrigger className="w-full bg-background border-input/50 hover:border-input focus:ring-1 focus:ring-ring/30 transition-all">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    {graduationYears.map((year) => (
                      <SelectItem 
                        key={year.toString()} 
                        value={year.toString()}
                        className="hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                      >
                        Class of {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-70"
                  >
                    <path
                      d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                    <path
                      d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                    <path
                      d="M7.09991 13.5V1.5H7.89991V13.5H7.09991Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                  Major
                </label>
                <Select
                  onValueChange={(value: string) => handleFilterChange("major", value)}
                  value={Array.from(filters.major)[0] || ""}
                >
                  <SelectTrigger className="w-full bg-background border-input/50 hover:border-input focus:ring-1 focus:ring-ring/30 transition-all">
                    <SelectValue placeholder="Pick a major" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <ScrollArea className="h-[200px] pr-3">
                      {majors.map((major) => (
                        <SelectItem 
                          key={major} 
                          value={major}
                          className="hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                        >
                          {major}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
            </div>
          
            <Separator className="my-6" />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm text-muted-foreground">
                  {filteredProfiles.length > 0 ? (
                    <>Found <span className="font-medium text-foreground">{filteredProfiles.length}</span> alumni</>
                  ) : (
                    <span className="text-muted-foreground">Select filters or show all to view alumni</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                {(hasActiveFilters || showAll) && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    size="sm"
                    className="text-muted-foreground hover:text-foreground border-input/50 hover:border-input transition-colors"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clear
                  </Button>
                )}
                <Button
                  variant="default"
                  onClick={handleShowAll}
                  size="sm"
                  className={cn(
                    "bg-primary hover:bg-primary/90",
                    showAll && "bg-primary/90"
                  )}
                >
                  Show All Alumni
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card key={profile.id} className="group hover:shadow-lg transition-all duration-300 bg-card">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">Class of {profile.year}</p>
                    </div>
                    <Image
                      src={`https://flagcdn.com/32x24/${profile.countryCode.toLowerCase()}.png`}
                      alt={`${profile.country} flag`}
                      width={32}
                      height={24}
                      className="rounded-sm shadow-sm"
                    />
                  </div>
                  <Badge 
                    variant={profile.outcomeType === "Employment" ? "default" : 
                            profile.outcomeType === "Graduate School" ? "secondary" : "outline"}
                    className="w-fit"
                  >
                    {profile.outcomeType}
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">{profile.employer}</p>
                    <p className="text-sm text-muted-foreground">{profile.title}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{profile.major}</p>
                    <p className="text-sm text-muted-foreground">{profile.location}</p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-background hover:bg-accent text-foreground hover:text-accent-foreground
                             border-border hover:border-border transition-all duration-300"
                    asChild
                  >
                    <a
                      href={`https://www.linkedin.com/in/${profile.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaLinkedin className="text-lg" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                {hasActiveFilters 
                  ? "No alumni found matching your filters."
                  : "Use the filters above or click 'Show All Alumni' to explore alumni profiles."}
              </p>
              {hasActiveFilters && (
                <Button
                  variant="default"
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary/90"
                >
                  Reset Filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 