"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/#hero" },
  { name: "Success Stories", href: "/#success-stories" },
  { name: "Employers", href: "/#employers" },
  { name: "Alumni", href: "/#alumni-outcomes" },
];

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({ 
      x: 0, 
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: { 
      x: -10, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <Navbar 
        onMenuOpenChange={setIsMenuOpen} 
        isMenuOpen={isMenuOpen} 
        maxWidth="xl" 
        className={`${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg" 
            : "bg-white"
        } transition-all duration-500 border-b border-gray-200/50 h-16 fixed top-0 w-full z-50`}
        shouldHideOnScroll={false}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden scale-90"
          />
          <NavbarBrand>
            <Link 
              href="/" 
              className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-[52px] w-[240px]">
                <Image
                  src="/assets/Wordmark Blue.png"
                  alt="Beloit College"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  priority
                  className="max-h-full"
                />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-8" justify="center">
          {navItems.map((item) => (
            <NavbarItem 
              key={item.name} 
              isActive={pathname === item.href}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium relative py-1.5 px-1 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
                {(pathname === item.href || hoveredItem === item.name) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button 
              asChild
              className="bg-primary text-white hover:opacity-90 transition-all transform hover:scale-105 duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-md hover:shadow-lg active:scale-95"
              size="default"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>

        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <NavbarMenu className="pt-4 bg-white/95 backdrop-blur-md">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                >
                  <NavbarMenuItem>
                    <Link
                      href={item.href}
                      className={`w-full text-base focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-300 ${
                        pathname === item.href
                          ? "font-medium text-primary"
                          : "text-gray-600 hover:text-primary active:scale-95 transform"
                      }`}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        setIsMenuOpen(false);
                      }}
                    >
                      {item.name}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="mobile-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </NavbarMenuItem>
                </motion.div>
              ))}
              <motion.div
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={navItems.length}
              >
                <NavbarMenuItem className="mt-4">
                  <Button 
                    asChild
                    className="w-full bg-primary text-white hover:opacity-90 transition-all focus-visible:ring-0 focus-visible:ring-offset-0 shadow-md hover:shadow-lg active:scale-95"
                    size="default"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </NavbarMenuItem>
              </motion.div>
            </NavbarMenu>
          )}
        </AnimatePresence>
      </Navbar>
    </motion.div>
  );
} 