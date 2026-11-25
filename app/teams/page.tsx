"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/home/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";
import { anton, dmSans } from "@/fonts/font";
import { TEAM_CARDS, TEAM_NAMES } from "@/lib/teams-roster";

const CLUB_SOCIALS = {
  ig: "https://www.instagram.com/dotcomclubjhc/",
  li: "https://www.linkedin.com/company/dotcomclub/",
};

const CARD_CATEGORY_ORDER = {
  heads: 0,
  subheads: 1,
  group: 2,
};

const STATEMENT_TEXT = "Innovate. Create. Collaborate. Every idea at DCC starts with a team that cares.";
const STATEMENT_WORDS = STATEMENT_TEXT.split(" ");

export default function TeamsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Core");
  const [statementProgress, setStatementProgress] = useState(0);

  const statementRef = useRef<HTMLParagraphElement>(null);

  const allMembers = useMemo(() => {
    const teamOrder = new Map<string, number>();
    TEAM_NAMES.forEach((team, index) => teamOrder.set(team, index));

    return [...TEAM_CARDS].sort((left, right) => {
      const teamDifference =
        (teamOrder.get(left.team) ?? TEAM_NAMES.length) -
        (teamOrder.get(right.team) ?? TEAM_NAMES.length);
      if (teamDifference !== 0) return teamDifference;

      return (
        CARD_CATEGORY_ORDER[left.category] -
        CARD_CATEGORY_ORDER[right.category]
      );
    });
  }, []);

  const filterTabs = useMemo(() => {
    return [...TEAM_NAMES, "All"];
  }, []);

  const marqueeTeams = useMemo(() => {
    return TEAM_NAMES;
  }, []);

  const visibleCardsCount = useMemo(() => {
    if (activeFilter === "All") return allMembers.length;
    return allMembers.filter((m) => m.team === activeFilter).length;
  }, [activeFilter, allMembers]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 40);

    // Heading text reveals (.rv)
    const revealEls = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    revealEls.forEach((el) => io.observe(el));

    // Scroll listener for dynamic navbar theme & statement highlight
    const nav = document.querySelector<HTMLElement>("nav");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("header, section, footer")
    );
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const diff = y - lastY;
      if (nav) {
        nav.classList.toggle("at", y < 24);
        if (Math.abs(diff) > 6) {
          nav.classList.toggle("hide", diff > 0 && y > 220);
          lastY = y;
        }

        // Section colour theme
        let theme: "p" | "l" | "d" = "d";
        sections.forEach((s) => {
          const r = s.getBoundingClientRect();
          if (r.top <= 32 && r.bottom > 32) {
            if (s.matches(".hero, .cta")) theme = "p";
            else if (s.matches(".cnt")) theme = "l";
            else theme = "d";
          }
        });
        nav.dataset.t = theme;
      }

      // Statement word-by-word highlight progress
      if (statementRef.current) {
        const rect = statementRef.current.getBoundingClientRect();
        const q = (window.innerHeight * 0.82 - rect.top) / (rect.height + window.innerHeight * 0.2);
        const clamped = Math.max(0, Math.min(1, q));
        setStatementProgress(clamped);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(timer);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`teams-root home-root ${isLoaded ? "go" : ""} ${anton.variable} ${dmSans.variable}`}
    >
      <Navbar />
      <CustomCursor />

      {/* ── HERO SECTION (Normal Solid Background - NO Animation) ───────── */}
      <header className="hero" id="hero">
        {/* Rotating badge */}
        <svg className="bdg" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path
              id="cp"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fontSize="19"
            fontWeight="700"
            fill="#1B1030"
            fontFamily="DM Sans,sans-serif"
          >
            <textPath href="#cp" textLength="480" lengthAdjust="spacing">
              JAI HIND COLLEGE • EST. 2014 • TECH CLUB •
            </textPath>
          </text>
          <circle cx="100" cy="100" r="14" fill="#1B1030" />
        </svg>

        <div className="wrap">
          <h1 className="h1 tm" aria-label="Meet the team.">
            <s>
              <i>Meet the</i>
            </s>
            <s>
              <i>
                Team<b className="od" />
              </i>
            </s>
          </h1>
          <div className="c2">
            <p>The people behind DCC&apos;s innovation and success.</p>
            <a className="btn dk" href="#squad">
              Meet the squad
            </a>
          </div>
        </div>

        {/* Crossing marquee tapes with team names */}
        <div className="tp t1" aria-hidden="true">
          <div className="mq">
            {[...Array(4)].flatMap((_, i) =>
              marqueeTeams.map((t, j) => (
                <span key={`mq1-${i}-${j}`}>
                  <span>{t}</span>
                  <span>●</span>
                </span>
              ))
            )}
          </div>
        </div>
        <div className="tp t2" aria-hidden="true">
          <div className="mq">
            {[...Array(4)].flatMap((_, i) =>
              marqueeTeams.map((t, j) => (
                <span key={`mq2-${i}-${j}`}>
                  <span>{t}</span>
                  <span>●</span>
                </span>
              ))
            )}
          </div>
        </div>
      </header>

      {/* ── FILTER + THE SQUAD GRID SECTION ──────────────────────────────── */}
      <section id="squad">
        <div className="wrap">
          <h2 className="hd rv">
            <span className="ln">
              <i>The Squad</i>
            </span>
          </h2>

          {/* Filter Pills */}
          <div className="fl" role="group" aria-label="Filter team members by team">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className="pill"
                aria-pressed={activeFilter === tab}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Member Count Announcement */}
          <p className="fcnt" aria-live="polite">
            Showing {visibleCardsCount}{" "}
            {visibleCardsCount === 1 ? "card" : "cards"}
            {activeFilter === "All" ? "" : ` from ${activeFilter}`}
          </p>

          {/* Members Grid */}
          <div className="grid">
            {allMembers.map((member) => {
              const isMatch = activeFilter === "All" || member.team === activeFilter;
              return (
                <article
                  key={member.id}
                  className={`person ${!isMatch ? "out" : ""}`}
                  hidden={!isMatch}
                  data-team={member.team}
                  data-category={member.category}
                >
                  <div className="pw">
                    <div className="poster">
                      <Image
                        src={member.image}
                        alt={`${member.team} ${member.category === "group" ? "all-members group photo" : `${member.category} poster`} with names and positions`}
                        fill
                        sizes="(max-width: 639px) 44vw, (max-width: 999px) 30vw, 22vw"
                        quality={75}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATEMENT (WORD-BY-WORD SCROLL HIGHLIGHT) ─────────────────────── */}
      <section className="st cnt">
        <div className="wrap">
          <p id="stm" ref={statementRef}>
            {STATEMENT_WORDS.map((word, idx) => {
              const wordProgressTarget = idx / STATEMENT_WORDS.length;
              const isWordHighlighted = statementProgress > wordProgressTarget;
              return (
                <span key={`st-word-${idx}`}>
                  <span className={`w ${isWordHighlighted ? "on" : ""}`}>
                    {word}
                  </span>
                  {idx < STATEMENT_WORDS.length - 1 ? " " : ""}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="cta">
        <div className="wrap">
          <h2 className="rv">
            <span className="ln">
              <i>Be part of something big.</i>
            </span>
          </h2>
          <a
            className="btn dk"
            href={CLUB_SOCIALS.ig}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Instagram
          </a>
        </div>
      </section>

      {/* ── FOOTER SECTION ───────────────────────────────────────────────── */}
      <FooterSection />
    </div>
  );
}
