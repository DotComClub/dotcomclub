"use client";

import { useEffect, useRef, useState } from "react";
import {
  Big_Shoulders,
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
} from "next/font/google";
import gsap from "gsap";
import { animate } from "motion";
import "./cyberstrike.css";

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["500", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
  display: "swap",
});

const REG_URL = "/register";
const LAUNCH = new Date("2026-11-20T00:00:00+05:30").getTime();
const FLAG = "cs26_intro_seen";

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
  "  nc=mix(nc,vec3(0.89,0.25,0.17),step(0.94,blk2));",
  "  col=mix(ambient,vec4(nc,1.0),on);",
  " }",
  " gl_FragColor=col;",
  "}",
].join("\n");

// ================= 04 Event Channels Data =================
const D = [
  {
    k: "E-Sports",
    i: "Four tournaments. Report 15–20 minutes before your match, play on registered accounts, no cheats, macros or collusion. Entry fee and prize pool: to be announced.",
    e: [
      {
        n: "BGMI",
        c: "Squad mode in custom rooms. Points for where you finish and every elimination.",
        m: [
          ["Team", "4 players"],
          ["Venue", "Class 1D or Lab 6A"],
        ],
        r: [
          "Match points = placement points + 1 per finish",
          "Placement: 1st 10, 2nd 6, 3rd 5, 4th 4, 5th 3, 6th 2, 7th–8th 1",
          "Ties: most first-place finishes, then placement points, finishes, latest match",
          "Use registered in-game names and the room ID and password from organisers",
          "No teaming with opponents, modified clients or point manipulation",
        ],
      },
      {
        n: "VALORANT",
        c: "Five-a-side knockout bracket. Win and advance.",
        m: [
          ["Team", "5 players + 1 optional sub"],
          ["Venue", "Lab 2"],
        ],
        r: [
          "BO1 in early rounds; the final may be BO3",
          "Map pool and veto steps announced before the event",
          "Report 20 minutes early; late teams may forfeit",
          "One tactical timeout per half if enabled; pauses go through the referee",
          "Own mouse and keyboard only if permitted; no cheats, macros or account sharing",
        ],
      },
      {
        n: "Clash Royale",
        c: "Mega Draft 1v1 knockout. Both players draft their cards for every match.",
        m: [
          ["Team", "Solo"],
          ["Venue", "Foyer"],
        ],
        r: [
          "Best-of-1 or Best-of-3 announced beforehand",
          "No outside help with card selection",
          "Play on your own registered account",
          "No restarts without an official’s approval; a disconnect is not an automatic rematch",
          "Report 15 minutes early or risk a walkover",
        ],
      },
      {
        n: "FIFA 25",
        c: "1v1 knockout on official club teams.",
        m: [
          ["Team", "Solo"],
          ["Venue", "Foyer"],
        ],
        r: [
          "Official club teams only; no custom squads, FUT or Volta",
          "Tournament controllers only",
          "Pause only when the ball is out of play or at half-time",
          "Ties go to extra time, then penalties",
          "Report 15 minutes early or forfeit the match",
        ],
      },
    ],
  },
  {
    k: "Technical",
    i: "Six contests of code, prompts, puzzles and quick thinking. Approved tools only, no outside help.",
    e: [
      {
        n: "Cyber Hunt",
        c: "A digital treasure hunt. Solve cyber puzzles to unlock each password-protected file.",
        m: [["Team", "Up to 20 participants"]],
        r: [
          "Every team starts with the same locked file",
          "Each solved puzzle gives the next password; no skipping or borrowing passwords",
          "Limited hints available at a predefined penalty",
          "Report technical issues to the event coordinator",
          "First correct final answer, after verification, wins",
        ],
      },
      {
        n: "AI Prompt Wars",
        c: "Build sharp prompts, improve AI output and catch errors and hallucinations.",
        m: [
          ["Team", "2 members"],
          ["Slots", "10 teams"],
        ],
        r: [
          "Organiser-approved AI tools only",
          "Save and submit your prompts when asked",
          "No pre-prepared outputs or outside help",
          "Same tasks and time limits for every team",
          "Judged on prompt quality, accuracy, relevance, creativity and error detection",
        ],
      },
      {
        n: "Algorithm Auction",
        c: "Bid virtual CyberCoins for the right to solve programming challenges.",
        m: [
          ["Team", "2 members"],
          ["Slots", "10 teams"],
        ],
        r: [
          "Every team starts with equal CyberCoins",
          "The highest valid bid solves the challenge; accepted bids can’t be withdrawn",
          "Submit within the time limit; no sharing solutions",
          "Rewards, penalties and scoring announced beforehand",
          "Highest final score wins; a predetermined tie-break applies",
        ],
      },
      {
        n: "Among Us: Cyberstrike Edition",
        c: "Real-life social deduction. Crewmates finish tech tasks while Impostors sabotage.",
        m: [["Players", "Up to 12, incl. 2 Impostors"]],
        r: [
          "The Game Master assigns secret roles; keep yours secret",
          "Crewmates complete tasks at designated stations",
          "Meetings and voting follow the Game Master",
          "No real hacking, private file access or college network interference",
          "Crew wins by finishing tasks or removing both Impostors; Game Master settles disputes",
        ],
      },
      {
        n: "Signal Sprint",
        c: "A three-level tech quiz that tests knowledge, observation and quick thinking.",
        m: [
          ["Team", "4 members"],
          ["Slots", "12 teams"],
        ],
        r: [
          "Round 1, Signal Break: six survey-board questions per team; top six advance",
          "Round 2, On Sight: one player per team names images on the projector; top three players advance",
          "Round 3, Lock In: whistle or buzzer speed round; wait for permission to answer",
          "No phones or outside help",
          "The referee’s call on who signalled first is final",
        ],
      },
      {
        n: "Canva: Creative Override",
        c: "A timed, AI-assisted design contest: a poster, then a promotional video.",
        m: [
          ["Team", "Solo"],
          ["Slots", "20 participants"],
        ],
        r: [
          "Round 1: AI-assisted poster on an assigned theme",
          "Round 2: short promotional video on a new theme",
          "Canva and organiser-approved AI tools only",
          "Original work, submitted before each deadline",
          "Highest combined score across both rounds wins",
        ],
      },
    ],
  },
  {
    k: "Cultural",
    i: "Eight stages for players, detectives, debaters and performers. Keep it respectful and college-appropriate.",
    e: [
      {
        n: "Blackout Empire",
        c: "Tech-themed Monopoly. Buy big tech companies and survive the blackout.",
        m: [["Ends", "When the timer runs out"]],
        r: [
          "Everyone starts with equal Bits; roll to move, then buy or auction an unowned company",
          "Own a full colour group to double rent and build servers",
          "Packet Sniffer and Signal Ping draw mystery cards",
          "Sent to Server Down: roll doubles or pay a fee",
          "Out of Bits means bankrupt; most total wealth (cash + companies) wins when time is up",
          "No cheating, hiding cards or arguing with the Banker",
        ],
      },
      {
        n: "The Masked Truth",
        c: "A game of secrets and trust. Find the Traitors hiding among the Faithful.",
        m: [],
        r: [
          "Secret roles: Faithful or Traitor. Faithfuls get public missions, Traitors secret ones",
          "Everyone votes; the player with the most votes is eliminated",
          "Traitors eliminate one player in the Night Round",
          "Eliminated players can’t give hints or help",
          "Faithfuls win by removing all Traitors; Traitors win by equalling or outnumbering the Faithfuls",
          "The Host’s decision is final",
        ],
      },
      {
        n: "Red Handed",
        c: "Detectives examine evidence and question suspects. Murder or suicide, and if murder, who did it?",
        m: [["Team", "4 members"]],
        r: [
          "Each team gets a case file and investigates the scene",
          "Question suspects only in the designated round",
          "Don’t tamper with evidence or share it with other teams",
          "Submit your conclusion within the time allowed",
          "Judged on evidence analysis, reasoning and accuracy",
        ],
      },
      {
        n: "Beat Drop",
        c: "A dance competition judged on skill, creativity and stage presence.",
        m: [["Category", "Solo or team of 4–5"]],
        r: [
          "Register under one category only",
          "Each act performs once in the opening round; judges decide who advances",
          "Bring your own music; keep it appropriate for a college event",
          "Follow the organisers’ time limit",
          "Winner and runner-up chosen on overall performance",
        ],
      },
      {
        n: "The Static Carnival",
        c: "An escape-room run through sequential Acts. Clues carry forward; miss one and the final door stays shut.",
        m: [["Team", "4 members"]],
        r: [
          "Timer starts when you enter Act 1; no skipping, no re-entry",
          "Deposit phones, smartwatches and earphones before entry",
          "Report 15 minutes before your slot or forfeit it",
          "Don’t tamper with props; don’t share clues with other teams",
          "Photosensitivity or claustrophobia? Tell the desk beforehand",
        ],
      },
      {
        n: "Roll the Chaos",
        c: "Capture the best CYBERSTRIKE moments in a creative short reel.",
        m: [
          ["Team", "Solo or 2–4"],
          ["Reel", "30–90 seconds"],
        ],
        r: [
          "Reels must feature CYBERSTRIKE and its events",
          "Use any editing app; keep it original and appropriate",
          "Don’t disturb ongoing games while recording",
          "Submit before the deadline",
          "Judged on creativity, storytelling, entertainment, editing and event representation",
        ],
      },
      {
        n: "La Couture Nights",
        c: "A themed fashion show: outfits and ramp performances on the organisers’ theme.",
        m: [["Team", "6–8 members"]],
        r: [
          "Follow the announced theme and arrange your own outfits",
          "Each participant walks and performs their own take on the theme",
          "Keep outfits and performances college-appropriate",
          "Report before your slot; don’t interfere with other performers",
          "One winner and one runner-up",
        ],
      },
      {
        n: "Debate: Dead Air",
        c: "The Hijacked Frequency. A hijacker cuts in mid-argument and you have 30 seconds to fold it in.",
        m: [
          ["Team", "2 members"],
          ["Slots", "16, first come first served"],
        ],
        r: [
          "Round 1 topic released 24 hours ahead; stance by live draw",
          "Round 1 allows one 50-word cue card; no scripts in Rounds 2 and 3",
          "Hijacks are mandatory: freezing costs points, handling them well earns a bonus",
          "Keep crossfire respectful: no personal attacks, slurs or constant interruptions",
          "Audience vote counts 10%, Round 2 only",
          "Report 30 minutes before your slot; phones deposited before Round 3 prep",
        ],
      },
    ],
  },
];

