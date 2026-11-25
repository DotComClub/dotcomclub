"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

import { anton, dmSans } from "@/fonts/font";
import { BackgroundCanvas } from "@/components/home/BackgroundCanvas";
import { Navbar } from "@/components/home/Navbar";
import { HeroCanvas } from "@/components/home/HeroCanvas";
import { RevealHeading } from "@/components/home/RevealHeading";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";

export interface LegalSectionItem {
  id: string;
  number: string;
  title: string;
  content: ReactNode;
}

export interface LegalRelatedLink {
  label: string;
  href: string;
  variant: "wh" | "ol";
}

interface LegalPageTemplateProps {
  badgeId: string;
  heroLine1: string;
  heroLine2: string;
  heroLabel: string;
  lastUpdated: string;
  heroDescription: string;
  marqueeItems: readonly string[];
  introBanner: ReactNode;
  summarySlot?: ReactNode;
  sections: LegalSectionItem[];
  bodyHeading?: string;
  closingText: string;
  relatedLinks: LegalRelatedLink[];
}

/**
 * Shared editorial layout for legal policy pages matching the homepage design system.
 */
export function LegalPageTemplate({
  badgeId,
  heroLine1,
  heroLine2,
  heroLabel,
  lastUpdated,
  heroDescription,
  marqueeItems,
  introBanner,
  summarySlot,
  sections,
  bodyHeading = "Policy Clauses",
  closingText,
  relatedLinks,
}: LegalPageTemplateProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const marqueeContent = (
    <div className="mq">
      {[...Array(2)].map((_, loopIdx) => (
        <span key={loopIdx} className="inline-flex">
          {marqueeItems.map((item, itemIdx) => (
            <span key={`${loopIdx}-${itemIdx}`}>
              <span>{item}</span>
              <span>●</span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );

  return (
    <div
      data-loaded={isLoaded ? "true" : "false"}
      className={`legal-root home-root ${isLoaded ? "go" : ""} ${anton.variable} ${dmSans.variable} bg-[var(--bg)] text-[var(--tx)] relative`}
    >
      {/* Background Organic Drift & Brush Canvas */}
      <BackgroundCanvas />

      {/* Editorial Navigation matching Homepage */}
      <Navbar />

      {/* Custom Comet Cursor (Desktop Only) */}
      <CustomCursor />

      {/* 1. Hero Section */}
      <header className="hero" id="hero">
        <HeroCanvas />

        {/* Rotating Circular Badge SVG */}
        <svg className="bdg" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path
              id={badgeId}
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fontSize="19"
            fontWeight="700"
            fill="#1B1030"
            fontFamily="DM Sans, sans-serif"
          >
            <textPath href={`#${badgeId}`} textLength="480" lengthAdjust="spacing">
              JAI HIND COLLEGE • EST. 2014 • TECH CLUB •
            </textPath>
          </text>
          <circle cx="100" cy="100" r="14" fill="#1B1030" />
        </svg>

        <div className="wrap">
          <h1 className="h1" aria-label={heroLabel}>
            <s>
              <i>{heroLine1}</i>
            </s>
            <s>
              <i>{heroLine2}</i>
            </s>
          </h1>

          <div className="c2">
            <span className="legal-updated">Last Updated: {lastUpdated}</span>
            <p>{heroDescription}</p>
            <div>
              <a className="btn dk" href="#table-of-contents">
                Table of Contents
              </a>
              <a className="btn ol" href="#legal-body">
                Read Clauses
              </a>
            </div>
          </div>
        </div>

        {/* Crossing Infinite Marquee Tapes */}
        <div className="tp t1" aria-hidden="true">
          {marqueeContent}
        </div>
        <div className="tp t2" aria-hidden="true">
          {marqueeContent}
        </div>
      </header>

      {/* 2. Lavender Notice & Table of Contents Band */}
      <section className="cnt" id="table-of-contents">
        <div className="wrap">
          <RevealHeading>Table of Contents</RevealHeading>

          <div className="legal-notice">{introBanner}</div>

          {summarySlot}

          <ol className="legal-toc">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`}>
                  <span className="legal-toc-num">{sec.number}</span>
                  <span>{sec.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Full Legal Clauses */}
      <section id="legal-body">
        <div className="wrap">
          <RevealHeading>{bodyHeading}</RevealHeading>

          <div className="space-y-6 max-w-5xl">
            {sections.map((sec) => (
              <article key={sec.id} id={sec.id} className="legal-card">
                <div className="legal-card-head">
                  <span className="legal-num">{sec.number}</span>
                  <h2>{sec.title}</h2>
                </div>
                {sec.content}
              </article>
            ))}

            <div className="legal-end">
              <h3>All Clear?</h3>
              <p>{closingText}</p>
              <div className="legal-end-actions">
                <Link href="/" className="btn dk">
                  Back to Home
                </Link>
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`btn ${link.variant}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Footer matching Homepage */}
      <FooterSection />
    </div>
  );
}
