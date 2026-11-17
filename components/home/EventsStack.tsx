"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { RevealHeading } from "./RevealHeading";

interface EventItem {
  tag: string;
  title: string;
  description: string;
  href: string;
  bg: string;
  color: string;
}

const EVENTS: EventItem[] = [
  {
    tag: "Featured",
    title: "Cyberstrike 2026",
    description: "Our flagship tech fest. Compete, build and break things (ethically).",
    href: "/cyberstrike-26",
    bg: "#9E71FF",
    color: "#1B1030",
  },
  {
    tag: "Tech",
    title: "Hackathon",
    description: "24 hours, one problem, zero sleep.",
    href: "/events",
    bg: "#EDE5FF",
    color: "#1B1030",
  },
];

export function EventsStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardTops = () => {
      const cards = containerRef.current?.querySelectorAll<HTMLElement>(".ev");
      if (!cards || cards.length === 0) return;
      const innerHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const nav = document.querySelector("nav");
      const navHidden = !!nav?.classList.contains("hide");
      const baseTop = isMobile ? (navHidden ? 36 : 76) : (navHidden ? 40 : 88);
      const step = isMobile ? 6 : 10;

      cards.forEach((card, i) => {
        const defaultTop = baseTop + i * step;
        const cardHeight = card.offsetHeight;
        const availableHeight = innerHeight - defaultTop - 16;
        if (cardHeight > availableHeight) {
          const maxTop = Math.max(baseTop, innerHeight - cardHeight - 16);
          card.style.setProperty("--top", `${Math.min(defaultTop, maxTop)}px`);
        } else {
          card.style.removeProperty("--top");
        }
      });
    };

    updateCardTops();
    window.addEventListener("resize", updateCardTops, { passive: true });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => updateCardTops()) : null;
    const cards = containerRef.current?.querySelectorAll<HTMLElement>(".ev");
    cards?.forEach((c) => ro?.observe(c));

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateCardTops);
    };
  }, []);

  return (
    <section id="events">
      <div className="wrap">
        <RevealHeading>Upcoming Events</RevealHeading>
        <p className="lead">
          Join us for our exciting lineup of tech events, workshops, and
          conferences designed to inspire and educate.
        </p>

        {/* All cards are direct children of ONE shared container div */}
        <div id="events-stack" ref={containerRef} className="events-stack">
          {EVENTS.map((item, idx) => (
            <article
              key={item.title}
              className="ev"
              style={
                {
                  "--i": idx,
                  "--b": item.bg,
                  "--f": item.color,
                } as React.CSSProperties
              }
            >
              <div className="tr">
                <span className="tg">{item.tag}</span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href}>View Details</Link>
              </div>
            </article>
          ))}
        </div>

        <p style={{ marginTop: 24 }}>
          <Link className="btn" href="/events">
            View All Events
          </Link>
        </p>
      </div>
    </section>
  );
}

export const EventsSection = EventsStack;
