"use client";

import React, { useState, useEffect } from "react";
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
import { FiCalendar, FiBook, FiBriefcase, FiFilter, FiX } from "react-icons/fi";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    linkedin: "lanvymai",
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
    linkedin: "aziz16034",
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
    linkedin: "mahisha123",
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
    id: "kelly-harrison",
    name: "Kelly McLean Harrison",
    country: "USA",
    countryCode: "US",
    major: "Major at Beloit College: Economics",
    year: 2020,
    outcomeType: "Employment",
    employer: "MetLife",
    title: "Senior Underwriter",
    location: "Woodridge, Illinois",
    linkedin: "kelly-harrison-417201157",
    salary: "85000",
    skills: [
      "Data Analysis",
      "Social Media Marketing",
      "Underwriting",
      "ERP Systems"
    ],
    languages: ["English"],
    quote: "Beloit shaped both my analytical mindset and people skills—from basketball captain to analyst to underwriter."
  },
  {
    id: "sahil-rizal",
    name: "Sahil Rizal",
    country: "Pakistan",
    countryCode: "PK",
    major: "Major at Beloit College: Quantitative Economics",
    year: 2022,
    outcomeType: "Employment",
    employer: "Coherent Economics",
    title: "Senior Analyst",
    location: "College Station, Texas",
    linkedin: "sahilrizal",
    salary: "95000",
    skills: [
      "Stata",
      "R",
      "Regression Analysis",
      "Antitrust Litigation"
    ],
    languages: ["English"],
    quote: "Beloit gave me the confidence to turn raw data into arguments that win court cases."
  },
  {
    id: "matt-laszlo",
    name: "Matt Laszlo",
    country: "USA",
    countryCode: "US",
    major: "Major at Beloit College: Economics",
    year: 1992,
    outcomeType: "Employment",
    employer: "Beloit College",
    title: "Performance Coach, Executive-in-Residence",
    location: "United States",
    linkedin: "matt-laszlo-839a253b",
    salary: "N/A",
    skills: [
      "Organizational Development",
      "Consumer Product Strategy",
      "Coaching",
      "Executive Leadership"
    ],
    languages: ["English"],
    quote: "At Beloit, I learned leadership is about lifting others. Now I teach students to lead with empathy and impact."
  },
  {
    id: "silvija-martincevic",
    name: "Silvija Martincevic",
    country: "USA",
    countryCode: "US",
    major: "Triple Major at Beloit College: Economics and Management, International Relations, German",
    year: 2002,
    outcomeType: "Employment",
    employer: "Deputy",
    title: "CEO",
    location: "San Francisco, CA",
    linkedin: "silvija-martincevic",
    salary: "1000000",
    skills: [
      "E-commerce Strategy",
      "Fintech Leadership",
      "International Expansion",
      "Board Governance"
    ],
    languages: ["English", "German"],
    quote: "My journey from Beloit to building billion-dollar companies shows what's possible with a purpose-driven mindset."
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
    linkedin: "danielle-strejc-818101b4",
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
    linkedin: "sandeep-acharya-ph-d-83abb1b7",
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
    linkedin: "shambhaviupadhyaya",
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
    linkedin: "npkarnik",
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
    linkedin: "aaronbauhs",
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
    linkedin: "ankit00707",
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
const outcomeTypes = [
  "Employment",
  "Graduate School",
  "Self-employed",
  "Seeking Employment",
  "Other"
];

// More focused filter options
const graduationYears = [2024, 2023, 2022, 2021, 2020, 2019, 2002, 1992];
const majors = [
  "Computer Science",
  "Mathematics",
  "Economics",
  "Economics and Management",
  "International Relations",
  "German",
  "Anthropology",
  "Studio Art",
  "Theatre Arts",
  "Environmental Studies",
  "Business Economics",
  "Quantitative Economics"
];

// Define filter types
type FilterKeys = "year" | "major" | "outcomeType";

export default function OutcomesExplorer() {
  const [filters, setFilters] = useState<Record<FilterKeys, Set<string>>>({
    year: new Set([]),
    major: new Set([]),
    outcomeType: new Set([]),
  });
  
  const [filteredProfiles, setFilteredProfiles] = useState<typeof outcomeProfiles>([]);
  const [showAll, setShowAll] = useState(false);
  const hasActiveFilters = filters.year.size > 0 || filters.major.size > 0 || filters.outcomeType.size > 0;

  // Apply filters effect
  useEffect(() => {
    if (!hasActiveFilters && !showAll) {
      setFilteredProfiles([]);
      return;
    }

    const filteredResults = outcomeProfiles.filter((profile) => {
      const yearFilter = filters.year.size === 0 || filters.year.has(profile.year.toString());
      
      const majorFilter = filters.major.size === 0 || 
        Array.from(filters.major).some(selectedMajor => 
          profile.major.toLowerCase().includes(selectedMajor.toLowerCase())
        );

      const outcomeTypeFilter = filters.outcomeType.size === 0 ||
        filters.outcomeType.has(profile.outcomeType);
      
      return yearFilter && majorFilter && outcomeTypeFilter;
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
      outcomeType: new Set([]),
    });
  };

  // Toggle show all
  const handleShowAll = () => {
    setShowAll(true);
    setFilters({
      year: new Set([]),
      major: new Set([]),
      outcomeType: new Set([]),
    });
  };

  return (
    <section id="alumni-outcomes" className="py-12 bg-background">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl font-bold text-primary tracking-tight">Alumni Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Beloit graduates are making an impact globally through their diverse career paths and achievements.
          </p>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-8 shadow-md border-border/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiFilter className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Filter Alumni</h3>
                  <p className="text-sm text-muted-foreground">Refine results by year, major, or outcome type</p>
                </div>
              </div>
              {(hasActiveFilters || showAll) && (
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors gap-2"
                >
                  <FiX className="w-4 h-4" />
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year Filter */}
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FiCalendar className="w-4 h-4 text-primary" />
                  Graduation Year
                </label>
                <Select
                  onValueChange={(value: string) => handleFilterChange("year", value)}
                  value={Array.from(filters.year)[0] || ""}
                >
                  <SelectTrigger className="w-full bg-background border-input/50 hover:border-input focus:ring-1 focus:ring-ring/30 transition-all">
                    <SelectValue placeholder="Select year" />
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

              {/* Major Filter */}
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FiBook className="w-4 h-4 text-primary" />
                  Major
                </label>
                <Select
                  onValueChange={(value: string) => handleFilterChange("major", value)}
                  value={Array.from(filters.major)[0] || ""}
                >
                  <SelectTrigger className="w-full bg-background border-input/50 hover:border-input focus:ring-1 focus:ring-ring/30 transition-all">
                    <SelectValue placeholder="Select major" />
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

              {/* Outcome Type Filter */}
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <FiBriefcase className="w-4 h-4 text-primary" />
                  Outcome Type
                </label>
                <Select
                  onValueChange={(value: string) => handleFilterChange("outcomeType", value)}
                  value={Array.from(filters.outcomeType)[0] || ""}
                >
                  <SelectTrigger className="w-full bg-background border-input/50 hover:border-input focus:ring-1 focus:ring-ring/30 transition-all">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    {outcomeTypes.map((type) => (
                      <SelectItem 
                        key={type} 
                        value={type}
                        className="hover:bg-accent focus:bg-accent cursor-pointer transition-colors"
                      >
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
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
                {(hasActiveFilters || showAll) && (
                  <Badge variant="secondary" className="text-xs">
                    {showAll ? "Showing All" : `${Object.values(filters).reduce((acc, curr) => acc + curr.size, 0)} Active Filters`}
                  </Badge>
                )}
              </div>
              <Button
                variant="default"
                onClick={handleShowAll}
                size="sm"
                className={cn(
                  "bg-primary hover:bg-primary/90 transition-colors",
                  showAll && "bg-primary/90"
                )}
              >
                Show All Alumni
              </Button>
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