"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  dmSansFull as dmSans,
  instrumentSerif,
  jetbrainsMono,
  vt323,
} from "@/fonts/font";
import gsap from "gsap";
import { animate } from "motion";
import "../../cyberstrike-26/cyberstrike.css";
import "./esports.css";
import "../events.css";
import { CyberstrikeFooter } from "@/components/cyberstrike/CyberstrikeFooter";

const VS =
  "attribute vec2 a;varying vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}";
const FS = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float;",
  "#endif",
  "uniform vec2 uRes,uCss,uM;uniform float uT,uMS,uCover,uSweep,uBeam,uBeamH,uBeamLen,uSurge,uTear,uStatic,uAmb,uRgb,uVH;uniform vec3 uRip[4];varying vec2 vUv;",
  "float h2(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
  "float sq(float x){return x*x;}",
  "void main(){",
  " float asp=uCss.x/uCss.y;",
  " vec2 c=vUv*2.0-1.0;c*=1.0+0.045*dot(c,c)*uCover;vec2 uv=c*0.5+0.5;",
  " float outside=step(min(min(uv.x,uv.y),min(1.0-uv.x,1.0-uv.y)),0.0)*uCover;",
  " float ft=floor(uT*24.0);",
  " float band=floor(uv.y*30.0);",
  " float bn=h2(vec2(band,ft));",
  " float tOn=step(0.72,bn);",
  " float tx=(h2(vec2(band+9.0,ft))-0.5)*0.4*uTear*tOn;",
  " vec2 p=uv;p.x+=tx;",
  " vec2 d=uv-uM;d.x*=asp;float r=length(d);",
  " float fall=exp(-r*r*16.0)*uMS;",
  " p.x+=sin(uv.y*70.0+uT*9.0)*0.010*fall;",
  " float rip=0.0;",
  " for(int i=0;i<4;i++){vec2 dd=uv-uRip[i].xy;dd.x*=asp;float rr=length(dd);float a=uRip[i].z;float w=exp(-sq((rr-a*0.55)/0.045))*(1.0-a)*step(a,0.999);rip+=w;p+=dd/(rr+0.001)*w*0.015*vec2(1.0/asp,1.0);}",
  " float sp=uRgb*0.006+fall*0.02+rip*0.02;",
  " vec2 g=uRes*0.5;",
  " float nR=h2(floor((p+vec2(sp,0.0))*g)+ft*17.0);",
  " float nG=h2(floor(p*g)+ft*17.0+3.0);",
  " float nB=h2(floor((p-vec2(sp,0.0))*g)+ft*17.0+7.0);",
  " float dens=uStatic+fall*0.16+rip*0.35;",
  " vec3 st=smoothstep(vec3(1.0-dens),vec3(1.0),vec3(nR,nG,nB));",
  " st=mix(vec3(st.g),st,clamp(uRgb*0.25+fall*3.0+rip*3.0,0.0,1.0));",
  " float lines=uCss.y/4.0;",
  " float sl=0.5+0.5*sin((p.y+fall*0.003*sin(uv.x*18.0))*lines*6.2831);",
  " float by=fract(1.0-uT*0.05-uVH);",
  " float bd=uv.y-by;",
  " float bandM=exp(-bd*bd/0.00018);",
  " float bn2=h2(vec2(floor(p.x*uRes.x/5.0)+ft,floor(uv.y*uRes.y/2.0)));",
  " vec3 vhs=vec3(bandM*smoothstep(0.5,1.0,bn2)*0.75);",
  " float bh=uBeamH;",
  " float lm=1.0-smoothstep(uBeamLen*0.85,uBeamLen,abs(uv.x-0.5)*2.0);",
  " float y0=uv.y-0.5;",
  " vec3 beam=vec3(exp(-sq((y0-bh*0.8)/bh)),exp(-sq(y0/bh)),exp(-sq((y0+bh*0.8)/bh)))*lm;",
  " beam+=exp(-abs(y0)/(bh*14.0+0.003))*0.12*lm;",
  " beam*=uBeam;",
  " vec3 tb=vec3(step(0.8,bn)*step(0.5,h2(vec2(band,ft+3.0)))*uTear*0.28);",
  " vec3 intro=st*0.6*mix(0.55,1.0,sl)+vhs*0.6+beam+tb+vec3(uSurge);",
  " float vig=smoothstep(0.55,1.25,length(c));",
  " intro*=1.0-vig*0.7;",
  " intro=mix(intro,vec3(0.0),outside);",
  " float ad=uAmb*(0.2*(1.0-sl)+0.5*vig*vig);",
  " vec3 amb=st*uAmb*0.09+vhs*uAmb*0.1;",
  " float aA=clamp(ad+max(amb.r,max(amb.g,amb.b)),0.0,1.0);",
  " vec4 ambient=vec4(amb,aA);",
  " float blk=h2(floor(uv*uCss/12.0)+floor(uT*18.0));",
  " float blk2=h2(floor(uv*uCss/12.0)+floor(uT*18.0)+11.0);",
  " float x2=uv.x+(blk-0.5)*0.16+(h2(vec2(floor(uv.y*uCss.y/12.0),5.0))-0.5)*0.12;",
  " float dd2=x2-uSweep;",
  " vec4 col;",
  " if(dd2>0.0){col=vec4(intro,1.0);}",
  " else{",
  "  float t1=smoothstep(-0.16,0.0,dd2);",
  "  float on=step(1.0-t1*0.95,blk2);",
  "  vec3 nc=mix(vec3(0.92),vec3(0.43,0.95,1.0),step(0.82,blk));",
  "  nc=mix(nc,vec3(0.61,0.42,1.0),step(0.94,blk2));",
  "  col=mix(ambient,vec4(nc,1.0),on);",
  " }",
  " gl_FragColor=col;",
  "}",
].join("\n");

