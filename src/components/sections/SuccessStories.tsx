"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import Autoplay from "embla-carousel-autoplay";

const successStories = [
  {
    id: 1,
    name: "Vy Mai",
    image: "/alumni/vy-mai.jpg", // You'll need to add these images
    role: "Data Scientist Intern @ Apple",
    education: "MSDS Student @ NYU",
    year: 2022,
    quote: "Beloit's interdisciplinary approach combining economics and anthropology gave me unique insights into human-centered data science that sets me apart in the tech industry.",
    linkedin: "vy-mai",
    location: "New York, NY",
    achievement: "Published research in data science",
  },
  {
    id: 2,
    name: "Abdul Aziz",
    image: "/alumni/abdul-aziz.jpg",
    role: "Sr Analyst Software Engineer",
    education: "Northern Trust",
    year: 2022,
    quote: "Beloit's dual focus on computer science and economics gave me a unique perspective on applying AI and machine learning solutions to real-world business problems.",
    linkedin: "abdul-aziz",
    location: "Chicago, IL",
    achievement: "Led AI implementation project",
  },
  {
    id: 3,
    name: "Mahima Sharma",
    image: "/alumni/mahima-sharma.jpg",
    role: "Software Engineer II",
    education: "Microsoft",
    year: 2021,
    quote: "The personalized education and research opportunities at Beloit gave me the perfect foundation for my career in software engineering.",
    linkedin: "mahima-sharma",
    location: "Seattle, WA",
    achievement: "Microsoft Rising Star Award",
  },
  {
    id: 4,
    name: "Danielle Smith",
    image: "/alumni/danielle-smith.jpg",
    role: "Risk & Financial Advisory Analyst",
    education: "Deloitte",
    year: 2020,
    quote: "Beloit's quantitative economics program gave me the analytical foundation I needed to excel in both data analytics and sustainability consulting.",
    linkedin: "danielle-smith",
    location: "Chicago, IL",
    achievement: "Sustainability Project Lead",
  },
];

export default function SuccessStories() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Beloit alumni are making their mark in various industries
            around the world.
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {successStories.map((story) => (
              <CarouselItem key={story.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="relative overflow-hidden border-none shadow-lg bg-white/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full space-y-6">
                        {/* Quote and Background Pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
                        <FaQuoteLeft className="text-2xl text-primary/20 mb-2" />
                        
                        {/* Main Content */}
                        <div className="flex-grow">
                          <p className="text-gray-700 italic mb-6 line-clamp-4">
                            &quot;{story.quote}&quot;
                          </p>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-start space-x-4 pt-4 border-t border-gray-100">
                          <Avatar className="h-12 w-12 border-2 border-primary/10">
                            <AvatarImage src={story.image} alt={story.name} />
                            <AvatarFallback className="bg-primary/5 text-primary">
                              {story.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-grow">
                            <h4 className="font-semibold text-gray-900">{story.name}</h4>
                            <p className="text-sm text-gray-600">{story.role}</p>
                            <p className="text-sm text-gray-500">{story.education}</p>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10">
                                Class of {story.year}
                              </Badge>
                              <Badge variant="outline" className="text-gray-600">
                                {story.location}
                              </Badge>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            asChild
                          >
                            <a
                              href={`https://www.linkedin.com/in/${story.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedin className="h-5 w-5" />
                            </a>
                          </Button>
                        </div>

                        {/* Achievement Badge */}
                        <div className="absolute bottom-3 right-3">
                          <Badge variant="secondary" className="bg-primary/5 text-xs">
                            {story.achievement}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
} 