"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  dmSansFull as dmSans,
  instrumentSerif,
  jetbrainsMono,
  vt323,
} from "@/fonts/font";
import "../../cyberstrike-26/cyberstrike.css";
import "../events.css";
import "../esports/esports.css";
import "../cultural/cultural.css";
import CyberstrikeBackground from "@/components/cyberstrike/CyberstrikeBackground";
import { CyberstrikeFooter } from "@/components/cyberstrike/CyberstrikeFooter";
import { TECHNICAL_EVENTS } from "@/lib/technical-events";

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
                <span>{TECHNICAL_EVENTS.length} feeds</span>
                <Link href="/events" className="navback">
                  <span aria-hidden="true">←</span>Events
                </Link>
              </div>
              <h1 className="ph disp" aria-label="TECHNICAL">
                TECHNICAL
              </h1>
              <p className="pin">
                Six arenas of code, promptcraft, algorithms and rapid reflexes.
                Select a sub-event below to review its flow and submit your
                registration form.
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
                    <h2 className="fdn">{feed.title}</h2>
                    <p
                      className="mono"
                      style={{
                        color: "var(--dim)",
                        marginTop: "8px",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {feed.tagline}
                    </p>

                    <Link
                      className="rgb"
                      href={`/events/technical/${feed.id}`}
                    >
                      <span>
                        <i className="pd" aria-hidden="true" />
                        Register
                        <em className="fn"> for {feed.title}</em>
                      </span>
                      <b aria-hidden="true">↗</b>
                      <s className="sn" aria-hidden="true" />
                    </Link>
                  </div>

                  <div className="fdr">
                    <dl className="rd">
                      <div>
                        <dt>Format</dt>
                        <dd>{feed.teamFormat}</dd>
                      </div>
                      <div>
                        <dt>Fee</dt>
                        <dd>{feed.feeDesc}</dd>
                      </div>
                      <div>
                        <dt>Venue / Day</dt>
                        <dd>
                          {feed.venue} · {feed.day}
                        </dd>
                      </div>
                      <div>
                        <dt>Capacity</dt>
                        <dd>{feed.capacity}</dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      className="rb mono"
                      aria-haspopup="dialog"
                      onClick={() => setOpenFeed(feed.id)}
                    >
                      Event Flow &amp; Rules
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

      {/* Cyberstrike CRT Detail Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="sht"
        aria-labelledby="tech-feed-modal-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
      >
        {activeFeed && (
          <>
            <header className="sh-h">
              <span className="mono">
                Feed {activeFeed.number} / {activeFeed.title}
              </span>
              <button
                type="button"
                className="sh-x mono"
                onClick={closeDialog}
              >
                Close
                <i aria-hidden="true" />
              </button>
            </header>
            <div className="sh-b" tabIndex={-1}>
              <h3 id="tech-feed-modal-title">{activeFeed.title}</h3>
              <p className="cn">&ldquo;{activeFeed.tagline}&rdquo;</p>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "1.7",
                  color: "var(--dim)",
                  marginBottom: "24px",
                }}
              >
                {activeFeed.intro}
              </p>
              <dl className="rd">
                <div>
                  <dt>Format</dt>
                  <dd>{activeFeed.teamFormat}</dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>{activeFeed.feeDesc}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{activeFeed.venue}</dd>
                </div>
                <div>
                  <dt>Day</dt>
                  <dd>{activeFeed.day}</dd>
                </div>
                <div>
                  <dt>Capacity</dt>
                  <dd>{activeFeed.capacity}</dd>
                </div>
              </dl>

              <h4 className="mono" style={{ marginTop: "24px" }}>
                Event Flow
              </h4>
              <ol className="rls">
                {activeFeed.eventFlow.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <h4 className="mono" style={{ marginTop: "28px" }}>
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
                  <em className="fn"> for {activeFeed.title}</em>
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
