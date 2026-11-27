"use client";
import { satoshi } from "@/fonts/font";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HoverBorderGradient } from "./hover-border-gradient";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Blogs",
    link: "/blogs",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Sponsors",
    link: "/sponsors",
  },
  {
    name: "Teams",
    link: "/teams",
  },
  {
    name: "Magazines",
    link: "/magazines",
  },
  {
    name: "Contact",
    link: "/contact-us",
  },
  {
    name: "E-waste",
    link: "/ewaste-26",
  },
  {
    name: "Events",
    link: "/events",
  }
];

export const FloatingNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (
    pathname?.startsWith("/cyberstrike-26") ||
    pathname?.startsWith("/events") ||
    pathname === "/ewaste-26" ||
    pathname?.startsWith("/ewaste") ||
    pathname === "/register" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy-policy" ||
    pathname === "/refund-policy"
  )
    return null;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="main-navbar"
          initial={false}
          animate={{
            y: 0,
            opacity: 1,
          }}
          style={{ position: "fixed", top: 20, zIndex: 6000 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit fixed top-5 inset-x-0 mx-auto border border-border rounded-full bg-background z-[5000] shadow-[0px_0px_20px_2px_var(--primary)]/20",
            isMobile ? "pr-4 pl-4 py-3" : "pr-2 pl-8 py-2",
            "items-center justify-center space-x-4",
            className,
            satoshi.className
          )}
        >
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {navItems.map((navItem, idx: number) => (
                <Link
                  key={`link-${navItem.name}-${idx}`}
                  href={navItem.link}
                  prefetch={true}
                  className={cn(
                    "relative items-center flex space-x-1 text-foreground transition-colors duration-300 group"
                  )}
                >
                  <span className="text-sm relative z-10 group-hover:text-primary/50 transition-colors duration-300">
                    {navItem.name}
                  </span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-primary"
                    initial={{ width: 0, opacity: 0 }}
                    whileHover={{
                      width: "100%",
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                  />
                  {/* Glowing background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{
                      scale: 1.1,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  />
                </Link>
              ))}
              <Link href={"/cyberstrike-25"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <HoverBorderGradient className="text-sm font-medium relative text-foreground px-4 py-2 rounded-full">
                    <span>Cyberstrike 25</span>
                  </HoverBorderGradient>
                </motion.div>
              </Link>
            </>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <>
              {/* Register button always visible on mobile */}
              <Link href={"/cyberstrike-25"}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <HoverBorderGradient className="text-sm font-medium relative text-foreground px-4 py-2 rounded-full">
                    <span>Cyberstrike 25</span>
                  </HoverBorderGradient>
                </motion.div>
              </Link>
              {/* Mobile menu button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary-lighter transition-colors"
                aria-label="Toggle menu"
                whileHover={{
                  scale: 1.1,
                  rotate: mobileMenuOpen ? 0 : 90,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </motion.button>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-dropdown"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed top-24 inset-x-4 mx-auto max-w-sm bg-background border border-border rounded-2xl z-[4999] shadow-lg",
                satoshi.className
              )}
            >
              <div className="p-4 space-y-3">
                {navItems.map((navItem, idx: number) => (
                  <Link
                    key={`mobile-link-${navItem.name}-${idx}`}
                    href={navItem.link}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left px-4 py-3 text-sm text-foreground rounded-lg transition-all duration-200 relative group overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                      {navItem.name}
                    </span>
                    {/* Sliding background */}
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Left border accent */}
                    <motion.div
                      className="absolute left-0 top-0 h-full w-1 bg-primary"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{
                        duration: 0.2,
                        ease: "easeOut"
                      }}
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
