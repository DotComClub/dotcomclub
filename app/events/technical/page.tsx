"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
  DM_Sans,
} from "next/font/google";
import "../../cyberstrike-26/cyberstrike.css";
import "../events.css";
import "../esports/esports.css";
import "../cultural/cultural.css";
import CyberstrikeBackground from "@/components/cyberstrike/CyberstrikeBackground";
import { CyberstrikeFooter } from "@/components/cyberstrike/CyberstrikeFooter";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const TECHNICAL_EVENTS = [
  {
    id: "cyber-hunt",
    number: "01",
    name: "Cyber Hunt",
    tagline: "Aim, decrypt, unlock.",
    team: "Solo / Individual",
    fee: "₹50 / person",
    venue: "Lab 1",
    capacity: "Max 20 participants",
    description:
      "A digital treasure hunt. Solve cyber puzzles, cryptic ciphers and decode security locks to unlock each password-protected file. First correct final answer after verification wins.",
    rules: [
      "Every participant starts with the same locked file.",
      "Each solved puzzle gives the next password; no skipping or borrowing passwords.",
      "Limited hints available at a predefined penalty.",
      "Report technical issues to the event coordinator immediately.",
      "First correct final answer, after verification, wins.",
    ],
  },
  {
    id: "ai-prompt-wars",
    number: "02",
    name: "AI Prompt Wars",
    tagline: "Out-prompt, out-think, out-create.",
    team: "2 members per team",
    fee: "₹100 / team",
    venue: "Lab 3",
    capacity: "Max 10 teams",
    description:
      "Build sharp prompts, improve AI output and catch subtle errors and hallucinations under strict time constraints. Test your prompt engineering mastery.",
    rules: [
      "Organiser-approved AI tools only.",
      "Save and submit your prompts when asked.",
      "No pre-prepared outputs or outside help.",
      "Same tasks and time limits for every team.",
      "Judged on prompt quality, accuracy, relevance, creativity and error detection.",
    ],
  },
  {
    id: "algorithm-auction",
    number: "03",
    name: "Algorithm Auction",
    tagline: "Bid wisely. Code ruthlessly.",
    team: "2 members per team",
    fee: "₹100 / team",
    venue: "Lab 4",
    capacity: "Max 10 teams",
    description:
      "Bid virtual CyberCoins for the right to solve programming challenges. Balance your budget and code efficiently under pressure. Highest score wins.",
    rules: [
      "Every team starts with equal CyberCoins.",
      "The highest valid bid solves the challenge; accepted bids cannot be withdrawn.",
      "Submit within the time limit; no sharing solutions.",
      "Rewards, penalties and scoring announced beforehand.",
      "Highest final score wins.",
    ],
  },
  {
    id: "among-us",
    number: "04",
    name: "Among Us: Cyberstrike Edition",
    tagline: "Trust no one. Spot the imposter.",
    team: "Solo (Up to 12 players)",
    fee: "₹50 / person",
    venue: "Lab 6A / Corridor",
    capacity: "Max 12 players",
    description:
      "Real-life social deduction. Crewmates finish tech tasks while Impostors sabotage the system. Decipher cues, call emergency meetings and survive the purge.",
    rules: [
      "The Game Master assigns secret roles; keep yours secret.",
      "Crewmates complete tasks at designated stations.",
      "Meetings and voting follow the Game Master's cue.",
      "No real hacking, private file access or physical interference.",
      "The Game Master settles all disputes.",
    ],
  },
  {
    id: "signal-sprint",
    number: "05",
    name: "Signal Sprint",
    tagline: "Fast mind. Quick buzzer. Total dominance.",
    team: "4 members per team",
    fee: "₹160 / team (₹40 / person)",
    venue: "Seminar Hall",
    capacity: "Max 12 teams",
    description:
      "A three-level tech quiz that tests knowledge, observation, algorithmic logic and quick reflexes under buzzer pressure.",
    rules: [
      "Round 1: survey-board questions per team; top six advance.",
      "Round 2: one player per team identifies projected visual tech cues.",
      "Round 3: buzzer speed round with direct point scoring.",
      "No phones, smart watches or outside help allowed.",
      "The referee's decision is final.",
    ],
  },
  {
    id: "canva-override",
    number: "06",
    name: "Canva: Creative Override",
    tagline: "Prompt. Design. Render the future.",
    team: "Solo participation",
    fee: "₹50 / person",
    venue: "Lab 5",
    capacity: "Max 20 participants",
    description:
      "A timed, AI-assisted design contest: generate an aesthetic cyber poster, then create a promotional motion graphic. Showcase visual mastery.",
    rules: [
      "Round 1: AI-assisted poster on an assigned theme.",
      "Round 2: short promotional video/graphic on a secondary theme.",
      "Canva and approved generative tools only.",
      "Original work only, submitted before each deadline.",
      "Highest combined score across both rounds wins.",
    ],
  },
];

