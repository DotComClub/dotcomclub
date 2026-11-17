"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const URL_STRING = "www.dotcomclub.com";

interface LoaderProps {
  onLoaded?: () => void;
}

export function Loader({ onLoaded }: LoaderProps) {
  // Rendered immediately in SSR so the user sees the intro FIRST on frame 0
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [percentage, setPercentage] = useState("0%");

  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  const hasFinishedRef = useRef(false);

  // Fast skip handler (user clicks or taps anywhere to skip)
  const skipLoader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setTypedText(URL_STRING);
    setPercentage("100%");
    setIsOpen(true);
    document.body.classList.remove("lock");
    onLoadedRef.current?.();
    setTimeout(() => {
      setIsVisible(false);
    }, 650);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onLoadedRef.current?.();
      return;
    }

    // Lock body scroll immediately during intro
    document.body.classList.add("lock");

    let k = 0;
    const timeouts: NodeJS.Timeout[] = [];

    // Fast, optimized character typing interval (42ms per character)
    const interval = setInterval(() => {
      if (hasFinishedRef.current) {
        clearInterval(interval);
        return;
      }

      k++;
      setTypedText(URL_STRING.slice(0, k));
      setPercentage(`${Math.round((k / URL_STRING.length) * 100)}%`);

      if (k >= URL_STRING.length) {
        clearInterval(interval);

        // Hold full text briefly before expanding the circular radial mask
        const t1 = setTimeout(() => {
          if (hasFinishedRef.current) return;
          setIsOpen(true);

          // Unlock scroll and signal page content ready
          const t2 = setTimeout(() => {
            if (hasFinishedRef.current) return;
            document.body.classList.remove("lock");
            onLoadedRef.current?.();

            // Unmount loader cleanly after circular mask expands
            const t3 = setTimeout(() => {
              setIsVisible(false);
            }, 750);
            timeouts.push(t3);
          }, 320);
          timeouts.push(t2);
        }, 220);
        timeouts.push(t1);
      }
    }, 42);

    // Keyboard listener to skip on Escape / Space / Enter
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") {
        skipLoader();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("lock");
    };
  }, [skipLoader]);

  if (!isVisible) return null;

  return (
    <div
      className={`ld ${isOpen ? "open" : ""}`}
      id="ld"
      aria-hidden="true"
      onClick={skipLoader}
      style={{ cursor: "pointer" }}
      title="Click to skip"
    >
      <div className="bar">
        <b />
        <span id="ty">{typedText}</span>
        <u />
      </div>
      <div className="pc" id="pc">
        {percentage}
      </div>
    </div>
  );
}
