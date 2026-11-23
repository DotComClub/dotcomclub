"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function EventsNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("navlock", open);
    return () => {
      document.documentElement.classList.remove("navlock");
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="cs26-root events-navbar-container">
      <nav className={`top ${open ? "open" : ""}`} aria-label="Primary">
        <div className="wrap">
          <ul id="navMenu">
            <li>
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                aria-current={pathname.startsWith("/events") ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                Events
              </Link>
            </li>
            <li>
              <Link href="/cyberstrike-26" onClick={() => setOpen(false)}>
                Cyberstrike
              </Link>
            </li>
            <li>
              <Link href="/blogs" onClick={() => setOpen(false)}>
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/about-us" onClick={() => setOpen(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/sponsors" onClick={() => setOpen(false)}>
                Sponsors
              </Link>
            </li>
            <li>
              <Link href="/teams" onClick={() => setOpen(false)}>
                Teams
              </Link>
            </li>
            <li>
              <Link href="/magazines" onClick={() => setOpen(false)}>
                Magazines
              </Link>
            </li>
            <li>
              <Link href="/contact-us" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li className="gap">
              <Link href="/ewaste-26" onClick={() => setOpen(false)}>
                E-waste
              </Link>
            </li>
            <li className="sec first">
              <Link href="/cyberstrike-26/cl" onClick={() => setOpen(false)}>
                CL Registration
              </Link>
            </li>
            <li className="sec so">
              <a
                href="https://www.instagram.com/dotcomclubjhc/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                Instagram
              </a>
            </li>
            <li className="sec so">
              <a
                href="https://www.youtube.com/@JhcDcc/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                YouTube
              </a>
            </li>
            <li className="sec so">
              <a
                href="https://www.linkedin.com/company/dotcomclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="soc"
              >
                LinkedIn
              </a>
            </li>
          </ul>
          <button
            className="navbtn"
            id="navBtn"
            type="button"
            aria-expanded={open ? "true" : "false"}
            aria-controls="navMenu"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>
    </div>
  );
}