const feeds = [
  {
    id: "bgmi",
    number: "01",
    name: "BGMI",
    fee: "Free (Krafton Sponsored)",
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
    fee: "₹1,000 / team",
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
    fee: "₹50 / player",
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
    fee: "₹100 / player",
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
    fee: "Free",
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [openFeed, setOpenFeed] = useState<string | null>(null);
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

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;

    let disposed = false;
    let rafId: number | null = null;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];

    const safeTimeout = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!disposed) fn();
      }, ms);
      timeouts.push(id);
      return id;
    };

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (rm) rootEl.classList.add("rm");

    // WebGL Canvas Ambient Loop
    let gl: WebGLRenderingContext | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    const rip = new Float32Array(12);
    const ripT = [0, 0, 0, 0];
    let ripI = 0;
    let scale = 1;

    rip[2] = rip[5] = rip[8] = rip[11] = 1;

    const S = {
      cover: 0,
      sweep: 3,
      beam: 0,
      beamH: 0.002,
      beamLen: 1,
      surge: 0,
      tear: 0,
      stat: 0.012,
      amb: 1,
      rgb: 0.3,
      vh: 0,
      ms: 0,
    };

    const P = { x: 0.5, y: 0.5, has: false, last: 0, down: false, vx: 0, vy: 0 };
    const X = { x: 0.5, y: 0.5 };
    let T = 0;
    let pulseT = 0;
    let lastY = window.scrollY;

    const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

    const setP = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      P.vx = x - P.x;
      P.vy = y - P.y;
      P.x = x;
      P.y = y;
      P.has = true;
      P.last = T;
    };

    const addRipple = (x: number, y: number) => {
      rip[ripI * 3] = x;
      rip[ripI * 3 + 1] = y;
      rip[ripI * 3 + 2] = 0;
      ripT[ripI] = T;
      ripI = (ripI + 1) % 4;
    };

    const handlePointerMove = (e: PointerEvent) => setP(e);
    const handlePointerDown = (e: PointerEvent) => {
      setP(e);
      P.down = true;
      const target = e.target as HTMLElement | null;
      if (target?.closest("button") || target?.closest("a")) return;
      addRipple(P.x, P.y);
    };
    const handlePointerUp = () => {
      P.down = false;
    };
    const handlePointerLeave = () => {
      P.has = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    const initGL = () => {
      if (!canvas) return false;
      try {
        gl = canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        if (!gl) return false;
        const sh = (t: number, s: string) => {
          if (!gl) throw new Error("no gl");
          const o = gl.createShader(t);
          if (!o) throw new Error("shader create failed");
          gl.shaderSource(o, s);
          gl.compileShader(o);
          if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
            const err = gl.getShaderInfoLog(o);
            gl.deleteShader(o);
            throw new Error(err || "compile error");
          }
          return o;
        };
        const p = gl.createProgram();
        if (!p) return false;
        gl.attachShader(p, sh(gl.VERTEX_SHADER, VS));
        gl.attachShader(p, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return false;
        gl.useProgram(p);

        const b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
          gl.STATIC_DRAW
        );
        const a = gl.getAttribLocation(p, "a");
        gl.enableVertexAttribArray(a);
        gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

        [
          "uRes",
          "uCss",
          "uM",
          "uT",
          "uMS",
          "uCover",
          "uSweep",
          "uBeam",
          "uBeamH",
          "uBeamLen",
          "uSurge",
          "uTear",
          "uStatic",
          "uAmb",
          "uRgb",
          "uVH",
          "uRip",
        ].forEach((n) => {
          if (gl) U[n] = gl.getUniformLocation(p, n);
        });
        return true;
      } catch {
        return false;
      }
    };

    const resize = () => {
      if (!canvas || !gl) return;
      scale = clamp(Math.min(window.devicePixelRatio || 1, 1.5), 0.75, 1.5);
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    if (!rm && canvas) {
      if (!initGL()) rootEl.classList.add("nogl");
      resize();
      window.addEventListener("resize", resize);
    } else {
      rootEl.classList.add("nogl");
    }

    const ambient = (dt: number) => {
      const sp = Math.hypot(P.vx, P.vy) * 60;
      P.vx *= 0.88;
      P.vy *= 0.88;
      const targetMS = P.has ? clamp(sp * 0.18 + (P.down ? 0.35 : 0.08), 0, 0.7) : 0;
      S.ms += (targetMS - S.ms) * 0.08;

      const idle = (T - P.last) / 1000;
      let tx = P.x;
      let ty = P.y;
      if (!P.has || idle > 2.2) {
        const t = T / 1000;
        tx = 0.5 + Math.sin(t * 0.35) * 0.28 + Math.cos(t * 0.77) * 0.08;
        ty = 0.5 + Math.cos(t * 0.29) * 0.22 + Math.sin(t * 0.61) * 0.06;
      }
      X.x += (tx - X.x) * 0.05;
      X.y += (ty - X.y) * 0.05;

      const sy = window.scrollY;
      const scrollV = Math.abs(sy - lastY) / Math.max(16, dt);
      lastY = sy;
      if (scrollV > 0.35) {
        pulseT = Math.min(1, pulseT + scrollV * 0.04);
      }
      pulseT *= 0.93;

      S.rgb = 0.25 + clamp(sp, 0, 2) * 0.6 + pulseT * 4;
      S.stat = 0.012 + pulseT * 0.12;
    };

    const draw = () => {
      if (!gl || !canvas) return;
      gl.uniform2f(U.uRes!, canvas.width, canvas.height);
      gl.uniform2f(U.uCss!, window.innerWidth, window.innerHeight);
      gl.uniform2f(U.uM!, X.x, X.y);
      gl.uniform1f(U.uT!, T / 1000);
      gl.uniform1f(U.uMS!, S.ms);
      gl.uniform1f(U.uCover!, S.cover);
      gl.uniform1f(U.uSweep!, S.sweep);
      gl.uniform1f(U.uBeam!, S.beam);
      gl.uniform1f(U.uBeamH!, S.beamH || 0.002);
      gl.uniform1f(U.uBeamLen!, S.beamLen || 1);
      gl.uniform1f(U.uSurge!, S.surge);
      gl.uniform1f(U.uTear!, S.tear);
      gl.uniform1f(U.uStatic!, S.stat);
      gl.uniform1f(U.uAmb!, S.amb);
      gl.uniform1f(U.uRgb!, S.rgb);
      gl.uniform1f(U.uVH!, S.vh);
      gl.uniform3fv(U.uRip!, rip);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let last = 0;
    let fc = 0;
    const frame = (now: number) => {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last || 16);
      last = now;
      T += dt;
      if (fc++ & 1) return;
      ambient(dt * 2);
      for (let r = 0; r < 4; r++) {
        const a = rip[r * 3 + 2];
        if (a < 1) {
          const newA = (T - ripT[r]) / 1100;
          rip[r * 3 + 2] = Math.min(1, newA);
        }
      }
      if (gl) draw();
    };

    if (!rm) {
      rafId = requestAnimationFrame((n) => {
        last = n;
        frame(n);
      });
    }

    // Corrupted Signal Cursor
    const SEL =
      "a[href],button,[role=button],[data-magnetic],input,select,textarea,summary,label[for]";
    const PAD = 34;

    if (!coarse && cursor && typeof window !== "undefined") {
      const q = (s: string) => cursor.querySelector<HTMLElement>(s);
      const qa = (s: string) => Array.from(cursor.querySelectorAll<HTMLElement>(s));
      const xw = q(".cs-xw");
      const xr = q(".cs-xr");
      const rw = q(".cs-rw");
      const rr = q(".cs-rr");
      const fl = q(".cs-fl");
      const rwS = rw?.querySelector<HTMLElement>(".scl");
      const rrS = rr?.querySelector<HTMLElement>(".scl");
      const rwI = rw?.querySelector<HTMLElement>("i");
      const rrI = rr?.querySelector<HTMLElement>("i");
      const sl = qa(".cs-sl");
      const fr = qa(".cs-fr");
      let si = 0;
      let fi = 0;

      if (xw && xr && rw && rr) {
        gsap.set([xw, xr, rw, rr], { xPercent: -50, yPercent: -50, x: -200, y: -200 });
        const tw = rm ? 0.04 : 0.22;
        const tr = rm ? 0.05 : 0.34;
        const sxw = gsap.quickSetter(xw, "x", "px");
        const syw = gsap.quickSetter(xw, "y", "px");
        const sxr = gsap.quickTo(xr, "x", { duration: rm ? 0.04 : 0.09, ease: "power2.out" });
        const syr = gsap.quickTo(xr, "y", { duration: rm ? 0.04 : 0.09, ease: "power2.out" });
        const rxw = gsap.quickTo(rw, "x", { duration: tw, ease: "power3.out" });
        const ryw = gsap.quickTo(rw, "y", { duration: tw, ease: "power3.out" });
        const rxr = gsap.quickTo(rr, "x", { duration: tr, ease: "power3.out" });
        const ryr = gsap.quickTo(rr, "y", { duration: tr, ease: "power3.out" });

        let vis = false;
        let over: HTMLElement | null = null;
        let cands: HTMLElement[] = [];
        let lx = 0;
        let ly = 0;
        let lt = 0;
        let mx = 0;
        let my = 0;
        let moved = 0;
        let acc = 0;
        let ft = 0;
        let gc = 0;

        document.documentElement.classList.add("cs-on");

        const refreshCands = () => {
          cands = Array.from(document.querySelectorAll<HTMLElement>(SEL)).filter(
            (e) => e.offsetWidth > 0 && e.offsetHeight > 0
          );
        };

        const magnet = (x: number, y: number): [number, number] => {
          let best: DOMRect | null = null;
          let bd = 1e9;
          if (over) {
            best = over.getBoundingClientRect();
            bd = 0;
          } else {
            for (let i = 0; i < cands.length; i++) {
              const r = cands[i].getBoundingClientRect();
              const dx = Math.max(r.left - x, 0, x - r.right);
              const dy = Math.max(r.top - y, 0, y - r.bottom);
              const dd = Math.hypot(dx, dy);
              if (dd < bd) {
                bd = dd;
                best = r;
              }
            }
          }
          if (!best || bd > PAD) return [x, y];
          const k = over ? 0.26 : 0.2 * (1 - bd / PAD);
          const cap = over ? 14 : 9;
          let ox = (best.left + best.width / 2 - x) * k;
          let oy = (best.top + best.height / 2 - y) * k;
          const len = Math.hypot(ox, oy);
          if (len > cap) {
            ox *= cap / len;
            oy *= cap / len;
          }
          return [x + ox, y + oy];
        };

        const hoverScale = (v: number) => {
          if (rwS && rrS) {
            [rwS, rrS].forEach((e, i) => {
              animate(e, { scale: i ? v * 1.06 : v }, { type: "spring", stiffness: 380, damping: 26 });
            });
          }
        };

        const glitch = (big: boolean) => {
          if (rm || !vis) return;
          for (let i = 0; i < (big ? 3 : 2); i++) {
            const el = sl[si++ % sl.length];
            if (!el) continue;
            const w = 24 + Math.random() * (big ? 110 : 70);
            gsap.killTweensOf(el);
            gsap.set(el, {
              width: w,
              height: Math.random() < 0.5 ? 1 : 2,
              x: mx - w / 2 + (Math.random() - 0.5) * 50,
              y: my + (Math.random() - 0.5) * 34,
              backgroundColor: Math.random() < 0.78 ? "#9b6bff" : "#6ef2ff",
              opacity: 0.9,
            });
            gsap.to(el, {
              opacity: 0,
              x: "+=" + (Math.random() - 0.5) * 40,
              duration: 0.07 + Math.random() * 0.06,
              ease: "steps(2)",
            });
          }
          if (rwI) {
            gsap.fromTo(
              rwI,
              { skewX: (Math.random() - 0.5) * 28 },
              { skewX: 0, duration: 0.14, ease: "steps(3)", overwrite: "auto" }
            );
          }
          if (rrI) {
            gsap.fromTo(
              rrI,
              { x: (Math.random() < 0.5 ? -1 : 1) * (4 + Math.random() * 4) },
              { x: 0, duration: 0.16, ease: "steps(3)", overwrite: "auto" }
            );
          }
        };

        const frag = (x: number, y: number) => {
          const el = fr[fi++ % fr.length];
          if (!el) return;
          const s = 2 + ((Math.random() * 2) | 0);
          gsap.killTweensOf(el);
          gsap.set(el, {
            width: s,
            height: s,
            x: x + (Math.random() - 0.5) * 30,
            y: y + (Math.random() - 0.5) * 22,
            backgroundColor: Math.random() < 0.6 ? "#9b6bff" : "#efe9ff",
            opacity: 0.85,
          });
          gsap.to(el, {
            opacity: 0,
            x: "+=" + (Math.random() - 0.5) * 14,
            duration: 0.2 + Math.random() * 0.15,
            ease: "steps(3)",
          });
        };

        const cursorEnter = () => {
          cursor.classList.add("hv");
          hoverScale(1.48);
          glitch(false);
        };
        const cursorLeave = () => {
          cursor.classList.remove("hv");
          hoverScale(1);
        };

        const cursorHide = () => {
          vis = false;
          cursor.classList.remove("on");
          if (over) {
            over = null;
            cursorLeave();
          }
        };

        const onPointerMoveCursor = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const x = e.clientX;
          const y = e.clientY;
          const now = performance.now();
          const dt = Math.max(1, now - lt);
          const sp = Math.hypot(x - lx, y - ly) / dt;
          lx = x;
          ly = y;
          lt = now;
          moved = now;

          if (!vis) {
            vis = true;
            cursor.classList.add("on");
            refreshCands();
          }

          const target = e.target as HTMLElement | null;
          const newOver = target ? target.closest<HTMLElement>(SEL) : null;
          if (newOver !== over) {
            if (over) cursorLeave();
            over = newOver;
            if (over) cursorEnter();
          }

          const [tx, ty] = magnet(x, y);
          mx = tx;
          my = ty;

          sxw(tx);
          syw(ty);
          sxr(tx);
          syr(ty);
          rxw(tx);
          ryw(ty);
          rxr(tx);
          ryr(ty);

          if (!rm) {
            acc += sp * dt;
            if (acc > 340) {
              acc = 0;
              frag(x, y);
            }
            if (sp > 3.2 && now - ft > 120 && gc++ < 4) {
              ft = now;
              glitch(false);
              safeTimeout(() => {
                gc = Math.max(0, gc - 1);
              }, 400);
            }
          }
        };

        const onPointerDownCursor = (e: PointerEvent) => {
          if (e.pointerType === "touch" || e.button > 0 || !vis) return;
          cursor.classList.add("dn");
          if (fl) {
            gsap.killTweensOf(fl);
            gsap.fromTo(
              fl,
              { opacity: 0.16 },
              { opacity: 0, duration: 0.28, ease: "power2.out" }
            );
          }
          if (rwS && rrS) {
            [rwS, rrS].forEach((el) => {
              gsap.timeline({ overwrite: "auto" })
                .to(el, { scale: 0.72, duration: 0.05, ease: "power2.out" })
                .to(el, { scale: over ? 1.48 : 1, duration: 0.26, ease: "elastic.out(1, 0.45)" });
            });
          }
          if (rwI) {
            gsap
              .timeline({ overwrite: "auto" })
              .fromTo(
                rwI,
                { scaleX: 1, scaleY: 1 },
                { scaleX: 1.45, scaleY: 0.45, duration: 0.05, ease: "power2.out" }
              )
              .to(rwI, { scaleX: 1, scaleY: 1, duration: 0.22, ease: "elastic.out(1, 0.5)" });
          }
          if (rrI) {
            gsap.fromTo(
              rrI,
              { x: -6, scaleX: 1.2 },
              { x: 0, scaleX: 1, duration: 0.2, ease: "steps(4)", overwrite: "auto" }
            );
          }
          glitch(true);
        };

        const onPointerUpCursor = () => {
          safeTimeout(() => cursor.classList.remove("dn"), 90);
        };

        window.addEventListener("pointermove", onPointerMoveCursor, { passive: true });
        window.addEventListener("pointerdown", onPointerDownCursor, { passive: true });
        window.addEventListener("pointerup", onPointerUpCursor, { passive: true });
        window.addEventListener("pointercancel", onPointerUpCursor, { passive: true });
        document.documentElement.addEventListener("mouseleave", cursorHide);
        window.addEventListener("blur", cursorHide);
        window.addEventListener("resize", refreshCands);

        const candInterval = setInterval(refreshCands, 2500);
        intervals.push(candInterval);

        // Ambient periodic cursor twitch
        const loopTwitch = () => {
          if (disposed) return;
          safeTimeout(() => {
            if (vis && performance.now() - moved < 1400) glitch(false);
            loopTwitch();
          }, 2400 + Math.random() * 3200);
        };
        if (!rm) loopTwitch();
      }
    }

    // Ambient + hover glitch on headings (default automatic cyber glitch)
    let removePointerOver: (() => void) | null = null;
    if (!rm && rootEl) {
      const isVisible = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      };
      const fireGlx = (el: HTMLElement | null) => {
        if (!el || el.classList.contains("glx")) return;
        el.classList.add("glx");
        safeTimeout(() => {
          el.classList.remove("glx");
        }, 420);
      };

      const tickGlitch = () => {
        if (disposed) return;
        if (!document.hidden && rootEl) {
          const all = Array.from(rootEl.querySelectorAll<HTMLElement>(".ph, .fdn")).filter(isVisible);
          if (all.length) {
            const count = 1 + (Math.random() < 0.35 ? 1 : 0);
            for (let i = 0; i < count; i++) {
              fireGlx(all[Math.floor(Math.random() * all.length)]);
            }
          }
        }
        safeTimeout(tickGlitch, 1800 + Math.random() * 2600);
      };
      safeTimeout(tickGlitch, 2200);

      const onPointerOver = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const target = e.target as HTMLElement | null;
        const h = target?.closest(".ph, .fdn") as HTMLElement | null;
        if (!h || h.contains(e.relatedTarget as Node | null)) return;
        fireGlx(h);
      };
      document.addEventListener("pointerover", onPointerOver as EventListener);
      removePointerOver = () => {
        document.removeEventListener("pointerover", onPointerOver as EventListener);
      };
    }

    return () => {
      disposed = true;
      if (removePointerOver) removePointerOver();
      timeouts.forEach((id) => clearTimeout(id));
      intervals.forEach((id) => clearInterval(id));
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("cs-on");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cs26-root esports-reference ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}
    >
      <div className="crt" aria-hidden="true" />
      <canvas id="fx" ref={canvasRef} aria-hidden="true" />

      {/* Corrupted Signal cursor */}
      <div id="cs" ref={cursorRef} aria-hidden="true">
        <span className="cs-fl" />
        <span className="cs-ring cs-rr">
          <span className="scl">
            <i />
          </span>
        </span>
        <span className="cs-ring cs-rw">
          <span className="scl">
            <i />
          </span>
        </span>
        <svg className="cs-x cs-xr" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5v5M10 13.5v5M1.5 10h5M13.5 10h5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect x="9.5" y="9.5" width="1" height="1" fill="currentColor" />
        </svg>
        <svg className="cs-x cs-xw" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M10 1.5v5M10 13.5v5M1.5 10h5M13.5 10h5"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect x="9.5" y="9.5" width="1" height="1" fill="currentColor" />
        </svg>
        <span className="cs-sl" />
        <span className="cs-sl" />
        <span className="cs-sl" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
        <span className="cs-fr" />
      </div>

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
              <h1 className="ph disp" aria-label="E-Sports">
                E-Sports
              </h1>
              <p className="pin">
                Five tournaments. Report 15–20 minutes before your match, play on registered accounts,
                no cheats, macros or collusion. Check each feed for entry fee and match details.
              </p>
            </header>

            <ol className="fds">
              {feeds.map((feed, index) => (
                <li
                  className="fd"
                  key={feed.id}
                  style={
                    {
                      "--i": index,
                      "--dx": index % 2 === 0 ? "-.7" : ".6",
                    } as React.CSSProperties
                  }
                >
                  <span className="fdi mono-n">
                    <small className="mono">Feed</small>
                    {feed.number}
                  </span>
                  <div className="fdm">
                    <h2 className="fdn">
                      {feed.name}
                    </h2>
                    <Link className="rgb" href={`/events/esports/${feed.id}`}>
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
                        <dt>{feed.id === "real-cricket" ? "Entry" : "Team"}</dt>
                        <dd>
                          {feed.id === "bgmi"
                            ? "4 players + 1 sub"
                            : feed.id === "valorant"
                            ? "5 players + 1 sub"
                            : "Solo"}
                        </dd>
                      </div>
                      <div>
                        <dt>Fee</dt>
                        <dd>{feed.fee}</dd>
                      </div>
                      <div>
                        <dt>Venue</dt>
                        <dd>{feed.venue}</dd>
                      </div>
                    </dl>
                    <button
                      className="rb mono"
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => setOpenFeed(feed.id)}
                    >
                      Description<i aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <CyberstrikeFooter />

      <dialog
        className="sht"
        ref={dialogRef}
        aria-labelledby="feed-description-title"
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
              <button className="sh-x mono" type="button" onClick={closeDialog}>
                Close<i aria-hidden="true" />
              </button>
            </header>
            <div className="sh-b" tabIndex={-1}>
              <h3 id="feed-description-title">{activeFeed.name}</h3>
              <p className="cn">{activeFeed.description}</p>
              <dl className="rd">
                <div>
                  <dt>{activeFeed.id === "real-cricket" ? "Entry" : "Team"}</dt>
                  <dd>
                    {activeFeed.id === "bgmi"
                      ? "4 players + 1 sub"
                      : activeFeed.id === "valorant"
                      ? "5 players + 1 sub"
                      : "Solo"}
                  </dd>
                </div>
                <div>
                  <dt>Fee</dt>
                  <dd>{activeFeed.fee}</dd>
                </div>
                <div>
                  <dt>Venue</dt>
                  <dd>{activeFeed.venue}</dd>
                </div>
              </dl>
              <h4 className="mono">Rules</h4>
              <ol className="rls">
                {activeFeed.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>
            <footer className="sh-f">
              <Link className="rgb" href={`/events/esports/${activeFeed.id}`}>
                <span>
                  <i className="pd" aria-hidden="true" />
                  Register<em className="fn"> for {activeFeed.name}</em>
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