export default function TechnicalPage() {
  const [openFeed, setOpenFeed] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const activeFeed = TECHNICAL_EVENTS.find((f) => f.id === openFeed) || null;

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const titleEl = document.querySelector<HTMLElement>(".ph.disp");

    const fireGlx = (el: HTMLElement | null) => {
      if (!el || el.classList.contains("glx")) return;
      el.classList.add("glx");
      setTimeout(() => {
        el.classList.remove("glx");
      }, 420);
    };

    const tick = () => {
      if (disposed) return;
      if (!document.hidden && titleEl) {
        fireGlx(titleEl);
      }
      timer = setTimeout(tick, 2400 + Math.random() * 2800);
    };

    timer = setTimeout(tick, 1800);

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openFeed && !dialog.open) {
      dialog.showModal();
      dialog.classList.remove("events-dialog-enter");
      window.requestAnimationFrame(() =>
        dialog.classList.add("events-dialog-enter")
      );
    }
  }, [openFeed]);

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.classList.add("out");
      window.setTimeout(() => {
        dialog.close();
        dialog.classList.remove("out");
        setOpenFeed(null);
      }, 220);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`cs26-root esports-reference live ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}
    >
      <CyberstrikeBackground />

      <main id="main" tabIndex={-1}>
        <section className="pg">
          <div className="wrap">
            <header>
              <div className="eh-top mono">
                <span>Ch 02</span>
                <span>6 feeds</span>
                <Link href="/events" className="navback">
                  <span aria-hidden="true">←</span>Events
                </Link>
              </div>
              <h1 className="ph disp" aria-label="TECHNICAL">
                TECHNICAL
              </h1>
              <p className="pin">
                Six arenas of code, promptcraft, algorithms and rapid reflexes.
                Approved tools only, no outside assistance. Verify credentials to compete.
              </p>
            </header>

            <ol className="fds">
              {TECHNICAL_EVENTS.map((feed, index) => (
                <li
                  key={feed.id}
                  className="fd"
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="fdi mono-n">
                    <small className="mono">Feed</small>
                    {feed.number}
                  </span>

                  <div className="fdm">
                    <span className="fdn">
                      <span className="s disp" aria-hidden="true">
                        {feed.name}
                      </span>
                      <span className="s disp" aria-hidden="true">
                        {feed.name}
                      </span>
                      <span className="s disp" aria-hidden="true">
                        {feed.name}
                      </span>
                      <span className="disp">{feed.name}</span>
                    </span>

                    <button
                      type="button"
                      className="rgb"
                      onClick={() => setOpenFeed(feed.id)}
                    >
                      <span>
                        <i className="pd" aria-hidden="true" />
                        REGISTER
                        <em className="fn"> FOR {feed.name.toUpperCase()}</em>
                      </span>
                      <b aria-hidden="true">↗</b>
                      <s className="sn" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="fdr">
                    <dl className="rd">
                      <div>
                        <dt>Format</dt>
                        <dd>{feed.team}</dd>
                      </div>
                      <div>
                        <dt>Fee</dt>
                        <dd>{feed.fee}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd>{feed.venue}</dd>
                      </div>
                      <div>
                        <dt>Capacity</dt>
                        <dd>{feed.capacity}</dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      className="rb mono"
                      onClick={() => setOpenFeed(feed.id)}
                    >
                      Briefing &amp; Rules
                      <i aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <CyberstrikeFooter />

      {/* Cyberstrike Detail Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="sh"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        {activeFeed && (
          <>
            <header className="sh-h">
              <div>
                <p className="mono">
                  Channel 02 / Feed {activeFeed.number} · {activeFeed.team}
                </p>
                <h3 className="disp" style={{ fontSize: "28px", margin: "4px 0" }}>
                  {activeFeed.name}
                </h3>
                <p
                  style={{
                    color: "var(--red)",
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                    fontSize: "17px",
                    margin: 0,
                  }}
                >
                  &ldquo;{activeFeed.tagline}&rdquo;
                </p>
              </div>
              <button
                type="button"
                className="sh-x"
                aria-label="Close dialog"
                onClick={closeDialog}
              >
                ×
              </button>
            </header>
            <div className="sh-b">
              <h4 className="mono">Transmission Brief</h4>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "var(--dim)",
                  marginBottom: "24px",
                }}
              >
                {activeFeed.description}
              </p>
              <dl className="rd">
                <div>
                  <dt>Format</dt>
                  <dd>{activeFeed.team}</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>{activeFeed.fee}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{activeFeed.venue}</dd>
                </div>
                <div>
                  <dt>Capacity</dt>
                  <dd>{activeFeed.capacity}</dd>
                </div>
              </dl>
              <h4 className="mono" style={{ marginTop: "24px" }}>
                Rules &amp; Regulations
              </h4>
              <ol className="rls">
                {activeFeed.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>
            <footer className="sh-f">
              <Link
                className="rgb"
                href={`/events/technical/${activeFeed.id}`}
                onClick={closeDialog}
              >
                <span>
                  <i className="pd" aria-hidden="true" />
                  Proceed to Register
                  <em className="fn"> for {activeFeed.name}</em>
                </span>
                <b aria-hidden="true">↗</b>
                <s className="sn" aria-hidden="true" />
              </Link>
            </footer>
          </>
        )}
      </dialog>
    </div>
  );
}
