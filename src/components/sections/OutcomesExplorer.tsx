"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

// Sample student outcomes data
const outcomeProfiles = [
  {
    id: 1,
    name: "Vy Mai",
    country: "Vietnam",
    countryCode: "VN",
    major: "Quantitative Economics and Anthropology",
    year: 2022,
    outcomeType: "Dual Outcome",
    employer: "Apple",
    title: "Data Scientist Intern | MSDS Student @ NYU",
    location: "New York, NY",
    linkedin: "vy-mai",
    citizenship: "International",
    division: "Social Sciences",
  },
  {
    id: 2,
    name: "Abdul Aziz",
    country: "Pakistan",
    countryCode: "PK",
    major: "Computer Science & Business Economics",
    year: 2022,
    outcomeType: "Employment",
    employer: "Northern Trust",
    title: "Sr Analyst Software Engineer",
    location: "Chicago, IL",
    linkedin: "abdul-aziz",
    citizenship: "International",
    division: "Natural Sciences",
  },
  {
    id: 3,
    name: "Mahima Sharma",
    country: "India",
    countryCode: "IN",
    major: "Mathematics and Computer Science",
    year: 2021,
    outcomeType: "Employment",
    employer: "Microsoft",
    title: "Software Engineer II",
    location: "Seattle, WA",
    linkedin: "mahima-sharma",
    citizenship: "International",
    division: "Natural Sciences",
  },
  {
    id: 4,
    name: "Danielle Smith",
    country: "USA",
    countryCode: "US",
    major: "Quantitative Economics",
    year: 2020,
    outcomeType: "Employment",
    employer: "Deloitte",
    title: "Risk & Financial Advisory Analyst",
    location: "Chicago, IL",
    linkedin: "danielle-smith",
    citizenship: "Domestic",
    division: "Social Sciences",
  },
  {
    id: 5,
    name: "Sandeep Acharya",
    country: "Nepal",
    countryCode: "NP",
    major: "Computer Science and Mathematics",
    year: 2019,
    outcomeType: "Employment",
    employer: "Washington University",
    title: "Computational Biologist",
    location: "St. Louis, MO",
    linkedin: "sandeep-acharya",
    citizenship: "International",
    division: "Natural Sciences",
  },
  {
    id: 6,
    name: "Shambhavi Mishra",
    country: "India",
    countryCode: "IN",
    major: "Mathematics and Studio Art",
    year: 2019,
    outcomeType: "Self-employed",
    employer: "Self-employed Artist",
    title: "Professional Artist",
    location: "Mumbai, India",
    linkedin: "shambhavi-mishra",
    citizenship: "International",
    division: "Arts & Humanities",
  },
  {
    id: 7,
    name: "Nach Karnik",
    country: "India",
    countryCode: "IN",
    major: "Economics & Management and Theatre Arts",
    year: 2008,
    outcomeType: "Employment",
    employer: "Boston Consulting Group",
    title: "Project Leader",
    location: "St. Paul, MN",
    linkedin: "nach-karnik",
    citizenship: "International",
    division: "Social Sciences",
  },
  {
    id: 8,
    name: "Aaron Johnson",
    country: "USA",
    countryCode: "US",
    major: "Studio Art & Business Administration",
    year: 2005,
    outcomeType: "Employment",
    employer: "IBM",
    title: "Partner",
    location: "Chicago, IL",
    linkedin: "aaron-johnson",
    citizenship: "Domestic",
    division: "Arts & Humanities",
  },
  {
    id: 9,
    name: "Ankit Patel",
    country: "India",
    countryCode: "IN",
    major: "Quantitative Economics and Environmental Studies",
    year: 2024,
    outcomeType: "Employment",
    employer: "Wells Fargo",
    title: "Analyst",
    location: "United States",
    linkedin: "ankit-patel",
    citizenship: "International",
    division: "Social Sciences",
  }
];

// Filter options
const graduationYears = [2024, 2022, 2021, 2020, 2019, 2008, 2005];
const majors = [
  "Quantitative Economics and Anthropology",
  "Computer Science & Business Economics",
  "Mathematics and Computer Science",
  "Quantitative Economics",
  "Mathematics and Studio Art",
  "Economics & Management and Theatre Arts",
  "Studio Art & Business Administration",
  "Quantitative Economics and Environmental Studies"
];
const divisions = ["Social Sciences", "Natural Sciences", "Arts & Humanities"];
const outcomeTypes = ["Employment", "Dual Outcome", "Self-employed"];
const citizenshipTypes = ["Domestic", "International"];

// Define filter types
type FilterKeys = "year" | "major" | "division" | "outcomeType" | "citizenship";

