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
import "./cultural.css";
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

const CULTURAL_EVENTS = [
  {
    id: "capture-the-strike",
    number: "01",
    name: "Capture the Strike",
    tagline: "Aim. Focus. Conquer.",
    team: "Solo",
    fee: "₹50 / person",
    venue: "Room Lab 3",
    capacity: "10–15 Participants",
    description:
      "A team challenge that calls for focus, coordination and precision. Register and get ready to Capture the Strike. Registration is subject to availability and payment verification.",
    rules: [
      "Solo participants.",
      "One participant must be identified as Team Leader.",
      "All members must provide their details and college ID proof.",
      "Fee is ₹50 per participant.",
      "Participation is subject to capacity, payment verification and organizer confirmation.",
    ],
  },
  {
    id: "blackout-empire",
    number: "02",
    name: "Blackout Empire",
    tagline: "Enter the darkness. Outsmart your opponent. Claim the empire.",
    team: "Exactly 2 participants",
    fee: "₹100 / team",
    venue: "Basement",
    capacity: "Max 6 teams",
    description:
      "The darkness is your battlefield. Strategy is your weapon. Only the smartest team will emerge victorious. Register with your teammate and put your skills to the test.",
    rules: [
      "Team must have exactly 2 participants.",
      "One participant must be identified as Team Leader.",
      "Both members must provide individual details and college ID proof.",
      "Fee is ₹100 per team.",
      "Maximum 6 teams; registration is subject to availability and payment verification.",
    ],
  },
  {
    id: "the-masked-truth",
    number: "03",
    name: "The Masked Truth",
    tagline: "Look beyond the mask. Can you uncover the truth?",
    team: "Solo participation",
    fee: "₹50 / person",
    venue: "Basement / Room 1A",
    capacity: "Max 21 participants",
    description:
      "Step into the challenge, trust your instincts and uncover what lies behind the mask. Register as an individual participant.",
    rules: [
      "This is an individual event; team registrations are not applicable.",
      "Participant must provide accurate personal and college details.",
      "Fee is ₹50 per participant.",
      "Participation is subject to the 21-person limit and payment verification.",
    ],
  },
  {
    id: "red-handed",
    number: "04",
    name: "Red Handed",
    tagline: "Stay sharp. Catch the clue. Don't get caught.",
    team: "Exactly 4 participants",
    fee: "₹40 / person (₹160 / team)",
    venue: "Room 2D (Waiting: New Building)",
    capacity: "Max 15 Teams",
    description:
      "A team event that puts observation and quick thinking to the test. Assemble your four-member detective team and register all participants.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All four participants must provide their details and college ID proof.",
      "Fee is ₹40 per participant; total ₹160 per team.",
      "Follow organizer instructions for the event room and waiting area.",
    ],
  },
  {
    id: "beat-drop",
    number: "05",
    name: "Beat Drop",
    tagline: "Feel the beat. Own the moment.",
    team: "Solo OR 3–5 participants",
    fee: "₹50 / person",
    venue: "Basement",
    capacity: "Max 10 Teams",
    description:
      "Bring your energy and rhythm to Beat Drop. Register individually or as a dance crew, according to the permitted format.",
    rules: [
      "Registration may be solo or as a team of min 3 – max 5 participants.",
      "Fee is ₹50 per participant; calculate total according to the number registered.",
      "For team entries, identify one Team Leader.",
      "For solo entries, complete only Participant 1 details; do not add other participants.",
      "Capacity is limited to 10 entries.",
    ],
  },
  {
    id: "la-couture-nights",
    number: "06",
    name: "La Couture Nights",
    tagline: "Style the stage. Make your statement.",
    team: "6–8 participants / team",
    fee: "₹50 / person",
    venue: "Auditorium",
    capacity: "Max 10 Teams",
    description:
      "Creativity meets confidence at La Couture Nights. Bring your runway team together and make your mark on the stage.",
    rules: [
      "Each team must have a minimum of 6 and maximum of 8 participants.",
      "One participant must be identified as Team Leader.",
      "Provide details and college ID proof for every registered participant.",
      "Fee is ₹50 per participant; total depends on team size.",
      "Maximum participation is 10 teams.",
    ],
  },
  {
    id: "escape-room",
    number: "07",
    name: "Escape Room",
    tagline: "Think fast. Work together. Find your way out.",
    team: "Exactly 4 participants",
    fee: "₹50 / person (₹200 / team)",
    venue: "Rooms 1A & 1D (Waiting: Room 1C)",
    capacity: "Max 15 Teams",
    description:
      "Can your team solve the clues, beat the clock and escape? Register your four-member team and take on the sequential escape puzzle.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All participants must provide individual details and college ID proof.",
      "Fee is ₹50 per participant; total ₹200 per team.",
      "Follow organizer instructions for assigned rooms and the waiting area.",
    ],
  },
  {
    id: "debate",
    number: "08",
    name: "Debate",
    tagline: "Speak with purpose. Argue with impact.",
    team: "Solo participation",
    fee: "₹100 / participant",
    venue: "AV Room",
    capacity: "Max 24 participants",
    description:
      "Present your perspective, defend your arguments and make your voice heard. Register as an individual debater. Only 24 slots available.",
    rules: [
      "This is an individual event; each registration is for one participant.",
      "Participant must provide accurate personal and college details.",
      "Fee is ₹100 per participant.",
      "Participants should bring/use sheets, bottles and pens, following organizer instructions.",
      "Participation is subject to the 24-person limit and payment verification.",
    ],
  },
];

