"use client";

import React from "react";
import { Carousel, Card } from '../ui/apple-cards-carousel';
import { FaLinkedin } from 'react-icons/fa';

interface AlumniProfile {
  name: string;
  headline: string;
  linkedinUrl: string;
  photoUrl: string;
  graduationYear: string;
  major: string;
  division: string;
  outcome: string;
  currentPosition: string;
  salary?: string;
  location: string;
  quote: string;
  keySkills: string[];
  careerPath: string;
  languages?: string[];
  awards?: string[];
  education?: string;
  currentImpact?: string;
}

const alumniProfiles: AlumniProfile[] = [
  {
    name: "Vy Mai",
    headline: "Data Scientist Intern @ Apple | MSDS Student @ NYU",
    linkedinUrl: "https://www.linkedin.com/in/lanvymai/",
    photoUrl: "/alumni/vy-mai.png",
    graduationYear: "2022",
    major: "Quantitative Economics and Anthropology",
    division: "Division of Social Sciences",
    outcome: "Dual Outcome: Employment & Further Education",
    currentPosition: "Incoming Data Scientist Intern @ Apple | MSDS Student @ NYU",
    salary: "$130,000 (estimated)",
    location: "New York, NY",
    quote: "Beloit's interdisciplinary approach combining economics and anthropology gave me unique insights into human-centered data science that sets me apart in the tech industry.",
    keySkills: [
      "Microsoft Azure Machine Learning",
      "Data Analytics",
      "Microsoft Power BI",
      "Customer Research"
    ],
    careerPath: "Vy's journey began with multiple leadership roles at Beloit College, including Senior Class Officer and Teaching Assistant for Quantitative Economics & Econometrics. Her professional experience includes internships at Vietcetera Media and research positions at TruStage, where she worked on marketing campaign ML models.",
    languages: ["English (Native)", "Vietnamese (Native)"],
    awards: [
      "Presidential Scholarship",
      "Global Scholars Award",
      "Dean's List (All Semesters)",
      "Honors Term Recipient"
    ]
  },
  {
    name: "Abdul Aziz",
    headline: "Sr Analyst Software Engineer @ Northern Trust",
    linkedinUrl: "https://www.linkedin.com/in/aziz16034/",
    photoUrl: "/alumni/abdul-aziz.jpeg",
    graduationYear: "2022",
    major: "Computer Science (BS) & Business/Managerial Economics (BA)",
    division: "Divisions of Natural Sciences and Social Sciences",
    outcome: "Employment",
    currentPosition: "Sr Analyst Software Engineer | AI & Machine Learning @ Northern Trust",
    salary: "$110,000",
    location: "Chicago, IL",
    quote: "Beloit's dual focus on computer science and economics gave me a unique perspective on applying AI and machine learning solutions to real-world business problems in the financial sector.",
    keySkills: [
      "Large Language Models (LLM)",
      "Large Language Model Operations (LLMOps)",
      "LangChain",
      "NLP & Machine Learning"
    ],
    careerPath: "Abdul held various positions during his time at Beloit, including Programming Intern at the Center for Entrepreneurship and Office Assistant at Upward Bound. His professional journey included internships at American Family Insurance, CACI International, and Seedstages before joining Northern Trust.",
    languages: ["English (Full Professional)", "Urdu (Native)", "Punjabi", "Arabic", "Persian (Limited Working)"],
    awards: [
      "Presidential Scholar",
      "Microsoft Certified: Azure Data Scientist Associate",
      "Neo4j Graph Data Science Certification"
    ],
    currentImpact: "Developing AI solutions for financial services, implementing NLP technologies, and advancing MLOps practices at Northern Trust."
  },
  {
    name: "Danielle Strejc",
    headline: "Previously Risk & Financial Advisory Analyst @ Deloitte",
    linkedinUrl: "#",
    photoUrl: "/alumni/danielle-strejc.jpeg",
    graduationYear: "2020",
    major: "Quantitative Economics",
    division: "Division of Social Sciences",
    outcome: "Dual Outcome: Further Education & Employment",
    currentPosition: "Currently seeking next opportunity (Previously Risk & Financial Advisory Analyst @ Deloitte)",
    salary: "$85,000 (at Deloitte)",
    location: "Greater Chicago Area",
    quote: "Beloit's quantitative economics program gave me the analytical foundation I needed to excel in both data analytics and sustainability consulting.",
    keySkills: [
      "Data Visualization",
      "SQL",
      "Google BigQuery",
      "Sustainability Analytics"
    ],
    careerPath: "After graduating from Beloit, Danielle pursued an MS in Business Analytics from UIC while working as a Graduate Teaching Assistant. She completed a Data Science Internship at ComEd before joining Deloitte.",
    education: "MS in Business Analytics, University of Illinois at Chicago (2021)",
    currentImpact: "Her recent work at Deloitte focused on developing dashboards using Google's Looker and Big Query to provide business teams with data-driven insights, particularly in sustainability contexts."
  },
  {
    name: "Kelly McLean Harrison",
    headline: "Senior Underwriter at MetLife",
    linkedinUrl: "https://www.linkedin.com/in/kelly-harrison-417201157",
    photoUrl: "/alumni/kelly-mclean.webp",
    graduationYear: "2020",
    major: "Economics",
    division: "Division of Social Sciences",
    outcome: "Dual Outcome: Further Education & Employment",
    currentPosition: "Senior Underwriter at MetLife",
    salary: "$80,000–$90,000 (estimated based on industry avg.)",
    location: "Woodridge, Illinois, United States",
    quote: "Beloit shaped both my analytical mindset and people skills—from basketball captain to analyst to underwriter.",
    keySkills: [
      "Data Analysis",
      "Social Media Marketing",
      "Underwriting",
      "ERP Systems"
    ],
    careerPath: "Started as a Brand Marketing Intern at Kerry, transitioned into Data Analyst at Wurkwel Ventures, then joined MetLife as Underwriter and was promoted to Senior Underwriter.",
    education: "Bachelor of Arts in Economics, Beloit College (2020)",
    currentImpact: "Kelly now helps businesses assess and manage risk as a Senior Underwriter at MetLife, applying both data analytics and financial acumen."
  },
  {
    name: "Sahil Rizal",
    headline: "Senior Analyst at Coherent Economics",
    linkedinUrl: "https://www.linkedin.com/in/sahilrizal",
    photoUrl: "/alumni/sahil-rizal.webp",
    graduationYear: "2022",
    major: "Quantitative Economics",
    division: "Division of Social Sciences",
    outcome: "Full-Time Employment",
    currentPosition: "Senior Analyst at Coherent Economics",
    salary: "$90,000–$100,000 (estimated)",
    location: "College Station, Texas",
    quote: "Beloit gave me the confidence to turn raw data into arguments that win court cases.",
    keySkills: [
      "Stata",
      "R",
      "Regression Analysis",
      "Antitrust Litigation"
    ],
    careerPath: "Started as a Quantitative Research Analyst at Beloit, worked with the City of Beloit and the college's research office. Joined Coherent Economics in 2023 and was promoted to Senior Analyst in 2025.",
    education: "BA in Quantitative Economics, Minor in Math, Beloit College (2022)",
    currentImpact: "Sahil supports expert witnesses in litigation cases, using data to develop econometric evidence in antitrust and IP disputes."
  },
  {
    name: "Matt Laszlo",
    headline: "Executive-in-Residence and Former SVP/CCO at Clorox",
    linkedinUrl: "https://www.linkedin.com/in/matt-laszlo-839a253b",
    photoUrl: "/alumni/matt-lazlo.jpeg",
    graduationYear: "1992",
    major: "Economics",
    division: "Division of Social Sciences",
    outcome: "Leadership & Giving Back",
    currentPosition: "Performance Coach, Executive-in-Residence at Beloit College",
    salary: "N/A (Former CCO @ Clorox)",
    location: "United States",
    quote: "At Beloit, I learned leadership is about lifting others. Now I teach students to lead with empathy and impact.",
    keySkills: [
      "Organizational Development",
      "Consumer Product Strategy",
      "Coaching",
      "Executive Leadership"
    ],
    careerPath: "Spent 14 years at Clorox, rising to SVP & Chief Customer Officer. Transitioned into consulting and coaching. Now teaches popular business classes and advises student marketing clubs.",
    education: "BA in Economics, Beloit College (1992)",
    currentImpact: "Matt mentors students and teaches Marketing Strategy and Career Navigation, while helping shape real-world projects with alumni partners and local companies."
  },
  {
    name: "Silvija Martincevic",
    headline: "CEO @ Deputy | Former CCO @ Affirm | Board Director @ Kiva, Lemonade",
    linkedinUrl: "https://www.linkedin.com/in/silvija-martincevic",
    photoUrl: "/alumni/silvija-martincevic.png",
    graduationYear: "2002",
    major: "Economics and Management, International Relations, German",
    division: "Division of Social Sciences & Global Studies",
    outcome: "C-Suite Leadership",
    currentPosition: "CEO at Deputy",
    salary: "$1M+ (Estimated total compensation)",
    location: "San Francisco, CA",
    quote: "My journey from Beloit to building billion-dollar companies shows what's possible with a purpose-driven mindset.",
    keySkills: [
      "E-commerce Strategy",
      "Fintech Leadership",
      "International Expansion",
      "Board Governance"
    ],
    careerPath: "Founded and sold Zenna Financial Services. Then held senior roles at Groupon and Affirm, scaling revenue from $100M to $1.3B. Now CEO at Deputy, a global SaaS company.",
    education: "BA in Economics, Beloit College (2002); MBA in Econometrics and Statistics, University of Chicago Booth",
    currentImpact: "Silvija leads a company supporting over 1.3 million shift workers globally while advising nonprofits expanding financial access and equity."
  },
  {
    name: "Ankit Dahiya",
    headline: "Analyst at Wells Fargo",
    linkedinUrl: "#",
    photoUrl: "/alumni/ankit-dahiya.webp",
    graduationYear: "2024",
    major: "Quantitative Economics and Environmental Studies",
    division: "Division of Social Sciences",
    outcome: "Employment",
    currentPosition: "Analyst at Wells Fargo",
    salary: "$85,000",
    location: "United States",
    quote: "Beloit's blend of quantitative economics and environmental studies gave me the analytical skills and interdisciplinary perspective that helps me stand out in the financial sector.",
    keySkills: [
      "Energy Sector Analysis",
      "Equity Research",
      "Financial Market Research",
      "Data Analytics"
    ],
    careerPath: "Started as a Quantitative Research Analyst at Beloit, worked with the City of Beloit and the college's research office. Now applying his unique blend of quantitative and environmental expertise at Wells Fargo.",
    education: "BA in Quantitative Economics and Environmental Studies, Beloit College (2024)",
    currentImpact: "Ankit combines his environmental studies background with financial analysis to contribute to sustainable finance initiatives at Wells Fargo."
  }
];

