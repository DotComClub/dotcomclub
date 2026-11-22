"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function EventsReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    let frame = 0;

    const sliceType = (element: HTMLElement) => {
      if (element.dataset.eventsSliced === "true") return;
      const raw = element.innerHTML;
      element.dataset.eventsRaw = raw;
      element.dataset.eventsSliced = "true";
      element.innerHTML = "";
      element.classList.add("sl");

      const base = document.createElement("span");
      base.className = "b";
      base.innerHTML = raw;
      element.appendChild(base);

      for (let index = 0; index < 7; index += 1) {
        const start = (index / 7) * 100 + (Math.random() * 8 - 4);
        const end = ((index + 1) / 7) * 100 + (Math.random() * 8 - 4);
        const slice = document.createElement("span");
        slice.className = "s";
        slice.setAttribute("aria-hidden", "true");
        slice.innerHTML = raw;
        slice.style.clipPath = `inset(${Math.max(0, start - 0.5)}% -12% ${Math.max(0, 100 - end - 0.5)}% -12%)`;
        slice.style.setProperty("--dx", (Math.random() * 2 - 1).toFixed(3));
        slice.style.setProperty("--dy", (Math.random() * 2 - 1).toFixed(3));
        slice.style.setProperty("--r", Math.random().toFixed(3));
        element.appendChild(slice);
      }
    };

    const initialize = () => {
      if (!reducedMotion) {
        document.querySelectorAll<HTMLElement>("[data-events-sl]").forEach(sliceType);
        document.querySelectorAll<HTMLElement>("[data-glitch]").forEach((element) =>
          element.querySelectorAll<HTMLElement>("[data-sl]").forEach(sliceType)
        );
      }

      const revealTargets = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".events-root .hrow, .esports-reference .eh-top, .esports-reference .ph, .esports-reference .pin, .esports-reference .fd, .event-channel-page .channel-event, .er-header, .er-form, .er-success, .er-fields, .er-team fieldset"
        )
      );

      if (reducedMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach((element) => element.classList.add("events-revealed"));
        return;
      }

      revealTargets.forEach((element, index) => {
        if (element.classList.contains("events-revealed")) return;
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
        if (rect.top < window.innerHeight * 0.9) {
          element.classList.add("events-revealed");
        } else {
          element.classList.add("events-reveal");
        }
      });

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("events-revealed");
              entry.target.classList.remove("events-reveal");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealTargets.forEach((element) => {
        if (!element.classList.contains("events-revealed")) revealObserver.observe(element);
      });
      cleanups.push(() => revealObserver.disconnect());

      const glitchObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.remove("pre");
              target.classList.add("events-glitch-enter");
              const onAnimationEnd = () => target.classList.remove("events-glitch-enter");
              target.addEventListener("animationend", onAnimationEnd, { once: true });
              glitchObserver.unobserve(target);
            }
          });
        },
        { threshold: 0.25 }
      );
      document.querySelectorAll<HTMLElement>("[data-glitch]").forEach((element) => {
        if (element.getBoundingClientRect().top > window.innerHeight * 0.9) element.classList.add("pre");
        glitchObserver.observe(element);
      });
      cleanups.push(() => glitchObserver.disconnect());
    };

    frame = window.requestAnimationFrame(() => {
      initialize();
      const mutationObserver = new MutationObserver(() => {
        window.requestAnimationFrame(initialize);
      });
      mutationObserver.observe(document.querySelector("main") ?? document.body, {
        childList: true,
        subtree: true,
      });
      cleanups.push(() => mutationObserver.disconnect());
    });

    return () => {
      window.cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      document.querySelectorAll<HTMLElement>("[data-events-sliced='true']").forEach((element) => {
        if (element.dataset.eventsRaw) element.innerHTML = element.dataset.eventsRaw;
        delete element.dataset.eventsRaw;
        delete element.dataset.eventsSliced;
        element.classList.remove("sl");
      });
    };
  }, [pathname]);

  return null;
}
