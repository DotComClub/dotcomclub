"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { anton, dmSans } from "@/fonts/font";
import "./not-found.css";

export default function NotFound() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRingRef = useRef<HTMLDivElement | null>(null);
  const eyeRef = useRef<HTMLSpanElement | null>(null);
  const pupilRef = useRef<HTMLSpanElement | null>(null);
  const addressRef = useRef<HTMLSpanElement | null>(null);
  const titleTextRef = useRef<HTMLSpanElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.body.classList.add("is-404");

    const red = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // 1. Reveal animation
    let raf1 = requestAnimationFrame(() => {
      raf1 = requestAnimationFrame(() => {
        root.classList.add("go");
        document.body.classList.add("go");
      });
    });

    // 2. Address bar typing effect
    let typeTimer: ReturnType<typeof setTimeout> | null = null;
    const pathname =
      typeof window !== "undefined" && window.location.pathname
        ? window.location.pathname
        : "/this-page";
    const path = pathname === "/" ? "/this-page" : pathname;
    const full = "dotcomclub.com" + path;
    const ad = addressRef.current;
    let k = 0;

    function typeChar() {
      k++;
      if (ad) ad.textContent = full.slice(0, k);
      if (k < full.length) {
        typeTimer = setTimeout(typeChar, 55 + Math.random() * 50);
      } else {
        root?.classList.add("typed");
        document.body.classList.add("typed");
      }
    }

    if (red) {
      if (ad) ad.textContent = full;
      root.classList.add("typed");
      document.body.classList.add("typed");
    } else {
      typeTimer = setTimeout(typeChar, 700);
    }

    // 3. Headline text scramble effect
    const tt = titleTextRef.current;
    const txt = "Page not found";
    const CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let busy = false;
    let scrambleTimer: ReturnType<typeof setTimeout> | null = null;

    function scramble() {
      if (busy || red || !tt) return;
      busy = true;
      let f = 0;
      function s() {
        let o = "";
        for (let i = 0; i < txt.length; i++) {
          o +=
            txt[i] === " "
              ? " "
              : i < f / 2
              ? txt[i]
              : CH[Math.floor(Math.random() * 26)];
        }
        if (tt) tt.textContent = o;
        f++;
        if (f <= txt.length * 2 + 2) {
          scrambleTimer = setTimeout(s, 32);
        } else {
          if (tt) tt.textContent = txt;
          busy = false;
        }
      }
      s();
    }

    const initialScrambleTimer = setTimeout(scramble, 550);

    const ttlElement = tt?.parentElement;
    const handleTitleMouseEnter = () => scramble();
    ttlElement?.addEventListener("mouseenter", handleTitleMouseEnter);

    // 4. Pointer state
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let lt = -9999;
    let nx = 0;
    let ny = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      lt = performance.now();
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // 5. Interactive Eye
    const eye = eyeRef.current;
    const pu = pupilRef.current;
    const big = root.querySelector<HTMLElement>(".big");
    let ex = 0;
    let ey = 0;

    const handleEyeClick = () => {
      if (!eye) return;
      eye.classList.remove("bk");
      void eye.offsetWidth;
      eye.classList.add("bk");
    };
    eye?.addEventListener("click", handleEyeClick);

    // 6. Hero Canvas (Brush Strokes)
    const cv = heroCanvasRef.current;
    const c = cv?.getContext("2d");
    let W = 0;
    let H = 0;

    function resizeHeroCanvas() {
      if (!cv || !c) return;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * d;
      cv.height = H * d;
      c.setTransform(d, 0, 0, d, 0, 0);
    }
    resizeHeroCanvas();
    window.addEventListener("resize", resizeHeroCanvas);

    type BrushDef = {
      p: [number, number][];
      w: number;
      c: string[];
      d: number;
      sp: number;
      ph: number;
      s: number;
    };

    const BR: BrushDef[] = [
      {
        p: [
          [-0.1, 0.88],
          [0.2, 0.52],
          [0.5, 0.78],
          [0.8, 0.36],
          [1.1, 0.42],
        ],
        w: 0.13,
        c: ["#B796FF", "#D6C5FF", "#EDE5FF"],
        d: 0.6,
        sp: 0.08,
        ph: 0,
        s: 1,
      },
      {
        p: [
          [0.08, -0.1],
          [0.34, 0.24],
          [0.62, 0.04],
          [0.96, 0.22],
          [1.1, 0.1],
        ],
        w: 0.1,
        c: ["#4A22A8", "#6638D6", "#7B4DEB"],
        d: 1,
        sp: 0.07,
        ph: 0.35,
        s: 3,
      },
      {
        p: [
          [1.1, 0.74],
          [0.78, 1.0],
          [0.5, 0.86],
          [0.2, 1.08],
        ],
        w: 0.09,
        c: ["#4A22A8", "#6638D6", "#7B4DEB"],
        d: 0.8,
        sp: 0.09,
        ph: 0.7,
        s: 5,
      },
    ];

    const DT = [
      { x: 0.12, y: 0.3, r: 13, k: 0, c: "#1B1030", d: 1.2 },
      { x: 0.9, y: 0.62, r: 36, k: 1, c: "#fff", d: 0.9 },
      { x: 0.58, y: 0.14, r: 9, k: 0, c: "#fff", d: 1.6 },
    ];

    function crv(P: [number, number][], n: number): [number, number][] {
      const o: [number, number][] = [];
      const m = P.length - 1;
      for (let i = 0; i < m; i++) {
        const a = P[Math.max(i - 1, 0)];
        const b = P[i];
        const cc = P[i + 1];
        const d = P[Math.min(i + 2, m)];
        for (let j = 0; j < n; j++) {
          const t = j / n;
          const t2 = t * t;
          const t3 = t2 * t;
          o.push([
            0.5 *
              (2 * b[0] +
                (cc[0] - a[0]) * t +
                (2 * a[0] - 5 * b[0] + 4 * cc[0] - d[0]) * t2 +
                (3 * b[0] - a[0] - 3 * cc[0] + d[0]) * t3),
            0.5 *
              (2 * b[1] +
                (cc[1] - a[1]) * t +
                (2 * a[1] - 5 * b[1] + 4 * cc[1] - d[1]) * t2 +
                (3 * b[1] - a[1] - 3 * cc[1] + d[1]) * t3),
          ]);
        }
      }
      o.push(P[m]);
      return o;
    }

    function ez(x: number) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function brush(b: BrushDef, U: number, t: number) {
      if (!c) return;
      const P: [number, number][] = b.p.map((q, i) => [
        q[0] * W + Math.sin(t * b.sp * 5 + i * 1.7 + b.s) * 0.03 * W + nx * b.d * 40,
        q[1] * H + Math.cos(t * b.sp * 4 + i * 2.1 + b.s) * 0.03 * H + ny * b.d * 30,
      ]);
      const L = crv(P, 14);
      const n = L.length - 1;
      const cy = red ? 0.5 : (t * b.sp + b.ph) % 1;
      let hd = 1;
      let tl = 0;
      if (cy < 0.4) hd = ez(cy / 0.4);
      else if (cy > 0.7) tl = ez((cy - 0.7) / 0.3);
      const i0 = Math.floor(tl * n);
      const i1 = Math.ceil(hd * n);
      if (i1 - i0 < 1) return;

      const w = b.w * U;
      const L2 = [
        [0.1, -0.09, 1],
        [0.05, -0.045, 0.94],
        [0, 0, 0.88],
      ];
      c.lineCap = "round";
      c.lineJoin = "round";
      for (let kk = 0; kk < 3; kk++) {
        c.strokeStyle = b.c[kk];
        c.lineWidth = w * L2[kk][2];
        c.beginPath();
        for (let i = i0; i <= i1; i++) {
          const X = L[i][0] - w * L2[kk][0];
          const Y = L[i][1] - w * L2[kk][1];
          if (i === i0) c.moveTo(X, Y);
          else c.lineTo(X, Y);
        }
        c.stroke();
      }
    }

    // 7. Custom cursor comet & click bursts
    const ct = cursorCanvasRef.current;
    const cc = ct?.getContext("2d");
    const cr = cursorRingRef.current;
    const rootHtml = document.documentElement;

    let x = -99;
    let y = -99;
    let hx = -99;
    let hy = -99;
    let cursorActive = false;
    let hov = false;
    let ta = 1;
    const N = 14;
    const cl = ["#9E71FF", "#fff", "#C9B2FF", "#5A2FC0"];
    const pts: { x: number; y: number }[] = [];
    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      l: number;
      r: number;
      c: string;
    };
    let ps: Particle[] = [];

    function resizeCursorCanvas() {
      if (!ct || !cc) return;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      ct.width = window.innerWidth * d;
      ct.height = window.innerHeight * d;
      cc.setTransform(d, 0, 0, d, 0, 0);
    }
    resizeCursorCanvas();
    window.addEventListener("resize", resizeCursorCanvas);

    for (let i = 0; i < N; i++) pts.push({ x: -99, y: -99 });

    const handlePointerMoveCursor = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      if (!cursorActive) {
        cursorActive = true;
        hx = x;
        hy = y;
        pts.forEach((q) => {
          q.x = x;
          q.y = y;
        });
        if (cr) cr.style.opacity = "1";
        rootHtml.classList.add("cc-404");
      }
      const target = e.target as HTMLElement | null;
      hov = Boolean(target && target.closest("a,button,.eye"));
      if (cr) cr.classList.toggle("h", hov);
    };

    const handleMouseLeaveRoot = () => {
      cursorActive = false;
      if (cr) cr.style.opacity = "0";
      rootHtml.classList.remove("cc-404");
    };

    const handlePointerUp = () => {
      if (cr) cr.classList.remove("d");
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (fine && cursorActive && cr) cr.classList.add("d");
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16 + Math.random() * 0.4;
        const v = 3 + Math.random() * 6;
        ps.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          l: 1,
          r: 3 + Math.random() * 5,
          c: cl[i % 4],
        });
      }
    };

    if (fine) {
      window.addEventListener("pointermove", handlePointerMoveCursor, {
        passive: true,
      });
      rootHtml.addEventListener("mouseleave", handleMouseLeaveRoot);
      window.addEventListener("pointerup", handlePointerUp);
    }
    window.addEventListener("pointerdown", handlePointerDown);

    // 8. Magnetic buttons
    const btnElements = root.querySelectorAll<HTMLElement>(".btn");
    const cleanupButtons: (() => void)[] = [];
    if (fine) {
      btnElements.forEach((b) => {
        const onBtnMove = (e: PointerEvent) => {
          const a = b.getBoundingClientRect();
          b.style.transform =
            "translate(" +
            (e.clientX - a.left - a.width / 2) * 0.25 +
            "px," +
            (e.clientY - a.top - a.height / 2) * 0.35 +
            "px)";
        };
        const onBtnLeave = () => {
          b.style.transform = "";
        };
        b.addEventListener("pointermove", onBtnMove);
        b.addEventListener("pointerleave", onBtnLeave);
        cleanupButtons.push(() => {
          b.removeEventListener("pointermove", onBtnMove);
          b.removeEventListener("pointerleave", onBtnLeave);
        });
      });
    }

    // 9. Master Animation Loop
    let animId: number;
    function loop(t: number) {
      const s = t / 1000;
      const ap = t - lt > 2500;
      const tx = ap
        ? Math.sin(s * 0.6)
        : (mx / window.innerWidth - 0.5) * 2;
      const ty = ap
        ? Math.cos(s * 0.5) * 0.6
        : (my / window.innerHeight - 0.5) * 2;
      nx += (tx - nx) * 0.05;
      ny += (ty - ny) * 0.05;

      // Hero Canvas Rendering
      if (c && cv) {
        c.clearRect(0, 0, W, H);
        const U = Math.max(W, H * 0.6);
        BR.forEach((b) => brush(b, U, s));
        DT.forEach((d) => {
          const X =
            d.x * W + nx * d.d * 60 + Math.sin(s * 0.8 + d.x * 9) * 12;
          const Y =
            d.y * H + ny * d.d * 45 + Math.cos(s * 0.7 + d.y * 7) * 14;
          c.beginPath();
          c.arc(X, Y, d.r, 0, 7);
          if (d.k) {
            c.strokeStyle = d.c;
            c.lineWidth = 3;
            c.stroke();
          } else {
            c.fillStyle = d.c;
            c.fill();
          }
        });
      }

      // Eye tracking & wandering
      if (eye && pu && big) {
        const r = eye.getBoundingClientRect();
        const fs = parseFloat(getComputedStyle(big).fontSize) || 100;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const d = Math.hypot(dx, dy) || 1;
        const mg = Math.min(d / (window.innerWidth * 0.3), 1);
        const ox = ap
          ? red
            ? 0
            : Math.sin(s * 0.7) * 0.8
          : (dx / d) * mg;
        const oy = ap
          ? red
            ? 0
            : Math.cos(s * 0.5) * 0.5
          : (dy / d) * mg;
        ex += (ox - ex) * 0.14;
        ey += (oy - ey) * 0.14;
        pu.style.transform =
          "translate(" +
          (ex * fs * 0.1).toFixed(2) +
          "px," +
          (ey * fs * 0.1).toFixed(2) +
          "px)";
      }

      // Cursor Canvas Rendering
      if (cc && ct) {
        cc.clearRect(0, 0, window.innerWidth, window.innerHeight);
        if (fine) {
          hx += (x - hx) * 0.3;
          hy += (y - hy) * 0.3;
          if (cr) {
            cr.style.transform =
              "translate3d(" + hx + "px," + hy + "px,0)";
          }
          let pv = { x: hx, y: hy };
          pts.forEach((q) => {
            q.x += (pv.x - q.x) * 0.38;
            q.y += (pv.y - q.y) * 0.38;
            pv = q;
          });
          ta += ((hov || !cursorActive ? 0 : 1) - ta) * 0.2;
          cc.lineWidth = 1.5;
          cc.strokeStyle = "#1B1030";
          if (ta > 0.02) {
            cc.globalAlpha = ta;
            for (let i = N - 1; i >= 0; i--) {
              cc.fillStyle = cl[0];
              cc.beginPath();
              cc.arc(pts[i].x, pts[i].y, Math.max(1.5, 8 - i * 0.48), 0, 7);
              cc.fill();
              cc.stroke();
            }
            cc.globalAlpha = 1;
          }
        }
        ps = ps.filter((q) => q.l > 0);
        cc.lineWidth = 1.5;
        cc.strokeStyle = "#1B1030";
        ps.forEach((q) => {
          q.x += q.vx;
          q.y += q.vy;
          q.vy += 0.18;
          q.vx *= 0.97;
          q.l -= 0.025;
          cc.fillStyle = q.c;
          cc.beginPath();
          cc.arc(q.x, q.y, Math.max(0, q.r * q.l), 0, 7);
          cc.fill();
          cc.stroke();
        });
      }

      animId = requestAnimationFrame(loop);
    }
    animId = requestAnimationFrame(loop);

    // 10. Footer Wordmark sizing
    const w = wordmarkRef.current;
    function fitWordmark() {
      if (!w) return;
      w.style.fontSize = "100px";
      const range = document.createRange();
      range.selectNodeContents(w);
      const tWidth = range.getBoundingClientRect().width;
      const cw = w.clientWidth;
      if (tWidth > 0 && cw > 0) {
        w.style.fontSize = Math.floor((100 * (cw - 2)) / tWidth) + "px";
      }
    }
    fitWordmark();
    window.addEventListener("resize", fitWordmark);
    if (document.fonts?.ready) {
      document.fonts.ready.then(fitWordmark);
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(animId);
      if (typeTimer) clearTimeout(typeTimer);
      if (scrambleTimer) clearTimeout(scrambleTimer);
      clearTimeout(initialScrambleTimer);

      document.body.classList.remove("is-404", "go", "typed");
      rootHtml.classList.remove("cc-404");

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resizeHeroCanvas);
      window.removeEventListener("resize", resizeCursorCanvas);
      window.removeEventListener("resize", fitWordmark);

      if (fine) {
        window.removeEventListener("pointermove", handlePointerMoveCursor);
        rootHtml.removeEventListener("mouseleave", handleMouseLeaveRoot);
        window.removeEventListener("pointerup", handlePointerUp);
      }
      window.removeEventListener("pointerdown", handlePointerDown);

      eye?.removeEventListener("click", handleEyeClick);
      ttlElement?.removeEventListener("mouseenter", handleTitleMouseEnter);

      cleanupButtons.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`dcc-404-root ${anton.variable} ${dmSans.variable}`}
    >
      <header className="hero" id="hero">
        <canvas id="hg" ref={heroCanvasRef} aria-hidden="true" />
        <div className="grain" aria-hidden="true" />

        {/* Rotating Badge */}
        <svg className="bdg" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path
              id="cp"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            fontSize="19"
            fontWeight="700"
            fill="#1B1030"
            fontFamily="var(--font-dm), 'DM Sans', sans-serif"
          >
            <textPath href="#cp" textLength="480" lengthAdjust="spacing">
              ERROR 404 • LOST IN THE DOT COM •
            </textPath>
          </text>
          <circle cx="100" cy="100" r="14" fill="#1B1030" />
        </svg>

        <div className="in">
          {/* Address Pill */}
          <div className="pill up" style={{ ["--dl" as string]: ".1s" }}>
            <b />
            <span id="ad" ref={addressRef} />
            <u />
            <s>404</s>
          </div>

          {/* 4[Eye]4 */}
          <h1 className="big" aria-label="404">
            <span className="ch" style={{ ["--dl" as string]: ".15s" }}>
              <i>4</i>
            </span>
            <span className="ch" style={{ ["--dl" as string]: ".27s" }}>
              <i>
                <span
                  className="eye"
                  id="eye"
                  ref={eyeRef}
                  role="img"
                  aria-label="Eye following your cursor"
                >
                  <span className="pu" id="pu" ref={pupilRef} />
                </span>
              </i>
            </span>
            <span className="ch" style={{ ["--dl" as string]: ".39s" }}>
              <i>4</i>
            </span>
          </h1>

          {/* Scramble Title */}
          <h2 className="ttl up" style={{ ["--dl" as string]: ".55s" }}>
            <span id="tt" ref={titleTextRef}>
              Page not found
            </span>
            <b className="od" />
          </h2>

          <p className="up" style={{ ["--dl" as string]: ".65s" }}>
            You&apos;ve ventured into uncharted digital territory. This page doesn&apos;t exist or has been moved.
          </p>

          <div className="cta up" style={{ ["--dl" as string]: ".75s" }}>
            <Link className="btn dk" href="/">
              Go Home
            </Link>
            <button
              type="button"
              className="btn wh"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
            >
              Go Back
            </button>
          </div>

          <div className="hint up" style={{ ["--dl" as string]: ".9s" }}>
            Psst… the 0 is watching you
          </div>
        </div>
      </header>

      {/* 404 Custom Footer */}
      <footer className="dcc-404-footer">
        <div className="wrap">
          <div>
            <Link className="logo" href="/" aria-label="Dot Com Club, est. 2014">
              <span className="lw">
                Dot<i />
                <br />
                Com
                <br />
                Club
              </span>
              <small>Est. 2014</small>
            </Link>
            <p className="tag">
              Empowering digital creativity and innovation through technology.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/events">Events</Link>
            <Link href="/about-us">About Us</Link>
            <Link href="/sponsors">Sponsors</Link>
            <Link href="/teams">Teams</Link>
            <Link href="/magazines">Magazines</Link>
            <Link href="/contact-us">Contact Us</Link>
            <Link href="/ewaste-26">E-waste</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>

          <div>
            <h4>Connect</h4>
            <a
              href="https://www.instagram.com/dotcomclubjhc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@JhcDcc/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10 9l5 3-5 3z" fill="currentColor" />
              </svg>
              YouTube
            </a>
            <a
              href="https://www.linkedin.com/company/dotcomclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 9v11M4 4v.01M9 20v-7a3 3 0 016 0v7M9 9v11" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:jhcdotcomclub.official@gmail.com">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Email
            </a>
          </div>

          <div className="wm" id="wm" ref={wordmarkRef} aria-hidden="true">
            dotcomclub<i>.</i>com
          </div>
          <div className="copy">
            &copy; 2026 DCC &bull; Brought to life by DCC Web&#8209;Ops Team
          </div>
        </div>
      </footer>

      {/* Comet Cursor Canvas & Ring Element */}
      <canvas id="dcc-ct" ref={cursorCanvasRef} aria-hidden="true" />
      <div className="dcc-cr" id="cr" ref={cursorRingRef}>
        <i />
      </div>
    </div>
  );
}
