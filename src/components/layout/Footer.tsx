"use client";

import React from "react";
import { Link } from "@heroui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Outcomes", href: "/outcomes" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Employers", href: "/employers" },
        { name: "Alumni Network", href: "/alumni" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Career Resources", href: "/resources" },
        { name: "Internships", href: "/internships" },
        { name: "Job Listings", href: "/jobs" },
        { name: "Graduate Schools", href: "/graduate-schools" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About Beloit", href: "https://www.beloit.edu/about/" },
        { name: "Career Works", href: "https://www.beloit.edu/offices/career-works/" },
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
      </div>

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6 group">
              <motion.div 
                className="relative w-12 h-12 mr-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src="/assets/B Logo Outside Stroke (1).png"
                  alt="Beloit College Logo"
                  width={48}
                  height={48}
                  className="object-contain drop-shadow-glow"
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">Outcomes</h3>
                <p className="text-sm text-gray-300">Discover Your Future</p>
              </div>
            </div>
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              Explore where a Beloit degree can take you. Discover the internships, jobs, and
              graduate schools our students pursue after graduation.
            </p>
            <div className="flex gap-5 mb-8">
              {[
                { Icon: FaFacebook, href: "https://www.facebook.com/BeloitCollege", label: "Facebook" },
                { Icon: FaTwitter, href: "https://twitter.com/BeloitCollege", label: "Twitter" },
                { Icon: FaInstagram, href: "https://www.instagram.com/beloitcollege/", label: "Instagram" },
                { Icon: FaLinkedin, href: "https://www.linkedin.com/school/beloit-college/", label: "LinkedIn" },
                { Icon: FaYoutube, href: "https://www.youtube.com/user/BeloitCollege", label: "YouTube" }
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label={label}
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              variants={itemVariants}
              custom={sectionIndex}
            >
              <h3 className="text-lg font-bold mb-6 text-secondary tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    variants={itemVariants}
                    custom={linkIndex}
                  >
                    <Link
                      href={link.href}
                      className="text-base text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
            &copy; {currentYear} Beloit College. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link
              href="https://www.beloit.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Beloit College Main Website
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/sitemap"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
} 