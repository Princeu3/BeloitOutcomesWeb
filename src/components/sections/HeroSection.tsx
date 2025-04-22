"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Sample statistics
const statistics = [
  { value: 93, suffix: "%", title: "Employed or in Grad School", description: "Within 6 months of graduation" },
  { value: 40, suffix: "+", title: "Countries Represented", description: "Global alumni network" },
  { value: 95, suffix: "%", title: "International Students with Aid", description: "Receive financial assistance" },
  { value: 35, suffix: "K", title: "Average International Scholarship", description: "Per year" },
];

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  
  const { ref: statsRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentStat((prev) => (prev + 1) % statistics.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onLoaded = () => setIsVideoLoading(false);
      video.addEventListener('loadeddata', onLoaded);
      const timer = window.setTimeout(() => setIsVideoLoading(false), 1200);
      return () => {
        video.removeEventListener('loadeddata', onLoaded);
        clearTimeout(timer);
      };
    }
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0, 1],
      }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0, 1],
      }
    })
  };

  return (
    <section id="hero" className="relative overflow-hidden h-[calc(100vh-64px)] flex items-center" ref={containerRef}>
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-gray-800/90">
        <div className={`absolute inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-500 ${isVideoLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="border-4 border-gray-200 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
        <video
          ref={videoRef}
          poster="/assets/hero_background.jpg"
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/hero-background.mp4" type="video/mp4" />
        </video>
        
        {/* Credits Overlay */}
        <div className="absolute bottom-4 right-4 text-white/70 text-sm font-light backdrop-blur-sm bg-black/20 px-3 py-1 rounded-md">
          Video by Alex Atou
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content overlay with glass effect */}
      <motion.div 
        style={{ y, opacity: contentOpacity }}
        className="container-custom relative z-10 py-16 md:py-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="backdrop-blur-sm bg-black/5 rounded-2xl p-6 md:p-8 border border-white/10"
          >
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-4"
                variants={headingVariants}
              >
                <motion.div 
                  className="relative w-12 h-12 md:w-14 md:h-14"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image 
                    src="/assets/Turtle 600px.png"
                    alt="Beloit College Turtle"
                    width={56}
                    height={56}
                    sizes="(max-width: 768px) 60vw, 24vw"
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white/90 leading-none"
                  variants={headingVariants}
                >
                  <span className="inline-block">Where</span>{" "}
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                    Beloit
                  </span>{" "}
                  <span className="inline-block">Takes You</span>
                </motion.h1>
              </motion.div>

              <motion.p 
                custom={1}
                variants={textRevealVariants}
                className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl font-light"
              >
                Explore the inspiring journeys of our graduates through internships, 
                careers, and advanced studies across the globe.
              </motion.p>

              <motion.div 
                custom={2}
                variants={textRevealVariants}
                className="flex flex-wrap gap-4"
              >
                <Button
                  asChild
                  className="group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium text-base transition-all transform hover:scale-105 hover:shadow-2xl border border-white/20"
                >
                  <a 
                    href="#career-outcomes"
                    aria-label="View detailed career outcomes"
                  >
                    <span className="relative z-10">Explore Outcomes</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-base transition-all transform hover:scale-105"
                >
                  <a 
                    href="https://www.beloit.edu/admission/request-info/"
                    aria-label="Contact Beloit College"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div ref={statsRef} className="text-white">
            <motion.div
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={variants}
              className="backdrop-blur-sm bg-black/5 rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <motion.h3 
                custom={3}
                variants={textRevealVariants}
                className="text-lg font-bold mb-4 text-white/90 tracking-wide"
              >
                Student Success Metrics
              </motion.h3>
              <motion.div 
                key={currentStat}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={statVariants}
                className="mb-6"
              >
                <h4 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/80">
                  {inView && (
                    <CountUp
                      start={0}
                      end={statistics[currentStat].value}
                      duration={2.5}
                      suffix={statistics[currentStat].suffix}
                    />
                  )}
                </h4>
                <p className="text-xl font-medium mb-2 text-white/90">
                  {statistics[currentStat].title}
                </p>
                <p className="text-white/70 text-sm leading-relaxed">
                  {statistics[currentStat].description}
                </p>
              </motion.div>
              <div className="flex gap-2">
                {statistics.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      currentStat === index 
                        ? "bg-white w-8" 
                        : "bg-white/30 w-1.5 hover:bg-white/50"
                    }`}
                    onClick={() => setCurrentStat(index)}
                    aria-label={`View ${statistics[index].title} statistic`}
                  ></motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 