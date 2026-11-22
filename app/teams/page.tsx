"use client";

import { useEffect, useRef, useState,  useMemo } from "react";
import { Navbar } from "@/components/home/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";
import { anton, dmSans } from "@/fonts/font";

const CLUB_SOCIALS = {
  ig: "https://www.instagram.com/dotcomclubjhc/",
  li: "https://www.linkedin.com/company/dotcomclub/",
};

interface Member {
  id: string;
  name: string;
  role: string;
  team: string;
  img?: string;
  ig?: string;
  li?: string;
}

const TEAMS_DATA: { team: string; members: Member[] }[] = [
  {
    team: "Core",
    members: [
      { id: "core-1", name: "Ayush Gupta", role: "President", team: "Core" },
      { id: "core-2", name: "Aditya Sharma", role: "Vice President", team: "Core" },
      { id: "core-3", name: "Hussain Tinwala", role: "General Secretary", team: "Core" },
      { id: "core-4", name: "Bhalchandra", role: "Treasurer", team: "Core" },
    ],
  },
  {
    team: "Technical",
    members: [
      { id: "tech-1", name: "Diya Mehta", role: "Technical Head", team: "Technical" },
      { id: "tech-2", name: "Web-Ops Lead", role: "Web-Ops Lead", team: "Technical" },
      { id: "tech-3", name: "Frontend Lead", role: "Frontend Developer", team: "Technical" },
      { id: "tech-4", name: "Cybersecurity Lead", role: "Cybersecurity Lead", team: "Technical" },
    ],
  },
  {
    team: "Creative",
    members: [
      { id: "creat-1", name: "Rohan Patel", role: "Creative Head", team: "Creative" },
      { id: "creat-2", name: "Graphic Designer", role: "Graphic Designer", team: "Creative" },
      { id: "creat-3", name: "Video Editor", role: "Video Editor", team: "Creative" },
    ],
  },
  {
    team: "Marketing",
    members: [
      { id: "mkt-1", name: "Marketing Head", role: "Marketing Head", team: "Marketing" },
      { id: "mkt-2", name: "Social Media Manager", role: "Social Media Manager", team: "Marketing" },
      { id: "mkt-3", name: "Content Writer", role: "Content Writer", team: "Marketing" },
    ],
  },
  {
    team: "Operations",
    members: [
      { id: "ops-1", name: "Operations Head", role: "Operations Head", team: "Operations" },
      { id: "ops-2", name: "Logistics Lead", role: "Logistics Lead", team: "Operations" },
      { id: "ops-3", name: "Sponsorship Lead", role: "Sponsorship Lead", team: "Operations" },
    ],
  },
];

const STATEMENT_TEXT = "Innovate. Create. Collaborate. Every idea at DCC starts with a team that cares.";
const STATEMENT_WORDS = STATEMENT_TEXT.split(" ");

export default function TeamsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [statementProgress, setStatementProgress] = useState(0);

  const statementRef = useRef<HTMLParagraphElement>(null);

  // All team members flattened
  const allMembers = useMemo(() => {
    return TEAMS_DATA.flatMap((t) => t.members);
  }, []);

  // Filter tabs: 'All' + team names
  const filterTabs = useMemo(() => {
    return ["All", ...TEAMS_DATA.map((t) => t.team)];
  }, []);

  // Marquee teams list
  const marqueeTeams = useMemo(() => {
    return TEAMS_DATA.map((t) => t.team);
  }, []);

  // Filtered members count
  const visibleMembersCount = useMemo(() => {
    if (activeFilter === "All") return allMembers.length;
    return allMembers.filter((m) => m.team === activeFilter).length;
  }, [activeFilter, allMembers]);

  // Initials generator for member circle avatar
  const getInitials = (name: string) => {
    if (!name || name === "Name") return "DCC";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

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
            Showing {visibleMembersCount}{" "}
            {visibleMembersCount === 1 ? "member" : "members"}
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
                >
                  <div className="pw">
                    <i
                      style={
                        member.img
                          ? {
                              background: `url('${member.img}') center/cover`,
                            }
                          : undefined
                      }
                    >
                      {!member.img && <span>{getInitials(member.name)}</span>}
                    </i>

                    {/* Social Hover Links */}
                    <div className="so">
                      <a
                        href={member.ig || CLUB_SOCIALS.ig}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Instagram`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
                        </svg>
                      </a>
                      <a
                        href={member.li || CLUB_SOCIALS.li}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <circle cx="5" cy="5" r="2.2" />
                          <rect x="2.9" y="9.3" width="4.2" height="11.8" />
                          <path d="M9.5 9.3h4v1.7c.6-1.1 2-2 3.9-2 3.7 0 4.6 2.4 4.6 5.6V21h-4.2v-5.6c0-1.4-.3-2.5-1.8-2.5-1.6 0-2.1 1.1-2.1 2.6V21H9.5z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <b>{member.name}</b>
                  <small>{member.role}</small>
                  <em className="tag">{member.team}</em>
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
