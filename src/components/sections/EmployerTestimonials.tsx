"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Technical Recruiting Manager",
    company: "Microsoft",
    avatar: "/employers/microsoft.png",
    quote: "Beloit graduates consistently demonstrate strong problem-solving abilities and adaptability. Their liberal arts foundation combined with technical skills makes them valuable assets to our engineering teams.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Senior Data Science Director",
    company: "Deloitte",
    avatar: "/employers/deloitte.png",
    quote: "The analytical thinking and cross-disciplinary approach that Beloit College instills in its students aligns perfectly with what we look for in our consulting practice.",
  },
  {
    id: 3,
    name: "Emily Patel",
    title: "Global Talent Acquisition Lead",
    company: "Apple",
    avatar: "/employers/apple.png",
    quote: "Beloit alumni bring a unique perspective to our teams. Their international exposure and ability to think globally while acting locally is exactly what we need in today's interconnected world.",
  },
];

// Partner logos with real company names
const partnerLogos = [
  { name: "ABC Supply Company", logo: "/employers/abc-supply.png" },
  { name: "Belen Partners", logo: "/employers/belen-partners.png" },
  { name: "Beloit Health Systems", logo: "/employers/beloit-health.png" },
  { name: "Beloit Sky Carp", logo: "/employers/sky-carp.png" },
  { name: "Corporate Contractors, Inc.", logo: "/employers/cci.png" },
  { name: "Duluth Trading Company", logo: "/employers/duluth.png" },
  { name: "Fairbanks Morse Defense", logo: "/employers/fmd.png" },
  { name: "First National Bank and Trust", logo: "/employers/fnbt.png" },
  { name: "Fitzgerald Asset Management", logo: "/employers/fitzgerald.png" },
  { name: "Forward Janesville", logo: "/employers/forward-janesville.png" },
  { name: "Geronimo Hospitality Group", logo: "/employers/geronimo.png" },
  { name: "Hendricks Commercial Properties", logo: "/employers/hendricks.png" },
  { name: "Hidden Creek Estates", logo: "/employers/hidden-creek.png" },
  { name: "Juiced!", logo: "/employers/juiced.png" },
  { name: "Kerry Ingredients", logo: "/employers/kerry.png" },
  { name: "Mid-States Concrete Industries", logo: "/employers/mid-states.png" },
  { name: "Rockford Icehogs", logo: "/employers/icehogs.png" },
  { name: "Savant Wealth Management", logo: "/employers/savant.png" }
];

export default function EmployerTestimonials() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16">
              <Image 
                src="/assets/Turtle 600px.png"
                alt="Beloit College Turtle"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-1"
          >
            Employer Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Why Leading Organizations Choose Beloit Grads
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why top employers consistently seek out and value Beloit College graduates.
          </p>
        </div>

        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
            >
              <div className="bg-light rounded-xl p-8 shadow-md h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6 flex-grow">
                  <svg
                    className="h-10 w-10 text-primary opacity-20 mb-4"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">{testimonial.quote}</p>
                </div>

                <div className="flex items-center">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary/10">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.company}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-light rounded-xl p-8 shadow-md">
          <h3 className="text-xl font-bold text-primary mb-8 text-center">
            Our Partner Organizations
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {partnerLogos.map((partner) => (
              <motion.div 
                key={partner.name} 
                className="bg-white rounded-lg p-4 h-20 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/5">
                    <span className="text-xs text-center text-gray-600 px-2">{partner.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 