export default function CulturalPage() {
  const [openFeed, setOpenFeed] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const activeFeed = CULTURAL_EVENTS.find((ev) => ev.id === openFeed);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openFeed && dialog && !dialog.open) {
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
      className={`cs26-root esports-reference live ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}
    >
      <CyberstrikeBackground />
      <main id="main" tabIndex={-1}>
        <section className="pg">
          <div className="wrap">
            <header>
              <div className="eh-top mono">
                <span>Ch 03</span>
                <span>8 feeds</span>
                <Link href="/events" className="navback">
                  <span aria-hidden="true">←</span>Events
                </Link>
              </div>
              <h1 className="ph disp" aria-label="CULTURAL">CULTURAL</h1>
              <p className="pin">
                Eight stages for performers, detectives, strategists and speakers.
                Complete institution and participant verification to secure entry.
              </p>
            </header>

            <ol className="fds">
              {CULTURAL_EVENTS.map((ev, index) => (
                <li
                  className="fd"
                  key={ev.id}
                  style={
                    {
                      "--i": index,
                      "--dx": index % 2 === 0 ? "-.7" : ".6",
                    } as CSSProperties
                  }
                >
                  <span className="fdi mono-n">
                    <small className="mono">Feed</small>
                    {ev.number}
                  </span>
                  <div className="fdm">
                    <h2 className="fdn">
                      {ev.name}
                    </h2>
                    <p
                      className="mono"
                      style={{
                        color: "var(--dim)",
                        marginTop: "8px",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {ev.tagline}
                    </p>
                    <Link className="rgb" href={`/events/cultural/${ev.id}`}>
                      <span>
                        <i className="pd" aria-hidden="true" />
                        Register
                      </span>
                      <b aria-hidden="true">↗</b>
                      <s className="sn" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="fdr">
                    <dl className="rd">
                      <div>
                        <dt>Format</dt>
                        <dd>{ev.team}</dd>
                      </div>
                      <div>
                        <dt>Fee</dt>
                        <dd>{ev.fee}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd>{ev.venue}</dd>
                      </div>
                      <div>
                        <dt>Capacity</dt>
                        <dd>{ev.capacity}</dd>
                      </div>
                    </dl>
                    <button
                      className="rb mono"
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setOpenFeed(ev.id)}
                    >
                      Rules &amp; Details
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

      {/* Cyberstrike CRT Dialog Modal */}
      <dialog
        className="sht"
        ref={dialogRef}
        aria-labelledby="feed-modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {activeFeed && (
          <>
            <header className="sh-h">
              <span className="mono">
                Feed {activeFeed.number} / {activeFeed.name}
              </span>
              <button
                className="sh-x mono"
                type="button"
                onClick={closeDialog}
              >
                Close
                <i aria-hidden="true" />
              </button>
            </header>
            <div className="sh-b" tabIndex={-1}>
              <h3 id="feed-modal-title">{activeFeed.name}</h3>
              <p className="cn">&ldquo;{activeFeed.tagline}&rdquo;</p>
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
                href={`/events/cultural/${activeFeed.id}`}
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