export default function Cyberstrike26Page() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeChannel, setActiveChannel] = useState(0);
  const [openEventId, setOpenEventId] = useState<string | null>("ev0_0");

  useEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;
    const root: HTMLDivElement = rootEl;

    let disposed = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
    let rafId: number | null = null;

    const safeTimeout = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!disposed) fn();
      }, ms);
      timeouts.push(id);
      return id;
    };

    const safeInterval = (fn: () => void, ms: number) => {
      const id = setInterval(() => {
        if (!disposed) fn();
      }, ms);
      intervals.push(id);
      return id;
    };

    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    function sset() {
      try {
        sessionStorage.setItem(FLAG, "1");
      } catch {}
    }

    // Always start the instant cinematic intro on page load (unless prefers-reduced-motion is on)
    const playIntro = !rm;

    if (rm) root.classList.add("rm");
    if (playIntro) root.classList.add("js-intro");

    const prevBodyOverflow = document.body.style.overflow;
    if (playIntro) {
      document.body.style.overflow = "hidden";
    }

    const $ = (id: string) => root.querySelector<HTMLElement>(`#${id}`);

    const intro = $("intro");
    const main = $("main");
    const canvas = root.querySelector<HTMLCanvasElement>("#fx");
    const diag = $("diag");
    const frags = $("frags");
    const words = $("words");
    const barEl = $("bar");
    const lkEl = $("lk");
    const promptEl = $("prompt");
    const xh = $("xh");
    const meterEl = $("meter");
    const sr = $("sr");
    const l1 = $("l1");
    const l2 = $("l2");
    const freqEl = $("freq");
    const tcEl = $("tc");
    const tc2 = $("tc2");
    const sndBtn = $("snd");
    const skipBtn = $("skip");
    const mon = $("mon");
    const bars = $("bars");
    const feedBtn = $("feedBtn");
    const resyncBtn = $("resync");
    const humStBtn = $("humSt");
    const replayBtn = $("replay");
    const osdClock = $("osdClock");
    const cdD = $("cdD");
    const cdH = $("cdH");
    const cdM = $("cdM");
    const cdS = $("cdS");

    // ================= Sliced Type =================
    function rnd(a: number, b: number) {
      return a + Math.random() * (b - a);
    }
    function slice(el: HTMLElement, n: number) {
      if (el.dataset.sliced === "true") return;
      const raw = el.dataset.rawHtml || el.innerHTML;
      el.dataset.rawHtml = raw;
      el.dataset.sliced = "true";
      el.innerHTML = "";
      el.classList.add("sl");
      const b = document.createElement("span");
      b.className = "b";
      b.innerHTML = raw;
      el.appendChild(b);
      const cuts = [0];
      for (let i = 1; i < n; i++) cuts.push((i / n) * 100 + rnd(-4, 4));
      cuts.push(100);
      for (let k = 0; k < n; k++) {
        const s = document.createElement("span");
        s.className = "s";
        s.setAttribute("aria-hidden", "true");
        s.innerHTML = raw;
        s.style.clipPath = `inset(${cuts[k] - 0.5}% -12% ${100 - cuts[k + 1] - 0.5}% -12%)`;
        s.style.setProperty("--dx", (Math.random() * 2 - 1).toFixed(3));
        s.style.setProperty("--dy", (Math.random() * 2 - 1).toFixed(3));
        s.style.setProperty("--r", Math.random().toFixed(3));
        el.appendChild(s);
      }
    }

    function unslice(el: HTMLElement) {
      if (el.dataset.rawHtml) {
        el.innerHTML = el.dataset.rawHtml;
        delete el.dataset.rawHtml;
      }
      delete el.dataset.sliced;
      el.classList.remove("sl");
    }

    root.querySelectorAll<HTMLElement>("[data-sl]").forEach((e) => {
      if (e.classList.contains("sl-host")) e.classList.remove("sl-host");
      slice(e, e.closest("#intro") ? 9 : 7);
    });

    root.style.setProperty("--ca", "0");
    root.querySelectorAll<HTMLElement>("main .sl").forEach((e) => {
      e.style.setProperty("--ca", "2");
    });

    // Hero title fit
    const heroH1 = root.querySelector<HTMLElement>(".hero h1");
    function fitHero() {
      if (!heroH1) return;
      const host =
        heroH1.querySelector<HTMLElement>(".sl") ||
        heroH1.querySelector<HTMLElement>("[data-sl]");
      const num = heroH1.querySelector<HTMLElement>(".n");
      if (!host) return;
      heroH1.style.fontSize = "";
      heroH1.style.setProperty("--tear", "0");
      const av = heroH1.clientWidth;
      if (!av) return;
      const isMobile = window.innerWidth <= 480;
      let targetW = host.offsetWidth;
      if (!isMobile && num) {
        const gap = parseFloat(getComputedStyle(heroH1).gap) || 0;
        targetW = host.offsetWidth + gap + num.offsetWidth;
      }
      if (targetW > av) {
        const baseSize = parseFloat(getComputedStyle(heroH1).fontSize);
        heroH1.style.fontSize = `${(baseSize * av / targetW) * 0.98}px`;
      }
    }
    window.addEventListener("resize", fitHero);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) fitHero();
      });
    }
    safeTimeout(fitHero, 100);
    safeTimeout(fitHero, 300);
    safeTimeout(fitHero, 600);
    fitHero();

    const glitchEls = root.querySelectorAll<HTMLElement>("[data-glitch]");
    let io: IntersectionObserver | null = null;
    if (!rm && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.remove("pre");
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      glitchEls.forEach((g) => {
        const r = g.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.9) {
          g.classList.add("pre");
        }
        io?.observe(g);
      });
    }

    // ================= Audio =================
    type AudioState = {
      ctx: AudioContext | null;
      master: GainNode | null;
      on: boolean;
      nG: GainNode | null;
      hG: GainNode | null;
      asked: boolean;
      buf: AudioBuffer | null;
    };
    const AU: AudioState = {
      ctx: null,
      master: null,
      on: false,
      nG: null,
      hG: null,
      asked: false,
      buf: null,
    };

    function auInit() {
      if (AU.ctx) {
        try {
          AU.ctx.resume();
        } catch {}
        return true;
      }
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return false;
        const c = new AudioCtx();
        AU.ctx = c;
        AU.master = c.createGain();
        AU.master.gain.value = 0;
        AU.master.connect(c.destination);

        const buf = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        AU.buf = buf;

        const ns = c.createBufferSource();
        ns.buffer = buf;
        ns.loop = true;
        const bp = c.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 2600;
        bp.Q.value = 0.5;
        AU.nG = c.createGain();
        AU.nG.gain.value = 0;
        ns.connect(bp);
        bp.connect(AU.nG);
        AU.nG.connect(AU.master);
        ns.start();

        const lp = c.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 420;
        AU.hG = c.createGain();
        AU.hG.gain.value = 0;
        lp.connect(AU.hG);
        AU.hG.connect(AU.master);

        [50, 100, 150].forEach((f, i) => {
          const o = c.createOscillator();
          o.type = i ? "sine" : "sawtooth";
          o.frequency.value = f;
          const g = c.createGain();
          g.gain.value = i ? 0.25 / i : 0.5;
          o.connect(g);
          g.connect(lp);
          o.start();
        });
        return true;
      } catch {
        return false;
      }
    }

    function auSet(on: boolean) {
      AU.on = on;
      if (AU.master && AU.ctx) {
        AU.master.gain.setTargetAtTime(on ? 0.9 : 0, AU.ctx.currentTime, 0.08);
      }
      if (sndBtn) {
        sndBtn.textContent = on ? "Sound on" : "Sound off";
        sndBtn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    }

    function auLevel(noise: number, hum: number) {
      if (!AU.ctx || !AU.nG || !AU.hG) return;
      const t = AU.ctx.currentTime;
      AU.nG.gain.setTargetAtTime(noise, t, 0.12);
      AU.hG.gain.setTargetAtTime(hum, t, 0.2);
    }

    function auBlip(f: number, dur: number, gVal?: number) {
      if (!AU.ctx || !AU.on || !AU.master) return;
      const c = AU.ctx;
      const o = c.createOscillator();
      const a = c.createGain();
      const t = c.currentTime;
      o.type = "square";
      o.frequency.value = f;
      a.gain.setValueAtTime(gVal || 0.05, t);
      a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(a);
      a.connect(AU.master);
      o.start(t);
      o.stop(t + dur + 0.02);
    }

    function auSurge() {
      if (!AU.ctx || !AU.on || !AU.buf || !AU.master) return;
      const c = AU.ctx;
      const t = c.currentTime;
      const s = c.createBufferSource();
      s.buffer = AU.buf;
      const f = c.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.setValueAtTime(9000, t);
      f.frequency.exponentialRampToValueAtTime(160, t + 1.3);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.9, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
      s.connect(f);
      f.connect(g);
      g.connect(AU.master);
      s.start(t);
      s.stop(t + 1.5);

      const o = c.createOscillator();
      const og = c.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(90, t);
      o.frequency.exponentialRampToValueAtTime(30, t + 0.9);
      og.gain.setValueAtTime(0.7, t);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 1);
      o.connect(og);
      og.connect(AU.master);
      o.start(t);
      o.stop(t + 1.1);
    }

    function firstGesture() {
      if (AU.asked || AU.ctx) return;
      AU.asked = true;
      if (auInit()) auSet(true);
    }

    const onSndClick = (e: MouseEvent) => {
      e.stopPropagation();
      AU.asked = true;
      if (!AU.ctx) {
        if (auInit()) auSet(true);
      } else {
        auSet(!AU.on);
      }
    };
    sndBtn?.addEventListener("click", onSndClick);

    // ================= WebGL =================
    let gl: WebGLRenderingContext | null = null;
    const U: Record<string, WebGLUniformLocation | null> = {};
    const rip = new Float32Array(12);
    const ripT = [0, 0, 0, 0];
    let ripI = 0;
    let scale = 1;

    function initGL() {
      if (!canvas) return false;
      try {
        gl = canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        if (!gl) return false;

        const sh = (type: number, srcText: string) => {
          if (!gl) throw new Error("No gl");
          const o = gl.createShader(type);
          if (!o) throw new Error("Create shader failed");
          gl.shaderSource(o, srcText);
          gl.compileShader(o);
          if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(o) || "Shader error");
          }
          return o;
        };

        const pr = gl.createProgram();
        if (!pr) throw new Error("Create program failed");
        gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
        gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
        gl.linkProgram(pr);
        if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error("Link failed");
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
    }

    function noGL() {
      gl = null;
      root.classList.add("nogl");
    }

    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      scale = coarse ? 0.4 : w > 1600 ? 0.4 : 0.55;
      canvas.width = Math.max(2, Math.round(w * scale));
      canvas.height = Math.max(2, Math.round(h * scale));
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // ================= State =================
    const S = {
      cover: 1,
      sweep: -1,
      beam: 0,
      beamH: 0.002,
      beamLen: 1,
      surge: 0,
      tear: 0,
      stat: 0.018,
      amb: 0.6,
      rgb: 0.3,
      vh: 0,
      ms: 0,
    };
    const P = { x: 0.5, y: 0.5, has: false, last: 0, down: false, vx: 0, vy: 0 };
    const X = { x: 0.5, y: 0.5 };
    let phase = "A";
    let T = 0;
    const t0 = 0;
    let tC = 0;
    let tD = 0;
    let dFast = false;
    let done = false;
    let lock = 0;
    let lockStep = 0;
    let tB = 0;
    let hold = 0;
    let burst = 0;
    let pulseT = 0;
    let lastY = 0;
    let cFired = { surge: false, lost: false };

    const ease = (x: number) => {
      x = Math.max(0, Math.min(1, x));
      return 1 - Math.pow(1 - x, 3);
    };
    const easeIO = (x: number) => {
      x = Math.max(0, Math.min(1, x));
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };
    const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));

    function setP(e: PointerEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      P.vx = x - P.x;
      P.vy = y - P.y;
      P.x = x;
      P.y = y;
      P.has = true;
      P.last = T;
    }

    function addRipple(rx: number, ry: number) {
      rip[ripI * 3] = rx;
      rip[ripI * 3 + 1] = ry;
      rip[ripI * 3 + 2] = 0;
      ripT[ripI] = T;
      ripI = (ripI + 1) % 4;
    }

    const onPointerMove = (e: PointerEvent) => {
      setP(e);
    };

    const onPointerDown = (e: PointerEvent) => {
      setP(e);
      P.down = true;
      if (e.target && (e.target as HTMLElement).closest("button")) return;
      addRipple(P.x, P.y);
      if (!done) firstGesture();
    };

    const onPointerUp = () => {
      P.down = false;
    };

    const onPointerLeave = () => {
      P.has = false;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    // ================= Intro Scripting =================
    const typing: { el: HTMLElement; text: string; start: number; speed: number }[] = [];
    function say(text: string, cls?: string, speed?: number, srText?: string | false) {
      if (!diag) return;
      const d = document.createElement("div");
      if (cls) d.className = cls;
      diag.appendChild(d);
      typing.push({ el: d, text, start: T, speed: speed || 26 });
      while (diag.children.length > 7) {
        if (diag.firstChild) diag.removeChild(diag.firstChild);
      }
      if (sr && srText !== false) sr.textContent = srText || text;
    }

    function flash(
      text: string,
      fx: number,
      fy: number,
      size: string,
      dur: number,
      isMono?: number
    ) {
      if (!frags) return;
      const s = document.createElement("span");
      s.className = "fr" + (isMono ? " mn" : "");
      s.textContent = text;
      s.style.left = fx + "%";
      s.style.top = fy + "%";
      s.style.fontSize = size;
      const a = rnd(0, 45);
      const b = rnd(0, 45);
      s.style.clipPath = isMono ? "none" : `inset(${a}% 0 ${b}% 0)`;
      s.style.transform = `translateX(${rnd(-14, 14)}px)`;
      frags.appendChild(s);
      safeTimeout(() => {
        if (s.parentNode) s.parentNode.removeChild(s);
      }, dur);
    }

    const W = [
      { t: "CYBER", dx: -0.2, dy: 0.2, sm: 0 },
      { t: "STRIKE", dx: 0.2, dy: -0.16, sm: 0 },
      { t: "ROOT", dx: -0.05, dy: -0.26, sm: 0 },
      { t: "PROBE", dx: 0.26, dy: 0.2, sm: 0 },
      { t: "DCC // 20.11", dx: -0.27, dy: -0.05, sm: 1 },
      { t: "JHC-MUM", dx: 0.02, dy: 0.28, sm: 1 },
      { t: "26", dx: 0.0, dy: 0.0, sm: 0 },
    ];

    if (words) words.innerHTML = "";
    if (diag) diag.innerHTML = "";
    if (frags) frags.innerHTML = "";
    const wEls = words
      ? W.map((w) => {
          const e = document.createElement("div");
          e.className = "w" + (w.sm ? " sm" : "");
          e.textContent = w.t;
          words.appendChild(e);
          return e;
        })
      : [];

    function src() {
      return {
        x: 0.62 + 0.13 * Math.sin(T * 0.00031),
        y: 0.46 + 0.12 * Math.sin(T * 0.00047 + 1),
      };
    }

    const evA = [
      {
        t: 40,
        f: () => {
          say("INITIALIZING CONNECTION...", "", 18);
          burst = 0.25;
          safeTimeout(() => {
            burst = 0;
          }, 50);
          auBlip(320, 0.12, 0.05);
        },
      },
      {
        t: 180,
        f: () => {
          flash("..FRAME 0042 DROP", 14, 60, "11px", 120, 1);
        },
      },
      {
        t: 320,
        f: () => {
          burst = 0.4;
          safeTimeout(() => {
            burst = 0;
          }, 60);
        },
      },
      {
        t: 420,
        f: () => {
          say("SEARCHING FOR SOURCE...", "", 18);
          flash("0x7F 0x00 0x2A", 70, 34, "11px", 100, 1);
        },
      },
      {
        t: 540,
        f: () => {
          flash("CYBER", 8, 36, "clamp(70px,16vw,260px)", 85);
        },
      },
      {
        t: 640,
        f: () => {
          flash("STRIKE", 34, 46, "clamp(70px,18vw,300px)", 75);
          say("CONNECTION TERMINATED.", "cy", 18);
        },
      },
      {
        t: 740,
        f: () => {
          flash("26", 62, 30, "clamp(90px,22vw,380px)", 65);
        },
      },
      {
        t: 820,
        f: () => {
          flash("DCC", 20, 55, "clamp(60px,12vw,200px)", 55);
        },
      },
      {
        t: 890,
        f: () => {
          say("SIGNAL LOST", "red blink", 24);
          auBlip(120, 0.2, 0.06);
        },
      },
    ];
    let evI = 0;

    function phaseA(t: number) {
      S.cover = 1;
      S.sweep = -1;
      S.amb = 0;
      S.ms = 0;
      S.rgb = 0.4;
      S.tear = burst;
      S.beam = 0;
      S.surge = 0;
      S.stat = 0.018 + 0.01 * Math.sin(t * 0.006);

      // Beam: thin horizontal phosphor line flickers in, expands, tears
      if (t >= 320 && t < 950) {
        const u = t - 320;
        const fl =
          u < 120 ? (Math.random() > 0.45 ? 0.5 : 0) : 0.8 + 0.2 * Math.random();
        const len = u < 120 ? 0.28 : 0.28 + 0.72 * ease((u - 120) / 280);
        const col = u > 450 ? 1 - ease((u - 450) / 180) : 1;
        S.beam = fl * col;
        S.beamH = 0.0016 + (u > 450 ? 0.006 * ((u - 450) / 180) : 0);
        S.beamLen = u > 450 ? Math.max(0.02, len * col) : len;
        if (u > 140 && u < 380) {
          S.tear = 0.7 * (Math.random() > 0.25 ? 1 : 0.3);
          S.rgb = 2.8;
          S.stat = 0.06;
        }
      }
      if (t >= 1000 && phase === "A") {
        phase = "B";
        tB = 0;
        enterB();
      }
    }

    function enterB() {
      if (meterEl) meterEl.style.opacity = "1";
      if (xh) xh.style.opacity = "1";
      if (promptEl) {
        promptEl.textContent = coarse
          ? "TOUCH AND DRAG TO TUNE RECEIVER"
          : "LOCKING ONTO TRANSMISSION CARRIER...";
        promptEl.style.opacity = "1";
      }
      say("CARRIER DETECTED. CONVERGING...", "cy", 16);
      auLevel(0.05, 0.03);
    }

    const locks: [string, string, [number, number, string]][] = [
      ["CARRIER FOUND  88.20 MHZ", "DOT COM CLUB", [50, 40, "clamp(50px,11vw,190px)"]],
      ["ORIGIN  JAI HIND COLLEGE // MUMBAI", "ROOT", [14, 28, "clamp(50px,13vw,220px)"]],
      ["PAYLOAD  CYBERSTRIKE//26", "PROBE", [40, 56, "clamp(60px,15vw,250px)"]],
    ];

    function phaseB(dt: number) {
      tB += dt;
      const s = src();
      const targetX = P.has ? P.x * 0.25 + s.x * 0.75 : s.x;
      const targetY = P.has ? P.y * 0.25 + s.y * 0.75 : s.y;
      X.x += (targetX - X.x) * 0.22;
      X.y += (targetY - X.y) * 0.22;

      // Lock progresses smoothly across 950ms (from 1.0s to 1.95s)
      lock = Math.min(1, tB / 950);

      S.cover = 1;
      S.sweep = -1;
      S.beam = 0;
      S.surge = Math.max(0, S.surge - dt / 220);
      S.ms = 1;
      S.amb = 0;
      S.stat = 0.03 * (1 - lock * 0.55) + 0.01;
      S.rgb = 0.5 + lock * 1.4;
      hold -= dt;
      if (hold <= 0) {
        hold = rnd(900, 1800);
        burst = 0.25 * (1 - lock * 0.6);
        safeTimeout(() => {
          burst = 0;
        }, 70);
      }
      S.tear = burst;

      for (let i = 0; i < W.length; i++) {
        const wx = s.x + W[i].dx;
        const wy = s.y + W[i].dy;
        const e = wEls[i];
        if (!e) continue;
        e.style.left = wx * 100 + "%";
        e.style.top = (1 - wy) * 100 + "%";
        const vis = lock > 0.08 && Math.random() > 0.2;
        e.style.opacity = vis
          ? String(Math.min(1, lock * 1.3) * (W[i].sm ? 0.9 : 0.8))
          : "0";
        e.style.transform = `translate(${-50 + rnd(-1, 1) * 6}%,-50%)`;
      }

      if (xh) {
        xh.style.transform = `translate(${X.x * window.innerWidth}px,${(1 - X.y) * window.innerHeight}px)`;
        xh.style.setProperty("--z", (1.3 - lock * 0.5).toFixed(3));
        xh.classList.toggle("lk", lock > 0.55);
      }

      const n = Math.round(lock * 20);
      let h = "SIGNAL ";
      for (let j = 0; j < 20; j++) h += `<b${j < n ? ' class="on"' : ""}>|</b>`;
      if (barEl) barEl.innerHTML = `${h} ${("00" + Math.round(lock * 100)).slice(-3)}%`;
      if (freqEl)
        freqEl.textContent = `FREQ ${(88.2 + (1 - lock) * (Math.random() * 4 - 2)).toFixed(2)} MHZ`;
      if (lkEl) lkEl.textContent = `LOCK ${lockStep}/3  ${Math.round(lock * 100)}%`;

      if (lockStep < 3 && lock >= (lockStep + 1) / 3 - 0.0001) {
        const L = locks[lockStep];
        lockStep++;
        S.surge = 0.35;
        burst = 0.55;
        safeTimeout(() => {
          burst = 0;
        }, 80);
        say(L[0], "cy", 15);
        flash(L[1], L[2][0], L[2][1], L[2][2], 160);
        auBlip(550 + lockStep * 180, 0.1, 0.07);
        addRipple(X.x, X.y);
      }
      auLevel(0.04 + 0.04 * (1 - lock), 0.03 + 0.06 * lock);
      if (lockStep >= 3 && tB >= 1050 && phase === "B") {
        phase = "C";
        tC = T;
        enterC();
      }
    }

    function setTitle(tt: number, ca: number, out: number, t2: number) {
      if (!l1 || !l2) return;
      l1.style.setProperty("--tear", tt.toFixed(3));
      l1.style.setProperty("--ca", ca.toFixed(2));
      l1.style.setProperty("--out", out.toFixed(3));
      l2.style.setProperty("--tear", Math.max(t2, tt * 0.6).toFixed(3));
      l2.style.setProperty("--ca", (ca + t2 * 10).toFixed(2));
      l2.style.setProperty("--out", out.toFixed(3));
    }

    function enterC() {
      if (intro) intro.classList.add("c", "t1");
      if (sr) sr.textContent = "Signal acquired. Cyberstrike 2026.";
      S.surge = 0.85;
      auSurge();
      if (l1) l1.style.opacity = "1";
      cFired = { surge: true, lost: false };
    }

    function phaseC() {
      const c = T - tC;
      S.ms = 0;
      S.amb = 0;
      S.cover = 1;
      S.sweep = -1;
      S.beam = 0;
      S.surge = 0;
      S.tear = 0;
      S.stat = 0;
      S.rgb = 0;
      let tt = 0,
        ca = 0,
        t2 = 0;

      const u = c;
      S.surge = Math.max(0, 1 - u / 380);
      S.beam = u < 600 ? 1 - ease(u / 600) : 0;
      S.beamH = 0.002 + 0.7 * ease(u / 300);
      S.beamLen = 1;
      S.tear =
        u < 900 ? (1 - ease(u / 900)) * (Math.random() > 0.15 ? 1 : 0.4) : 0;
      S.rgb = S.tear * 4;
      S.stat = 0.04 * (1 - ease(u / 800)) + 0.012;
      tt = Math.max(0.1, S.tear);
      ca = 2.5 + 10 * S.tear;
      if (l1) l1.style.opacity = "1";

      if (c > 500) {
        if (!cFired.lost) {
          cFired.lost = true;
          if (intro) intro.classList.add("t2");
          S.surge = 0.35;
          auBlip(880, 0.2, 0.07);
          if (sr) sr.textContent = "Lost signal.";
        }
        const v = c - 500;
        t2 = v < 350 ? 1 - easeIO(v / 350) : 0;
        if (v < 180) {
          S.tear = 0.5;
          S.surge = Math.max(S.surge, 0.25 * (1 - v / 180));
          S.rgb = 2.5;
        }
      }

      setTitle(tt, ca, 0, t2);
      if (c >= 1050 && phase === "C") {
        phase = "D";
        tD = T;
        dFast = false;
      }
    }

    function phaseD() {
      const d = T - tD;
      const off = dFast ? 0 : 30;
      S.ms = 0;
      S.amb = 0;
      S.cover = 1;
      S.beam = 0;
      S.surge = 0;
      S.rgb = 0.4;
      S.tear = 0;
      S.stat = 0.02;
      const out = dFast ? 1 : ease((d - off) / 380);

      if (!dFast) {
        if (d > off) {
          S.stat = 0.02 + 0.35 * out * out;
          S.tear = 0.35 * out;
          S.rgb = 0.4 + 5 * out;
        }
        setTitle(1.4 * out, 2 + 10 * out, out, 0);
        if (l1) l1.style.opacity = out > 0.98 ? "0" : "1";
        if (l2 && out > 0.98) l2.style.opacity = "0";
      } else {
        intro?.classList.remove("t1", "t2");
      }
      const s0 = off;
      const dur = dFast ? 250 : 550;
      const sw = -0.2 + 1.5 * easeIO((d - s0) / dur);
      S.sweep = d < s0 ? -1 : sw;
      if (S.sweep > 0.08 && !root.classList.contains("live")) {
        root.classList.add("live");
        auLevel(0, 0);
        if (mon) {
          mon.classList.remove("sync");
          void mon.offsetWidth;
          mon.classList.add("sync");
        }
      }
      if (d > s0 + dur && !done) finish();
    }

    function finish() {
      done = true;
      S.cover = 0;
      S.sweep = 3;
      S.amb = 1;
      S.beam = 0;
      S.surge = 0;
      S.tear = 0;
      S.stat = 0.012;
      S.rgb = 0;
      if (intro) intro.hidden = true;
      root.classList.remove("js-intro");
      root.classList.add("live");
      document.body.style.overflow = prevBodyOverflow;
      main?.removeAttribute("inert");
      main?.removeAttribute("aria-hidden");
      if (AU.ctx) auLevel(0, 0);
      sset();
      root.style.setProperty("--amb-tear", "0");
      root.style.setProperty("--ca", "2");
      heroH1?.style.setProperty("--tear", "0");
      fitHero();
      try {
        main?.focus({ preventScroll: true });
      } catch {}
    }

    function skip() {
      if (done) return;
      finish();
    }

    skipBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      skip();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (!done && e.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);

    // ================= Ambient (After Intro) =================
    function ambient(dt: number) {
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

    }

    const triggerPulse = () => {
      pulseT = 0.6;
    };

    // Periodic random micro-pulse for ambient CRT shader atmosphere (does not disrupt text)
    safeInterval(() => {
      if (done && Math.random() < 0.45) {
        triggerPulse();
      }
    }, 4500);

    // ================= Main Loop =================
    let last = 0;
    let fc = 0;

    function tcStr(s: number) {
      const f = Math.floor((s % 1) * 25);
      const ss = Math.floor(s) % 60;
      const m = Math.floor(s / 60) % 60;
      const h = Math.floor(s / 3600);
      return [h, m, ss, f].map((n) => ("0" + n).slice(-2)).join(":");
    }

    function draw() {
      if (!gl || !canvas) return;
      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform2f(U.uCss, window.innerWidth, window.innerHeight);
      gl.uniform2f(U.uM, X.x, X.y);
      gl.uniform1f(U.uT, T / 1000);
      gl.uniform1f(U.uMS, S.ms);
      gl.uniform1f(U.uCover, S.cover);
      gl.uniform1f(U.uSweep, S.sweep);
      gl.uniform1f(U.uBeam, S.beam);
      gl.uniform1f(U.uBeamH, S.beamH || 0.002);
      gl.uniform1f(U.uBeamLen, S.beamLen || 1);
      gl.uniform1f(U.uSurge, S.surge);
      gl.uniform1f(U.uTear, S.tear);
      gl.uniform1f(U.uStatic, S.stat);
      gl.uniform1f(U.uAmb, S.amb);
      gl.uniform1f(U.uRgb, S.rgb);
      gl.uniform1f(U.uVH, S.vh);
      gl.uniform3fv(U.uRip, rip);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function frame(now: number) {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      let dt = Math.min(50, now - last || 16);
      last = now;
      T += dt;

      if (done && fc++ & 1) return;
      if (done) dt *= 2;

      if (!done) {
        for (let i = 0; i < typing.length; i++) {
          const ty = typing[i];
          const n = Math.floor((T - ty.start) / ty.speed);
          ty.el.textContent = ty.text.slice(0, n);
        }
        if (typing.length > 12) typing.splice(0, typing.length - 8);
        const tcs = T / 1000;
        if (tcEl) tcEl.textContent = tcStr(tcs);

        if (phase === "A") {
          const t = T - t0;
          while (evI < evA.length && t >= evA[evI].t) {
            evA[evI].f();
            evI++;
          }
          phaseA(t);
        } else if (phase === "B") {
          phaseB(dt);
        } else if (phase === "C") {
          phaseC();
        } else if (phase === "D") {
          phaseD();
        }

        if (!gl && phase === "D" && intro) {
          intro.style.clipPath = `inset(0 0 0 ${clamp(((S.sweep + 0.2) / 1.4) * 100, 0, 100)}%)`;
        }
      } else {
        ambient(dt);
      }

      if (done && fc % 30 === 0 && tc2) {
        tc2.textContent = tcStr(T / 1000);
      }

      for (let r = 0; r < 4; r++) {
        let a = rip[r * 3 + 2];
        if (a < 1) {
          a = (T - ripT[r]) / 1100;
          rip[r * 3 + 2] = Math.min(1, a);
        }
      }
      if (gl) draw();
    }

    const onVisibilityChange = () => {
      last = 0;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ================= Boot =================
    rip[2] = rip[5] = rip[8] = rip[11] = 1;
    if (!rm) {
      if (!initGL()) noGL();
      resize();
      window.addEventListener("resize", resize);
    }

    if (playIntro) {
      if (intro) intro.hidden = false;
      main?.setAttribute("inert", "");
      main?.setAttribute("aria-hidden", "true");
      S.beamH = 0.002;
      S.beamLen = 1;
      auSet(false);
      rafId = requestAnimationFrame((n) => {
        last = n;
        frame(n);
      });
      safeTimeout(() => {
        try {
          skipBtn?.focus({ preventScroll: true });
        } catch {}
      }, 50);
    } else {
      if (intro) intro.hidden = true;
      done = true;
      root.classList.add("live");
      S.cover = 0;
      S.sweep = 3;
      S.amb = 1;
      S.stat = 0.012;
      root.style.setProperty("--ca", "2");
      fitHero();
      if (!rm) {
        rafId = requestAnimationFrame((n) => {
          last = n;
          frame(n);
        });
      }
    }

    // ================= Signal Monitor Interactions =================
    const feeds = [
      "XyQubil // DCC-TV",
      "CH 03 // ARCHIVE",
      "CH 07 // NO CARRIER",
      "CH 11 // TEST PATTERN",
    ];
    const barSets = [
      ["#9a9a94", "#9a9a2c", "#2c9a9a", "#2c9a2c", "#9a2c9a", "#9a2c2c", "#2c2c9a"],
      ["#3a332f", "#6b625a", "#a39a91", "#ede6dc", "#a39a91", "#6b625a", "#3a332f"],
      ["#111", "#111", "#222", "#111", "#e2402c", "#111", "#111"],
      ["#ede6dc", "#111", "#ede6dc", "#111", "#ede6dc", "#111", "#ede6dc"],
    ];
    let fi = 0;
    function paintBars() {
      if (!bars) return;
      bars.innerHTML = "";
      barSets[fi].forEach((c) => {
        const s = document.createElement("span");
        s.style.background = c;
        bars.appendChild(s);
      });
      const feedEl = $("feed");
      if (feedEl) feedEl.textContent = feeds[fi];
    }
    paintBars();

    const onFeedBtnClick = () => {
      fi = (fi + 1) % feeds.length;
      paintBars();
      triggerPulse();
      if (mon) {
        mon.classList.remove("sync");
        void mon.offsetWidth;
        mon.classList.add("sync");
      }
    };
    feedBtn?.addEventListener("click", onFeedBtnClick);

    const onResyncClick = () => {
      triggerPulse();
      if (mon) {
        mon.classList.remove("sync");
        void mon.offsetWidth;
        mon.classList.add("sync");
      }
      auBlip(880, 0.12, 0.05);
    };
    resyncBtn?.addEventListener("click", onResyncClick);

    let humOn = false;
    const onHumClick = () => {
      humOn = !humOn;
      if (humOn) {
        if (!AU.ctx) auInit();
        auSet(true);
        auLevel(0.04, 0.06);
      } else {
        auLevel(0, 0);
      }
      if (humStBtn) {
        humStBtn.textContent = `Static hum: ${humOn ? "on" : "off"}`;
        humStBtn.setAttribute("aria-pressed", humOn ? "true" : "false");
      }
    };
    humStBtn?.addEventListener("click", onHumClick);

    const onReplayClick = () => {
      try {
        sessionStorage.removeItem(FLAG);
      } catch {}
      window.location.reload();
    };
    replayBtn?.addEventListener("click", onReplayClick);

    function updateClock() {
      if (!osdClock) return;
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = ("0" + d.getMinutes()).slice(-2);
      osdClock.textContent = `${h}:${m} ${d.getHours() < 12 ? "AM" : "PM"} SP`;
    }
    updateClock();
    safeInterval(updateClock, 15000);

    function updateCountdown() {
      const ms = Math.max(0, LAUNCH - Date.now());
      const s = Math.floor(ms / 1000);
      const z = (n: number) => (n < 10 ? "0" + n : "" + n);
      if (cdD) cdD.textContent = z(Math.floor(s / 86400));
      if (cdH) cdH.textContent = z(Math.floor(s / 3600) % 24);
      if (cdM) cdM.textContent = z(Math.floor(s / 60) % 60);
      if (cdS) cdS.textContent = z(s % 60);
    }
    updateCountdown();
    safeInterval(updateCountdown, 1000);

    // ================= Corrupted Signal Cursor =================
    let cleanupCursor = () => {};
    if (!coarse) {
      const SEL = "a[href],button,[role=button],[data-magnetic],input,select,textarea,summary,label[for]";
      const PAD = 34;
      const X_SVG =
        '<svg class="cs-x CLS" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5v5M10 13.5v5M1.5 10h5M13.5 10h5" stroke="currentColor" stroke-width="1" fill="none"/><rect x="9.5" y="9.5" width="1" height="1" fill="currentColor"/></svg>';
      let html =
        '<span class="cs-fl"></span>' +
        '<span class="cs-ring cs-rr"><span class="scl"><i></i></span></span>' +
        '<span class="cs-ring cs-rw"><span class="scl"><i></i></span></span>' +
        X_SVG.replace("CLS", "cs-xr") +
        X_SVG.replace("CLS", "cs-xw");
      for (let n = 0; n < 3; n++) html += '<span class="cs-sl"></span>';
      for (let n = 0; n < 8; n++) html += '<span class="cs-fr"></span>';

      root.querySelectorAll("#cs").forEach((e) => e.remove());
      const R = document.createElement("div");
      R.id = "cs";
      R.setAttribute("aria-hidden", "true");
      R.innerHTML = html;
      root.appendChild(R);

      const q = (s: string) => R.querySelector<HTMLElement>(s);
      const qa = (s: string) => Array.from(R.querySelectorAll<HTMLElement>(s));

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
      let fiCursor = 0;

      if (xw && xr && rw && rr) {
        gsap.set([xw, xr, rw, rr], {
          xPercent: -50,
          yPercent: -50,
          x: -200,
          y: -200,
        });

        const tw = rm ? 0.04 : 0.22;
        const tr = rm ? 0.05 : 0.34;
        const sxw = gsap.quickSetter(xw, "x", "px");
        const syw = gsap.quickSetter(xw, "y", "px");
        const sxr = gsap.quickTo(xr, "x", {
          duration: rm ? 0.04 : 0.09,
          ease: "power2.out",
        });
        const syr = gsap.quickTo(xr, "y", {
          duration: rm ? 0.04 : 0.09,
          ease: "power2.out",
        });
        const rxw = gsap.quickTo(rw, "x", {
          duration: tw,
          ease: "power3.out",
        });
        const ryw = gsap.quickTo(rw, "y", {
          duration: tw,
          ease: "power3.out",
        });
        const rxr = gsap.quickTo(rr, "x", {
          duration: tr,
          ease: "power3.out",
        });
        const ryr = gsap.quickTo(rr, "y", {
          duration: tr,
          ease: "power3.out",
        });

        let vis = false;
        let over: Element | null = null;
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

        root.classList.add("cs-on");

        function refresh() {
          cands = Array.from(root.querySelectorAll<HTMLElement>(SEL)).filter(
            (e) => e.offsetWidth > 0 && e.offsetHeight > 0
          );
        }

        function magnet(mxCoord: number, myCoord: number): [number, number] {
          let best: DOMRect | null = null;
          let bd = 1e9;
          if (over) {
            best = over.getBoundingClientRect();
            bd = 0;
          } else {
            for (let i = 0; i < cands.length; i++) {
              const r = cands[i].getBoundingClientRect();
              const dx = Math.max(r.left - mxCoord, 0, mxCoord - r.right);
              const dy = Math.max(r.top - myCoord, 0, myCoord - r.bottom);
              const dd = Math.hypot(dx, dy);
              if (dd < bd) {
                bd = dd;
                best = r;
              }
            }
          }
          if (!best || bd > PAD) return [mxCoord, myCoord];
          const k = over ? 0.26 : 0.2 * (1 - bd / PAD);
          const cap = over ? 14 : 9;
          let ox = (best.left + best.width / 2 - mxCoord) * k;
          let oy = (best.top + best.height / 2 - myCoord) * k;
          const len = Math.hypot(ox, oy);
          if (len > cap) {
            ox *= cap / len;
            oy *= cap / len;
          }
          return [mxCoord + ox, myCoord + oy];
        }

        function hoverScale(v: number) {
          if (rwS && rrS) {
            [rwS, rrS].forEach((e, i) => {
              animate(
                e,
                { scale: i ? v * 1.06 : v },
                { type: "spring", stiffness: 380, damping: 26 }
              );
            });
          }
        }

        function glitch(big: boolean) {
          if (rm || !vis || sl.length === 0) return;
          for (let i = 0; i < (big ? 3 : 2); i++) {
            const el = sl[si++ % sl.length];
            const w = 24 + Math.random() * (big ? 110 : 70);
            gsap.killTweensOf(el);
            gsap.set(el, {
              width: w,
              height: Math.random() < 0.5 ? 1 : 2,
              x: mx - w / 2 + (Math.random() - 0.5) * 50,
              y: my + (Math.random() - 0.5) * 34,
              backgroundColor: Math.random() < 0.78 ? "#e2402c" : "#6ef2ff",
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
        }

        function frag(fxCoord: number, fyCoord: number) {
          if (fr.length === 0) return;
          const el = fr[fiCursor++ % fr.length];
          const s = 2 + ((Math.random() * 2) | 0);
          gsap.killTweensOf(el);
          gsap.set(el, {
            width: s,
            height: s,
            x: fxCoord + (Math.random() - 0.5) * 30,
            y: fyCoord + (Math.random() - 0.5) * 22,
            backgroundColor: Math.random() < 0.6 ? "#e2402c" : "#ede6dc",
            opacity: 0.85,
          });
          gsap.to(el, {
            opacity: 0,
            x: "+=" + (Math.random() - 0.5) * 14,
            duration: 0.2 + Math.random() * 0.15,
            ease: "steps(3)",
          });
        }

        function enterHover() {
          R.classList.add("hv");
          hoverScale(1.7);
          glitch(true);
        }

        function leaveHover() {
          R.classList.remove("hv");
          hoverScale(1);
        }

        function hide() {
          vis = false;
          R.classList.remove("on", "dn");
          if (over) {
            leaveHover();
            over = null;
          }
        }

        const onCursorPointerMove = (e: PointerEvent) => {
          if (e.pointerType === "touch") return;
          const x = e.clientX;
          const y = e.clientY;
          const now = performance.now();

          // Hide custom cursor when mouse is over global floating navbar or outside page container
          const target = e.target as HTMLElement | null;
          if (target?.closest("nav, [class*='z-[5000]'], [class*='floating-navbar']")) {
            hide();
            root.classList.remove("cs-on");
            return;
          }

          const rect = root.getBoundingClientRect();
          if (
            x < rect.left ||
            x > rect.right ||
            y < rect.top ||
            y > rect.bottom
          ) {
            hide();
            root.classList.remove("cs-on");
            return;
          }
          root.classList.add("cs-on");

          if (!vis) {
            vis = true;
            R.classList.add("on");
            gsap.set([xw, xr, rw, rr], { x, y });
            lx = x;
            ly = y;
            lt = now;
            refresh();
          }
          mx = x;
          my = y;

          const o = target?.closest(SEL) || null;
          if (o !== over) {
            if (over) leaveHover();
            over = o;
            if (o) enterHover();
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

        const onCursorPointerDown = (e: PointerEvent) => {
          if (e.pointerType === "touch" || e.button > 0 || !vis) return;
          R.classList.add("dn");
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
              .to(rwI, {
                scaleX: 1,
                scaleY: 1,
                duration: 0.22,
                ease: "elastic.out(1,.5)",
              });
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

        const onCursorPointerUp = () => {
          safeTimeout(() => {
            R.classList.remove("dn");
          }, 90);
        };

        const onCursorClick = () => {
          safeTimeout(refresh, 60);
        };

        window.addEventListener("pointermove", onCursorPointerMove, { passive: true });
        window.addEventListener("pointerdown", onCursorPointerDown, { passive: true });
        window.addEventListener("pointerup", onCursorPointerUp, { passive: true });
        window.addEventListener("pointercancel", onCursorPointerUp, { passive: true });
        window.addEventListener("resize", refresh);
        window.addEventListener("click", onCursorClick);
        document.documentElement.addEventListener("mouseleave", hide);
        window.addEventListener("blur", hide);
        const refreshInt = safeInterval(refresh, 2500);

        let delayedLoopCall: gsap.core.Tween | null = null;
        if (!rm) {
          const loop = () => {
            delayedLoopCall = gsap.delayedCall(2.4 + Math.random() * 3.2, () => {
              if (vis && performance.now() - moved < 1400) glitch(false);
              loop();
            });
          };
          loop();
        }

        cleanupCursor = () => {
          window.removeEventListener("pointermove", onCursorPointerMove);
          window.removeEventListener("pointerdown", onCursorPointerDown);
          window.removeEventListener("pointerup", onCursorPointerUp);
          window.removeEventListener("pointercancel", onCursorPointerUp);
          window.removeEventListener("resize", refresh);
          window.removeEventListener("click", onCursorClick);
          document.documentElement.removeEventListener("mouseleave", hide);
          window.removeEventListener("blur", hide);
          clearInterval(refreshInt);
          if (delayedLoopCall) delayedLoopCall.kill();
          gsap.killTweensOf([xw, xr, rw, rr, fl, rwI, rrI, ...sl, ...fr]);
          R.remove();
          root.classList.remove("cs-on");
        };
      }
    }

    // ================= 04 Event Channels =================
    // Interactive event channels tabs & accordion managed cleanly via React state (activeChannel, openEventId)

    // ================= Cleanup =================
    return () => {
      disposed = true;
      document.body.style.overflow = prevBodyOverflow;
      timeouts.forEach((id) => clearTimeout(id));
      intervals.forEach((id) => clearInterval(id));
      if (rafId !== null) cancelAnimationFrame(rafId);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", fitHero);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      feedBtn?.removeEventListener("click", onFeedBtnClick);
      resyncBtn?.removeEventListener("click", onResyncClick);
      humStBtn?.removeEventListener("click", onHumClick);
      sndBtn?.removeEventListener("click", onSndClick);
      replayBtn?.removeEventListener("click", onReplayClick);

      root.querySelectorAll<HTMLElement>("[data-sl]").forEach((e) => {
        unslice(e);
      });
      if (words) words.innerHTML = "";
      if (diag) diag.innerHTML = "";
      if (frags) frags.innerHTML = "";

      io?.disconnect();
      cleanupCursor();

      if (AU.ctx) {
        try {
          AU.ctx.close();
        } catch {}
      }

      if (gl) {
        try {
          const ext = gl.getExtension("WEBGL_lose_context");
          if (ext) ext.loseContext();
        } catch {}
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`cs26-root ${bigShoulders.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable}`}
    >
      <div className="crt" aria-hidden="true" />
      <canvas id="fx" aria-hidden="true" />

      <div id="intro" role="region" aria-label="Opening transmission">
        <div className="sr" aria-live="polite" id="sr" />
        <div className="hud fade" id="diag" aria-hidden="true" />
        <div className="hud fade" id="meta" aria-hidden="true">
          CH 03 &nbsp;/&nbsp; <span id="tc">00:00:00:00</span>
          <br />
          <span id="freq">FREQ ----.-- MHZ</span>
        </div>
        <div id="frags" aria-hidden="true" />
        <div id="words" aria-hidden="true" />
        <div id="xh" aria-hidden="true">
          <svg viewBox="0 0 76 76">
            <circle
              className="ring"
              cx="38"
              cy="38"
              r="26"
              strokeDasharray="3 5"
            />
            <circle className="ring" cx="38" cy="38" r="2" />
            <path className="tick" d="M38 0v18M38 58v18M0 38h18M58 38h18" />
          </svg>
        </div>
        <div className="hud" id="meter" aria-hidden="true">
          <div className="bar" id="bar" />
          <div id="lk">LOCK 0/3</div>
          <div id="prompt" />
        </div>
        <div id="title" aria-hidden="true">
          <div className="sub">
            Transmission // Dot Com Club // Jai Hind College
          </div>
          <span className="disp l1" id="l1">
            <span className="g" data-sl>
              CYBERSTRIKE
            </span>
            <span className="g" data-sl>
              <span className="u">_</span>2026
            </span>
          </span>
          <span className="disp l2" id="l2">
            <span data-sl>LOST SIGNAL</span>
          </span>
        </div>
        <button id="skip" type="button">
          Skip intro <kbd>Esc</kbd>
        </button>
        <button id="snd" type="button" aria-pressed="false">
          Sound off
        </button>
      </div>

      <main id="main" tabIndex={-1}>
        <header className="hero" id="home">
          <div className="wrap">
            <div className="eyebrow mono enter" style={{ ["--d" as string]: ".5s" }}>
              <span>Dot Com Club presents</span>
              <span className="rec">
                <i />
                Rec &nbsp;<span id="tc2">00:00:00:00</span>
              </span>
            </div>
            <h1 className="disp" aria-label="Cyberstrike 26">
              <span className="sl-host" data-sl aria-hidden="true">
                CYBERSTRIKE
              </span>
              <span className="n" aria-hidden="true">
                26
              </span>
            </h1>
            <div className="foot">
              <p className="lead enter" style={{ ["--d" as string]: "1.2s" }}>
                Connection terminated.
                <br />
                Origin unknown.
              </p>
              <div
                className="meta mono enter"
                style={{ ["--d" as string]: "1.4s" }}
              >
                <span>Jai Hind College, Mumbai</span>
                <span>20 November 2026</span>
              </div>
            </div>
            <div className="cue mono enter" style={{ ["--d" as string]: "1.7s" }}>
              <i />
              Scroll to investigate the signal
            </div>
          </div>
        </header>

        <section className="blk" id="signal">
          <div className="wrap s1">
            <div>
              <span className="tag mono">[ 01 — Transmission recovery ]</span>
              <h2
                className="disp h2"
                data-glitch
                aria-label="Recovering the lost signal"
              >
                <span data-sl aria-hidden="true">
                  Recovering
                </span>
                <br />
                <span data-sl aria-hidden="true">
                  the <em>lost</em>
                </span>
                <br />
                <span data-sl aria-hidden="true">
                  signal
                </span>
              </h2>
              <p className="note">
                Somewhere behind the static there is a feed that was never meant
                to leave the building. We are pulling it back, one frame at a
                time.
              </p>
            </div>
            <div>
              <div
                className="mon"
                id="mon"
                role="img"
                aria-label="Analog monitor showing the text lost signal, no carrier, DCC 2026"
              >
                <div className="bars" id="bars" />
                <div className="osd">
                  <span>PLAY ►</span>
                  <span id="osdClock">--:-- SP</span>
                </div>
                <div className="big">
                  <small id="feed">XyQubil // DCC-TV</small>LOST
                  <br />
                  SIGNAL
                </div>
                <div className="scan" />
              </div>
              <div className="ctrl mono">
                <button className="btn" id="resync" type="button">
                  Re-sync signal
                </button>
                <button className="btn" id="feedBtn" type="button">
                  Switch feed
                </button>
                <button
                  className="btn st"
                  id="humSt"
                  type="button"
                  aria-pressed="false"
                >
                  Static hum: off
                </button>
                <button className="btn" id="replay" type="button">
                  Replay intro
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="blk s2" id="theme">
          <div className="wrap">
            <span className="tag mono">[ 02 — Theme reveal ]</span>
            <div className="words">
              <div className="row">
                <span className="disp w o" data-glitch>
                  <span data-sl>Lost</span>
                </span>
                <span className="disp w" data-glitch>
                  <span data-sl>Signal</span>
                </span>
              </div>
            </div>
            <p className="quote">The signal was never lost. It was buried.</p>
          </div>
        </section>

        <section className="blk" id="hackathon">
          <div className="wrap s3">
            <div>
              <span className="tag mono">[ 03 — The hackathon ]</span>
              <h2 className="disp h2" data-glitch aria-label="Join the Hackathon">
                <span data-sl aria-hidden="true">
                  Join the
                </span>
                <br />
                <span data-sl aria-hidden="true">
                  Hack<em>athon</em>
                </span>
              </h2>
              <p>
                Theme: Root Probe. Bring a team, break it open, build it back.
              </p>
              <a className="btn red mono js-reg" href={REG_URL}>
                Join the hackathon <span aria-hidden="true">↗</span>
              </a>
            </div>
            <dl className="spec mono">
              <div>
                <dt>Theme</dt>
                <dd>Root Probe</dd>
              </div>
              <div>
                <dt>Where</dt>
                <dd>Jai Hind College, Mumbai</dd>
              </div>
              <div>
                <dt>When</dt>
                <dd>November 2026</dd>
              </div>
              <div>
                <dt>Team size</dt>
                <dd>2–4 Members</dd>
              </div>
              <div>
                <dt>Prizes</dt>
                <dd>₹50,000</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="blk s5" id="events">
          <div className="wrap">
            <span className="tag mono">[ 04 — Event channels ]</span>
            <h2 className="disp h2" data-glitch aria-label="Tune into the events">
              <span data-sl aria-hidden="true">
                Tune into
              </span>
              <br />
              <span data-sl aria-hidden="true">
                the <em>events</em>
              </span>
            </h2>
            <div className="s5g">
              <div className="side">
                <p className="sin">
                  Eighteen events on three channels. Pick a channel, open an
                  event, read the rules before you register.
                </p>
                <div className="chs" role="tablist" aria-label="Event channels">
                  {D.map((c, i) => (
                    <button
                      key={c.k}
                      className="ch"
                      type="button"
                      role="tab"
                      id={`ch${i}`}
                      aria-controls="evp"
                      aria-selected={activeChannel === i}
                      tabIndex={activeChannel === i ? 0 : -1}
                      data-i={i}
                      onClick={() => {
                        if (activeChannel !== i) {
                          setActiveChannel(i);
                          setOpenEventId(`ev${i}_0`);
                          const fl = document.querySelector("#events .fl");
                          if (fl) {
                            fl.classList.remove("go");
                            void (fl as HTMLElement).offsetWidth;
                            fl.classList.add("go");
                          }
                        }
                      }}
                    >
                      <span className="mono">Channel 0{i + 1}</span>
                      <span className="nm">{c.k}</span>
                      <span className="ct mono">{c.e.length} events</span>
                    </button>
                  ))}
                </div>
                <p className="cnote mono" aria-live="polite">
                  {D[activeChannel].i}
                </p>
                <a className="btn red mono js-reg" href={REG_URL}>
                  Register for events <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="evw">
                <ul
                  className="evs"
                  id="evp"
                  role="tabpanel"
                  aria-labelledby={`ch${activeChannel}`}
                >
                  {D[activeChannel].e.map((e, i) => {
                    const id = `ev${activeChannel}_${i}`;
                    const isOpen = openEventId === id;
                    return (
                      <li
                        key={e.n}
                        className={`ev ${isOpen ? "open" : ""}`}
                        style={
                          {
                            "--i": i,
                            "--dx": "0.00",
                          } as React.CSSProperties
                        }
                      >
                        <button
                          className="eh"
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={id}
                          onClick={() =>
                            setOpenEventId(isOpen ? null : id)
                          }
                        >
                          <span className="en">{e.n}</span>
                          <span className="em mono">
                            {e.m[0] ? e.m[0][1] : ""}
                          </span>
                          <i className="pm" aria-hidden="true" />
                        </button>
                        <div
                          className="eb"
                          id={id}
                          role="region"
                          aria-label={`${e.n} rules`}
                        >
                          <div>
                            <div className="ei">
                              <p className="cn">{e.c}</p>
                              {e.m.length > 0 && (
                                <p className="sp mono">
                                  {e.m.map(([label, val]) => (
                                    <span key={label}>
                                      {label} <b>{val}</b>
                                    </span>
                                  ))}
                                </p>
                              )}
                              <ul className="rl">
                                {e.r.map((rule, rIdx) => (
                                  <li key={rIdx}>{rule}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="fl" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section className="blk s4" id="timeline">
          <div className="wrap">
            <span className="tag mono">[ 04 — Timeline synchronisation ]</span>
            <h2 className="disp h2" data-glitch aria-label="Launch in">
              <span data-sl aria-hidden="true">
                Launch in
              </span>
            </h2>
            <div className="cd" role="timer" aria-label="Time until launch">
              <div>
                <b id="cdD">--</b>
                <span className="mono">Days</span>
              </div>
              <div>
                <b id="cdH">--</b>
                <span className="mono">Hours</span>
              </div>
              <div>
                <b id="cdM">--</b>
                <span className="mono">Minutes</span>
              </div>
              <div>
                <b id="cdS">--</b>
                <span className="mono">Seconds</span>
              </div>
            </div>
            <p className="when mono">
              Jai Hind College, Mumbai &nbsp;|&nbsp; 20 November 2026
            </p>
          </div>
        </section>

        <section className="blk final" id="access">
          <div className="wrap">
            <span className="tag mono">[ Access terminal ]</span>
            <h2 className="disp" data-glitch aria-label="Ready to reconnect?">
              <span data-sl aria-hidden="true">
                Ready to
              </span>
              <br />
              <span data-sl aria-hidden="true">
                reconnect?
              </span>
            </h2>
            <p>
              System waiting for input. Connection window closes 18 November
              2026.
            </p>
            <a className="btn red mono js-reg" href={REG_URL}>
              Register now <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
