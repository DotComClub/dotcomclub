"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  dmSansFull as dmSans,
  instrumentSerif,
  jetbrainsMono,
  vt323,
} from "@/fonts/font";
import gsap from "gsap";
import { animate } from "motion";
import "../cyberstrike-26/cyberstrike.css";
import "./events.css";

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

const EventsPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const watermarkRef = useRef<HTMLSpanElement | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

    // Sliced type helper
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const sliceType = (el: HTMLElement, n: number) => {
      if (el.dataset.eventsSliced === "true") return;
      const html = el.innerHTML;
      el.dataset.eventsSliced = "true";
      el.innerHTML = "";
      el.classList.add("sl");
      const b = document.createElement("span");
      b.className = "b";
      b.innerHTML = html;
      el.appendChild(b);
      const cuts = [0];
      for (let i = 1; i < n; i++) cuts.push((i / n) * 100 + rnd(-4, 4));
      cuts.push(100);
      for (let k = 0; k < n; k++) {
        const s = document.createElement("span");
        s.className = "s";
        s.setAttribute("aria-hidden", "true");
        s.innerHTML = html;
        s.style.clipPath =
          "inset(" + (cuts[k] - 0.5) + "% 0% " + (100 - cuts[k + 1] - 0.5) + "% 0%)";
        s.style.setProperty("--dx", (Math.random() * 2 - 1).toFixed(3));
        s.style.setProperty("--dy", (Math.random() * 2 - 1).toFixed(3));
        s.style.setProperty("--r", Math.random().toFixed(3));
        el.appendChild(s);
      }
    };

    rootEl.querySelectorAll<HTMLElement>("[data-sl]").forEach((e) => {
      sliceType(e, 7);
    });

    rootEl.querySelectorAll<HTMLElement>("main .sl").forEach((e) => {
      e.style.setProperty("--ca", "2");
    });

    // Scroll reveal glitch
    const glitchEls = rootEl.querySelectorAll<HTMLElement>("[data-glitch]");
    if (!rm && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.remove("pre");
              const target = en.target as HTMLElement;
              target.classList.add("glx");
              target.querySelectorAll<HTMLElement>(".sl").forEach((s) => s.classList.add("glx"));
              safeTimeout(() => {
                target.classList.remove("glx");
                target.querySelectorAll<HTMLElement>(".sl").forEach((s) => s.classList.remove("glx"));
              }, 420);
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      glitchEls.forEach((g) => {
        g.classList.remove("pre");
        io.observe(g);
      });
    }

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
            throw new Error(gl.getShaderInfoLog(o) || "shader compile error");
          }
          return o;
        };
        const pr = gl.createProgram();
        if (!pr) throw new Error("program failed");
        gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
        gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(pr);
        if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error("link failed");
        gl.useProgram(pr);
        const b = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, b);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
          gl.STATIC_DRAW
        );
        const a = gl.getAttribLocation(pr, "a");
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
        ].forEach((n) => {
          if (gl) U[n] = gl.getUniformLocation(pr, n);
        });
        U.uRip = gl.getUniformLocation(pr, "uRip[0]");
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        return true;
      } catch {
        gl = null;
        return false;
      }
    };

    const resize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      scale = coarse ? 0.4 : w > 1600 ? 0.4 : 0.55;
      canvas.width = Math.max(2, Math.round(w * scale));
      canvas.height = Math.max(2, Math.round(h * scale));
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };

    if (!rm && canvas) {
      if (!initGL()) rootEl.classList.add("nogl");
      resize();
      window.addEventListener("resize", resize);
    } else {
      rootEl.classList.add("nogl");
    }

    const ambient = (dt: number) => {
      S.cover = 0;
      S.sweep = 3;
      S.beam = 0;
      S.amb = 1;
      const tx = P.has ? P.x : 0.5;
      const ty = P.has ? P.y : 0.5;
      X.x += (tx - X.x) * 0.15;
      X.y += (ty - X.y) * 0.15;
      S.ms += ((P.has ? 1 : 0) - S.ms) * 0.08;
      const sp = Math.hypot(P.vx, P.vy) * 60;
      P.vx *= 0.8;
      P.vy *= 0.8;
      const sc = (Math.abs(window.scrollY - lastY) / Math.max(1, dt)) * 16;
      lastY = window.scrollY;
      S.vh += sc * 0.002;
      pulseT = Math.max(0, pulseT - dt / 700);
      S.tear = Math.max(pulseT * 0.9, clamp(sc / 70, 0, 0.25));
      S.surge = pulseT > 0.8 ? (pulseT - 0.8) * 1.2 : 0;
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
          hoverScale(1.7);
          glitch(true);
        };
        const cursorLeave = () => {
          cursor.classList.remove("hv");
          hoverScale(1);
        };
        const cursorHide = () => {
          vis = false;
          cursor.classList.remove("on", "dn");
          if (over) {
            cursorLeave();
            over = null;
          }
        };

        const onPointerMoveCursor = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const x = e.clientX;
          const y = e.clientY;
          const now = performance.now();
          if (!vis) {
            vis = true;
            cursor.classList.add("on");
            gsap.set([xw, xr, rw, rr], { x, y });
            lx = x;
            ly = y;
            lt = now;
            refreshCands();
          }
          mx = x;
          my = y;
          const o = (e.target as HTMLElement | null)?.closest(SEL) as HTMLElement | null;
          if (o !== over) {
            if (over) cursorLeave();
            over = o;
            if (o) cursorEnter();
          }
          const dist = Math.hypot(x - lx, y - ly);
          const sp = (dist / Math.max(1, now - lt)) * 1000;
          const m = magnet(x, y);
          sxw(x);
          syw(y);
          sxr(x + 1);
          syr(y);
          rxw(m[0]);
          ryw(m[1]);
          rxr(m[0] - 1.5);
          ryr(m[1] + 0.5);
          if (!rm) {
            acc += dist;
            if (acc > 70 && now - ft > 110 && Math.random() < 0.45) {
              acc = 0;
              ft = now;
              frag(x, y);
            }
            if (sp > 1700 && now - gc > 800 && Math.random() < 0.5) {
              gc = now;
              glitch(false);
            }
          }
          lx = x;
          ly = y;
          lt = now;
          moved = now;
        };

        const onPointerDownCursor = (e: PointerEvent) => {
          if (e.pointerType === "touch" || e.button > 0 || !vis) return;
          cursor.classList.add("dn");
          if (fl) {
            gsap.fromTo(
              fl,
              { opacity: rm ? 0.05 : 0.1 },
              { opacity: 0, duration: 0.14, ease: "steps(2)", overwrite: "auto" }
            );
          }
          if (rm) return;
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

    // Watermark text auto-fit
    const fitWatermark = () => {
      const w = watermarkRef.current;
      if (!w || !w.parentElement) return;
      w.style.fontSize = "100px";
      const fs = (100 * w.parentElement.clientWidth) / w.offsetWidth;
      w.style.fontSize = `${fs}px`;
    };

    fitWatermark();
    window.addEventListener("resize", fitWatermark);
    safeTimeout(fitWatermark, 300);

    // Ambient + hover glitch on sliced headings
    // Ambient + hover glitch on headings (runs automatically by default)
    let removeHeadingPointerOver: (() => void) | null = null;
    if (!rm) {
      const fireGlx = (el: HTMLElement | null) => {
        if (!el || el.classList.contains("glx")) return;
        el.classList.add("glx");
        safeTimeout(() => el.classList.remove("glx"), 460);
      };

      const isHeadingVisible = (el: HTMLElement) => {
        const r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      };

      const tickHeadingGlitch = () => {
        if (disposed) return;
        if (!document.hidden && rootEl) {
          const all = Array.from(
            rootEl.querySelectorAll<HTMLElement>("main .ph, main .disp, main .nm, main .sl")
          ).filter(isHeadingVisible);
          if (all.length) {
            const count = 1 + (Math.random() < 0.35 ? 1 : 0);
            for (let i = 0; i < count; i++) {
              fireGlx(all[Math.floor(Math.random() * all.length)]);
            }
          }
        }
        safeTimeout(tickHeadingGlitch, 1600 + Math.random() * 2400);
      };

      safeTimeout(tickHeadingGlitch, 2200);

      const onPointerOverHeading = (e: PointerEvent) => {
        if (e.pointerType === "touch") return;
        const target = e.target as HTMLElement | null;
        const h = target?.closest("main .ph, main .disp, main .nm, main .sl") as HTMLElement | null;
        if (!h || h.contains(e.relatedTarget as Node | null)) return;
        fireGlx(h);
      };

      document.addEventListener("pointerover", onPointerOverHeading as EventListener);
      removeHeadingPointerOver = () => {
        document.removeEventListener("pointerover", onPointerOverHeading as EventListener);
      };
    }

    return () => {
      disposed = true;
      if (removeHeadingPointerOver) removeHeadingPointerOver();
      timeouts.forEach((id) => clearTimeout(id));
      intervals.forEach((id) => clearInterval(id));
      if (rafId !== null) cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("cs-on", "navlock");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", fitWatermark);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cs26-root events-root live ${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable}`}
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

      {/* Top Navigation */}
      <nav className={`top ${mobileNavOpen ? "open" : ""}`} aria-label="Primary">
        <div className="wrap">
          <Link className="back mono" href="/cyberstrike-26">
            <span aria-hidden="true">←</span> Back
          </Link>
          <ul id="navMenu">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/cyberstrike-26">Cyberstrike</Link>
            </li>
            <li>
              <Link href="/events" aria-current="page">
                Events
              </Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
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
              <Link href="/contact-us">Contact</Link>
            </li>
            <li className="gap">
              <Link href="/ewaste-26">E-waste</Link>
            </li>
            <li className="sec first">
              <Link href="/cyberstrike-26/cl">CL Registration</Link>
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
            aria-expanded={mobileNavOpen}
            aria-controls="navMenu"
            onClick={() => {
              setMobileNavOpen((prev) => {
                const next = !prev;
                document.documentElement.classList.toggle("navlock", next);
                return next;
              });
            }}
          >
            {mobileNavOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main id="main" tabIndex={-1}>
        <section className="pg">
          <div className="wrap">
            <h1 className="ph disp" aria-label="Events">
              Events
            </h1>
            <p className="pin">
              Eighteen events on three channels. Pick a channel to see every event, its
              rules and how to register.
            </p>
            <nav className="hub" aria-label="Event channels">
              <Link
                className="hrow"
                href="/events/esports"
                style={{ "--i": 0, "--dx": "-.7" } as React.CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 01</span>
                  <span className="nm">E-Sports</span>
                </span>
                <span className="hm">
                  <span className="mono">4 events</span>
                  <span className="hd">BGMI, VALORANT, Clash Royale, FIFA 25</span>
                  <i className="ar" aria-hidden="true">
                    ↗
                  </i>
                </span>
              </Link>
              <Link
                className="hrow"
                href="/events/technical"
                style={{ "--i": 1, "--dx": ".6" } as React.CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 02</span>
                  <span className="nm">Technical</span>
                </span>
                <span className="hm">
                  <span className="mono">6 events</span>
                  <span className="hd">
                    Cyber Hunt, AI Prompt Wars, Algorithm Auction, Among Us: Cyberstrike
                    Edition, Signal Sprint, Canva: Creative Override
                  </span>
                  <i className="ar" aria-hidden="true">
                    ↗
                  </i>
                </span>
              </Link>
              <Link
                className="hrow"
                href="/events/cultural"
                style={{ "--i": 2, "--dx": "-.4" } as React.CSSProperties}
              >
                <span className="hl">
                  <span className="mono">Channel 03</span>
                  <span className="nm">Cultural</span>
                </span>
                <span className="hm">
                  <span className="mono">8 events</span>
                  <span className="hd">
                    Blackout Empire, The Masked Truth, Red Handed, Beat Drop, The Static
                    Carnival, Roll the Chaos, La Couture Nights, Debate: Dead Air
                  </span>
                  <i className="ar" aria-hidden="true">
                    ↗
                  </i>
                </span>
              </Link>
            </nav>
          </div>
        </section>
      </main>

      <span id="tc2" hidden />

      {/* Cyberstrike Footer */}
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
    </div>
  );
};

export default EventsPage;
