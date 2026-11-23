"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
  DM_Sans,
} from "next/font/google";
import "../../cyberstrike-26/cyberstrike.css";
import "./esports.css";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-instrument-serif" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"], variable: "--font-vt323" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });

const feeds = [
  {
    id: "bgmi",
    number: "01",
    name: "BGMI",
    venue: "Class 1D or Lab 6A",
    description: "Squad mode in custom rooms. Points for where you finish and every elimination.",
    rules: [
      "Match points = placement points + 1 per finish",
      "Placement: 1st 10, 2nd 6, 3rd 5, 4th 4, 5th 3, 6th 2, 7th–8th 1",
      "Ties: most first-place finishes, then placement points, finishes, latest match",
      "Use registered in-game names and the room ID and password from organisers",
      "No teaming with opponents, modified clients or point manipulation",
    ],
  },
  {
    id: "valorant",
    number: "02",
    name: "VALORANT",
    venue: "Lab 2",
    description: "Five-a-side knockout bracket. Win and advance.",
    rules: [
      "BO1 in early rounds; the final may be BO3",
      "Map pool and veto steps announced before the event",
      "Report 20 minutes early; late teams may forfeit",
      "One tactical timeout per half if enabled; pauses go through the referee",
      "Own mouse and keyboard only if permitted; no cheats, macros or account sharing",
    ],
  },
  {
    id: "clash-royale",
    number: "03",
    name: "Clash Royale",
    venue: "Foyer",
    description: "Mega Draft 1v1 knockout. Both players draft their cards for every match.",
    rules: [
      "Best-of-1 or Best-of-3 announced beforehand",
      "No outside help with card selection",
      "Play on your own registered account",
      "No restarts without an official’s approval; a disconnect is not an automatic rematch",
      "Report 15 minutes early or risk a walkover",
    ],
  },
  {
    id: "fifa-25",
    number: "04",
    name: "FIFA 25",
    venue: "Foyer",
    description: "1v1 knockout on official club teams.",
    rules: [
      "Official club teams only; no custom squads, FUT or Volta",
      "Tournament controllers only",
      "Pause only when the ball is out of play or at half-time",
      "Ties go to extra time, then penalties",
      "Report 15 minutes early or forfeit the match",
    ],
  },
  {
    id: "real-cricket",
    number: "05",
    name: "REAL CRICKET",
    venue: "To be announced",
    description: "Register for the Real Cricket tournament and receive match reporting details.",
    rules: [
      "Use your registered in-game name and account",
      "Report at the venue before the match",
      "No modified clients or outside assistance",
      "Match format and reporting details will be announced by the organisers",
    ],
  },
];

export default function EsportsPage() {
  const [openFeed, setOpenFeed] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const activeFeed = feeds.find((feed) => feed.id === openFeed);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (openFeed && dialog && !dialog.open) {
      dialog.showModal();
      dialog.classList.remove("events-dialog-enter");
      window.requestAnimationFrame(() => dialog.classList.add("events-dialog-enter"));
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
    <div className={`cs26-root esports-reference ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}>
      <main id="main" tabIndex={-1}>
        <section className="pg">
          <div className="wrap">
            <header>
              <div className="eh-top mono">
                <span>Ch 03</span>
                <span>5 feeds</span>
                <Link href="/events" className="navback">
                  <span aria-hidden="true">←</span>Events
                </Link>
              </div>
              <h1 className="ph" data-t="E-SPORTS" data-events-sl>E-SPORTS</h1>
              <p className="pin">Five tournaments. Report 15–20 minutes before your match, play on registered accounts, no cheats, macros or collusion. Entry fee and prize pool: to be announced.</p>
            </header>

            <ol className="fds">
              {feeds.map((feed, index) => (
                <li className="fd" key={feed.id} style={{ "--i": index, "--dx": index % 2 === 0 ? "-.7" : ".6" } as CSSProperties}>
                  <span className="fdi mono-n"><small className="mono">Feed</small>{feed.number}</span>
                  <div className="fdm">
                    <h2 className="fdn" data-glitch>
                      <span data-sl>{feed.name}</span>
                    </h2>
                    <Link className="rgb" href={`/events/esports/${feed.id}`}>
                      <span><i className="pd" aria-hidden="true" />Register</span>
                      <b aria-hidden="true">↗</b><s className="sn" aria-hidden="true" />
                    </Link>
                  </div>
                  <div className="fdr">
                    <dl className="rd">
                      <div><dt>{feed.id === "real-cricket" ? "Entry" : "Team"}</dt><dd>{feed.id === "bgmi" ? "4 players + 1 sub" : feed.id === "valorant" ? "5 players + 1 sub" : "Solo"}</dd></div>
                      <div><dt>Venue</dt><dd>{feed.venue}</dd></div>
                    </dl>
                    <button className="rb mono" type="button" aria-haspopup="dialog" onClick={() => setOpenFeed(feed.id)}>
                      Description<i aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <dialog className="sht" ref={dialogRef} aria-labelledby="feed-description-title" onCancel={(event) => { event.preventDefault(); closeDialog(); }} onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}>
        {activeFeed && (
          <>
            <header className="sh-h">
              <span className="mono">Feed {activeFeed.number} / {activeFeed.name}</span>
              <button className="sh-x mono" type="button" onClick={closeDialog}>Close<i aria-hidden="true" /></button>
            </header>
            <div className="sh-b" tabIndex={-1}>
              <h3 id="feed-description-title">{activeFeed.name}</h3>
              <p className="cn">{activeFeed.description}</p>
              <dl className="rd">
                <div><dt>{activeFeed.id === "real-cricket" ? "Entry" : "Team"}</dt><dd>{activeFeed.id === "bgmi" ? "4 players + 1 sub" : activeFeed.id === "valorant" ? "5 players + 1 sub" : "Solo"}</dd></div>
                <div><dt>Venue</dt><dd>{activeFeed.venue}</dd></div>
              </dl>
              <h4 className="mono">Rules</h4>
              <ol className="rls">{activeFeed.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
            </div>
            <footer className="sh-f">
              <Link className="rgb" href={`/events/esports/${activeFeed.id}`}>
                <span><i className="pd" aria-hidden="true" />Register<em className="fn"> for {activeFeed.name}</em></span>
                <b aria-hidden="true">↗</b><s className="sn" aria-hidden="true" />
              </Link>
            </footer>
          </>
        )}
      </dialog>
    </div>
  );
}
