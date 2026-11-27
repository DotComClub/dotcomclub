"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Navbar } from "@/components/home/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";
import { anton, dmSans } from "@/fonts/font";
import { TEAM_CARDS, TEAM_NAMES, type TeamCard } from "@/lib/teams-roster";

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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [originRect, setOriginRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

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

  const visibleMembers = useMemo(() => {
    if (activeFilter === "All") return allMembers;
    return allMembers.filter((m) => m.team === activeFilter);
  }, [activeFilter, allMembers]);

  const visibleCardsCount = visibleMembers.length;

  const selectedIndex = useMemo(() => {
    if (!selectedId) return -1;
    return visibleMembers.findIndex((m) => m.id === selectedId);
  }, [selectedId, visibleMembers]);

  const selectedMember: TeamCard | null =
    selectedIndex >= 0 ? visibleMembers[selectedIndex] : null;

  const closeLightbox = useCallback(() => {
    setIsZoomed(false);
    setSelectedId(null);
  }, []);

  const stepLightbox = useCallback(
    (direction: -1 | 1) => {
      if (visibleMembers.length === 0 || selectedIndex < 0) return;
      const nextIndex =
        (selectedIndex + direction + visibleMembers.length) %
        visibleMembers.length;
      setIsZoomed(false);
      setOriginRect(null);
      setSelectedId(visibleMembers[nextIndex].id);
    },
    [selectedIndex, visibleMembers]
  );

  const openLightbox = (
    member: TeamCard,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setIsZoomed(false);
    setOriginRect({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedId(member.id);
  };

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      else if (event.key === "ArrowLeft") stepLightbox(-1);
      else if (event.key === "ArrowRight") stepLightbox(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedMember, closeLightbox, stepLightbox]);

  const initialLightboxMotion = useMemo(() => {
    if (!originRect || typeof window === "undefined") {
      return { x: 0, y: 28, scale: 0.72, opacity: 0 };
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxW = Math.min(vw * 0.9, 740);
    const maxH = vh * 0.84;
    const targetH = Math.min(maxH, maxW * 1.25);
    const targetW = targetH * 0.8;
    const originCenterX = originRect.left + originRect.width / 2;
    const originCenterY = originRect.top + originRect.height / 2;

    return {
      x: originCenterX - vw / 2,
      y: originCenterY - vh / 2,
      scale: Math.max(0.22, Math.min(0.92, originRect.width / Math.max(targetW, 1))),
      opacity: 0.65,
    };
  }, [originRect]);

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
                    <button
                      type="button"
                      className="poster"
                      data-cursor="view"
                      aria-label={`Enlarge ${member.team} ${member.category === "group" ? "group photo" : `${member.category} poster`}`}
                      onClick={(event) => openLightbox(member, event)}
                    >
                      <Image
                        src={member.image}
                        alt={`${member.team} ${member.category === "group" ? "all-members group photo" : `${member.category} poster`} with names and positions`}
                        fill
                        sizes="(max-width: 639px) 44vw, (max-width: 999px) 30vw, 22vw"
                        quality={75}
                      />
                    </button>
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

      {/* ── ENLARGED IMAGE LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="teams-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedMember.team} ${selectedMember.category} image preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={closeLightbox}
          >
            <motion.div
              className="teams-lightbox-dialog"
              initial={initialLightboxMotion}
              animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
              exit={{
                scale: 0.76,
                opacity: 0,
                transition: { duration: 0.18, ease: "easeIn" },
              }}
              transition={{
                type: "spring",
                stiffness: 330,
                damping: 21,
                mass: 0.75,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="teams-lightbox-bar">
                <div className="teams-lightbox-meta">
                  <span className="teams-lightbox-team">{selectedMember.team}</span>
                  {(!["Core", "Faculty"].includes(selectedMember.team) ||
                    selectedMember.category === "group") && (
                    <span className="teams-lightbox-cat">
                      {selectedMember.category}
                    </span>
                  )}
                </div>

                <div className="teams-lightbox-actions">
                  <span className="teams-lightbox-count">
                    {selectedIndex + 1} / {visibleMembers.length}
                  </span>
                  <button
                    type="button"
                    className={`teams-lightbox-close${isZoomed ? " active" : ""}`}
                    aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
                    aria-pressed={isZoomed}
                    onClick={() => setIsZoomed((prev) => !prev)}
                  >
                    {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  </button>
                  <button
                    type="button"
                    className="teams-lightbox-close"
                    aria-label="Close enlarged image"
                    onClick={closeLightbox}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="teams-lightbox-stage">
                {visibleMembers.length > 1 && (
                  <button
                    type="button"
                    className="teams-lightbox-nav prev"
                    aria-label="Previous image"
                    onClick={() => stepLightbox(-1)}
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={selectedMember.id}
                    className={`teams-lightbox-frame${isZoomed ? " is-zoomed" : ""}`}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 24,
                    }}
                    onClick={() => setIsZoomed((prev) => !prev)}
                  >
                    <motion.div
                      className="teams-lightbox-img-wrap"
                      animate={{ scale: isZoomed ? 1.42 : 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    >
                      <Image
                        src={selectedMember.image}
                        alt={`${selectedMember.team} ${selectedMember.category === "group" ? "all-members group photo" : `${selectedMember.category} poster`} with names and positions`}
                        width={selectedMember.width}
                        height={selectedMember.height}
                        quality={95}
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {visibleMembers.length > 1 && (
                  <button
                    type="button"
                    className="teams-lightbox-nav next"
                    aria-label="Next image"
                    onClick={() => stepLightbox(1)}
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