const AlumniCard: React.FC<{ profile: AlumniProfile; index: number }> = ({ profile, index }) => {
  const cardContent = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl font-bold">{profile.graduationYear} Graduate</p>
          <p className="text-lg">{profile.major}</p>
          <p className="text-gray-600">{profile.division}</p>
        </div>
        <a 
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <FaLinkedin size={24} />
        </a>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-bold">Current Position</h3>
          <p>{profile.currentPosition}</p>
          {profile.salary && <p className="text-gray-600">{profile.salary}</p>}
          <p className="text-gray-600">{profile.location}</p>
        </div>

        <blockquote className="border-l-4 border-gray-300 pl-4 italic">
          {profile.quote}
        </blockquote>

        <div>
          <h3 className="font-bold">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.keySkills.map((skill, i) => (
              <span 
                key={i}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold">Career Path</h3>
          <p>{profile.careerPath}</p>
        </div>

        {profile.languages && (
          <div>
            <h3 className="font-bold">Languages</h3>
            <p>{profile.languages.join(", ")}</p>
          </div>
        )}

        {profile.awards && (
          <div>
            <h3 className="font-bold">Awards & Recognition</h3>
            <ul className="list-disc list-inside">
              {profile.awards.map((award, i) => (
                <li key={i}>{award}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.currentImpact && (
          <div>
            <h3 className="font-bold">Current Impact</h3>
            <p>{profile.currentImpact}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card
      card={{
        src: profile.photoUrl,
        title: profile.name,
        category: profile.headline,
        content: cardContent
      }}
      index={index}
      layout={true}
    />
  );
};

export default function SuccessStories() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Beloit alumni are making their mark in various industries
            around the world.
          </p>
        </div>

        <div className="w-full">
          <Carousel 
            items={alumniProfiles.map((profile, index) => (
              <AlumniCard key={index} profile={profile} index={index} />
            ))} 
          />
        </div>
      </div>
    </section>
  );
} 