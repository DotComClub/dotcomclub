"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Shared Cyberstrike '26 editorial footer with auto-fitting DOTCOMCLUB.COM watermark.
 */
export function CyberstrikeFooter() {
  const watermarkRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let disposed = false;

    const fitWatermark = () => {
      const w = watermarkRef.current;
      if (!w || !w.parentElement || w.offsetWidth === 0) return;
      w.style.fontSize = "100px";
      const fs = (100 * w.parentElement.clientWidth) / w.offsetWidth;
      w.style.fontSize = `${fs}px`;
    };

    fitWatermark();
    window.addEventListener("resize", fitWatermark);
    const timer = window.setTimeout(fitWatermark, 300);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) fitWatermark();
      });
    }

    return () => {
      disposed = true;
      window.removeEventListener("resize", fitWatermark);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <footer className="ft">
      <div className="ft-top">
        <div className="ft-brand">
          <p className="ft-logo" aria-label="Dot Com Club">
            <span aria-hidden="true">
              DOT
              <i />
              <br />
              COM
              <br />
              CLUB
            </span>
          </p>
          <span className="ft-pill">Est. 2014</span>
          <p className="ft-tag">
            Empowering digital creativity and innovation through technology.
          </p>
        </div>
        <nav aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/sponsors">Sponsors</Link>
            </li>
            <li>
              <Link href="/teams">Teams</Link>
            </li>
            <li>
              <Link href="/magazines">Magazines</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/ewaste-26">E-waste</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/refund-policy">Refund Policy</Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Connect">
          <h3>Connect</h3>
          <ul>
            <li>
              <a
                href="https://www.instagram.com/dotcomclubjhc/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r=".6" />
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@JhcDcc/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
                  <path d="M10 9.5v5l4.5-2.5z" />
                </svg>
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/dotcomclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 10v8M6 6.5v.01M10.5 18v-8M10.5 13a3 3 0 0 1 6 0v5" />
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:jhcdotcomclub.official@gmail.com" className="soc">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                Email
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="ft-wmw" aria-hidden="true">
        <span className="ft-wm" ref={watermarkRef}>
          DOTCOMCLUB<i />COM
        </span>
      </div>
      <div className="ft-bot">
        <span>&copy; 2026 DCC &bull; Brought to life by DCC Web-Ops Team</span>
      </div>
    </footer>
  );
}
