import { createMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "../cyberstrike-26/cyberstrike.css";
import "./events.css";

export const metadata: Metadata = createMetadata({
  title: "Events - JHC Dot Com Club | Tech Events & Workshops",
  description: "Discover upcoming tech events, workshops, and conferences at JHC Dot Com Club. Join Cyberstrike 2026, E-waste drives, and innovation challenges at Jai Hind College.",
  keywords: [
    "JHC events",
    "Cyberstrike 2026",
    "Tech workshops",
    "Programming contests",
    "E-waste drive",
    "Technology conferences",
    "Mumbai tech events",
    "Student competitions"
  ],
  openGraph: {
    title: "Tech Events & Workshops - JHC Dot Com Club",
    description: "Join our exciting lineup of tech events, workshops, and conferences designed to inspire and educate.",
    images: [
      {
        url: "https://www.jhcdotcomclub.com/images/events-banner.jpg",
        width: 1200,
        height: 630,
        alt: "JHC Dot Com Club Events",
      },
    ],
  },
});

const Events = () => {
  return (
    <div className="cs26-root events-root">
      <main>
        <section className="blk s5" id="events">
          <div className="wrap">
            <span className="tag mono">[ 04 — Event channels ]</span>
            <h2
              className="disp h2"
              data-glitch
              data-events-sl
              aria-label="Tune into the events"
            >
              <span data-sl aria-hidden="true">Tune into</span>
              <br />
              <span data-sl aria-hidden="true">
                the <em>events</em>
              </span>
            </h2>
            <p className="sin" style={{ marginTop: "3vw" }}>
              Eighteen events on three channels. Pick a channel to see every
              event, its rules and how to register.
            </p>
            <nav className="hub pre" aria-label="Event channels">
              <Link
                className="hrow"
                href="/events/esports"
                style={{ "--i": 0, "--dx": "-.7" } as CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 01</span>
                  <span className="nm">E-Sports</span>
                </span>
                <span className="hm">
                  <span className="mono">5 events</span>
                  <span className="hd">
                    BGMI, VALORANT, Clash Royale, FIFA 25, Real Cricket
                  </span>
                  <i className="ar" aria-hidden="true">↗</i>
                </span>
              </Link>
              <Link
                className="hrow"
                href="/events/technical"
                style={{ "--i": 1, "--dx": ".6" } as CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 02</span>
                  <span className="nm">Technical</span>
                </span>
                <span className="hm">
                  <span className="mono">6 events</span>
                  <span className="hd">
                    Cyber Hunt, AI Prompt Wars, Algorithm Auction, Among Us:
                    Cyberstrike Edition, Signal Sprint, Canva: Creative Override
                  </span>
                  <i className="ar" aria-hidden="true">↗</i>
                </span>
              </Link>
              <Link
                className="hrow"
                href="/events/cultural"
                style={{ "--i": 2, "--dx": "-.4" } as CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 03</span>
                  <span className="nm">Cultural</span>
                </span>
                <span className="hm">
                  <span className="mono">8 events</span>
                  <span className="hd">
                    Capture the Strike, Blackout Empire, The Masked Truth, Red
                    Handed, Beat Drop, La Couture Nights, Escape Room, Debate
                  </span>
                  <i className="ar" aria-hidden="true">↗</i>
                </span>
              </Link>
            </nav>
          </div>
        </section>

        <footer className="ft events-ft">
          <div className="wrap events-ft-wrap">
            <div className="events-ft-brand">
              <span className="mono events-ft-label">
                CYBERSTRIKE 26 — EVENT CHANNELS
              </span>
              <p className="events-ft-sub">
                Dot Com Club · Jai Hind College, Mumbai · 20 November 2026
              </p>
            </div>
            <nav className="events-ft-nav" aria-label="Quick links">
              <Link href="/cyberstrike-26">Cyberstrike</Link>
              <Link href="/cyberstrike-26/cl">CL Registration</Link>
              <Link href="/about-us">About</Link>
              <Link href="/contact-us">Contact</Link>
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Events;