export default function OutcomesExplorer() {
  const [filters, setFilters] = useState<Record<FilterKeys, Set<string>>>({
    year: new Set([]),
    major: new Set([]),
    division: new Set([]),
    outcomeType: new Set([]),
    citizenship: new Set([]),
  });
  
  const [filteredProfiles, setFilteredProfiles] = useState(outcomeProfiles);

  // Apply filters effect
  useEffect(() => {
    const filteredResults = outcomeProfiles.filter((profile) => {
      // Return true if no filters of this type are selected, or if profile matches any selected filter
      const yearFilter = filters.year.size === 0 || filters.year.has(profile.year.toString());
      const majorFilter = filters.major.size === 0 || filters.major.has(profile.major);
      const divisionFilter = filters.division.size === 0 || filters.division.has(profile.division);
      const outcomeTypeFilter = filters.outcomeType.size === 0 || filters.outcomeType.has(profile.outcomeType);
      const citizenshipFilter = filters.citizenship.size === 0 || filters.citizenship.has(profile.citizenship);
      
      return yearFilter && majorFilter && divisionFilter && outcomeTypeFilter && citizenshipFilter;
    });
    
    setFilteredProfiles(filteredResults);
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (filterType: FilterKeys, value: Set<string>) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      year: new Set([]),
      major: new Set([]),
      division: new Set([]),
      outcomeType: new Set([]),
      citizenship: new Set([]),
    });
  };

  return (
    <section className="py-12 bg-light">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 text-primary">Alumni Outcomes</h2>
          <p className="text-gray-600">
            Explore where Beloit graduates are making their mark around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            <Select
              label="Year"
              placeholder="Filter by year"
              selectionMode="multiple"
              selectedKeys={filters.year}
              onSelectionChange={(keys) => handleFilterChange("year", keys as Set<string>)}
            >
              {graduationYears.map((year) => (
                <SelectItem key={year.toString()} value={year}>
                  {year}
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label="Major"
              placeholder="Filter by major"
              selectionMode="multiple"
              selectedKeys={filters.major}
              onSelectionChange={(keys) => handleFilterChange("major", keys as Set<string>)}
            >
              {majors.map((major) => (
                <SelectItem key={major} value={major}>
                  {major}
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label="Division"
              placeholder="Filter by division"
              selectionMode="multiple"
              selectedKeys={filters.division}
              onSelectionChange={(keys) => handleFilterChange("division", keys as Set<string>)}
            >
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label="Outcome"
              placeholder="Filter by outcome"
              selectionMode="multiple"
              selectedKeys={filters.outcomeType}
              onSelectionChange={(keys) => handleFilterChange("outcomeType", keys as Set<string>)}
            >
              {outcomeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label="Citizenship"
              placeholder="Filter by citizenship"
              selectionMode="multiple"
              selectedKeys={filters.citizenship}
              onSelectionChange={(keys) => handleFilterChange("citizenship", keys as Set<string>)}
            >
              {citizenshipTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredProfiles.length} alumni
            </p>
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-primary hover:text-primary/90"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card key={profile.id} className="group bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                <CardBody className="p-5">
                  <div className="space-y-4">
                    {/* Header Section */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {profile.name}
                        </h3>
                        <div className="flex items-center gap-4">
                          <Image
                            src={`https://flagcdn.com/32x24/${profile.countryCode.toLowerCase()}.png`}
                            alt={`${profile.country} flag`}
                            width={32}
                            height={24}
                            className="rounded-sm"
                          />
                          <div>
                            <p className="text-sm text-gray-600">{profile.major}, {profile.year}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Career Section */}
                    <div>
                      <Chip
                        color={profile.outcomeType === "Employment" ? "primary" : 
                               profile.outcomeType === "Dual Outcome" ? "secondary" : "success"}
                        variant="flat"
                        size="sm"
                        className="mb-2"
                      >
                        {profile.outcomeType}
                      </Chip>
                      
                      <div className="text-sm space-y-1">
                        <p className="font-medium text-gray-900">{profile.employer}</p>
                        <p className="text-gray-600">{profile.title}</p>
                        <p className="text-gray-500">{profile.location}</p>
                      </div>
                    </div>
                    
                    {/* LinkedIn Button */}
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-blue-100 
                                 hover:border-blue-200 transition-all duration-300 rounded-full group-hover:shadow-sm"
                        asChild
                      >
                        <a
                          href={`https://www.linkedin.com/in/${profile.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <FaLinkedin className="text-lg" />
                          <span>Connect</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-600 mb-4">No results match your filters.</p>
              <Button
                variant="default"
                onClick={clearFilters}
                className="bg-primary hover:bg-primary/90 rounded-full"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 