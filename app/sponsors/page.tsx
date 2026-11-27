"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/home/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { CustomCursor } from "@/components/home/CustomCursor";
import { anton, dmSans } from "@/fonts/font";

interface SponsorItem {
  id: string;
  name: string;
  urlPath: string;
  logo: string;
  category: string;
  tier: "01 / Title Sponsor" | "02 / Powered By" | "03 / Associate" | "04 / Partner";
}

const TITLE_SPONSOR: SponsorItem = {
  id: "title-1",
  name: "Red Bull",
  urlPath: "cyberstrike.dcc/redbull",
  logo: "/2024/Sponsor37.jpeg",
  category: "Headline Title Partner",
  tier: "01 / Title Sponsor",
};

const POWERED_BY: SponsorItem[] = [
  {
    id: "pwr-1",
    name: "Omen by HP",
    urlPath: "cyberstrike.dcc/omen",
    logo: "/2024/Sponsor19.png",
    category: "Gaming Tech Partner",
    tier: "02 / Powered By",
  },
  {
    id: "pwr-2",
    name: "YouTube FanFest",
    urlPath: "cyberstrike.dcc/yt-fanfest",
    logo: "/2024/Sponsor15.jpg",
    category: "Digital Media Partner",
    tier: "02 / Powered By",
  },
];

const ASSOCIATE_SPONSORS: SponsorItem[] = [
  {
    id: "asc-1",
    name: "Coding Blocks",
    urlPath: "cyberstrike.dcc/coding-blocks",
    logo: "/2024/Sponsor13.png",
    category: "EdTech Partner",
    tier: "03 / Associate",
  },
  {
    id: "asc-2",
    name: "College Rivals",
    urlPath: "cyberstrike.dcc/college-rivals",
    logo: "/2024/Sponsor14.jpg",
    category: "Esports Arena Partner",
    tier: "03 / Associate",
  },
  {
    id: "asc-3",
    name: "SMAAASH",
    urlPath: "cyberstrike.dcc/smaaash",
    logo: "/2024/Sponsor41.png",
    category: "Entertainment Partner",
    tier: "03 / Associate",
  },
  {
    id: "asc-4",
    name: "Zero Latency",
    urlPath: "cyberstrike.dcc/zero-latency",
    logo: "/2024/Sponsor45.jpg",
    category: "VR Gaming Partner",
    tier: "03 / Associate",
  },
];

const PARTNERS: SponsorItem[] = [
  {
    id: "prt-1",
    name: "Amity University",
    urlPath: "cyberstrike.dcc/amity",
    logo: "/2025/Sp02.png",
    category: "Academic Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-2",
    name: "Carnival Cinemas",
    urlPath: "cyberstrike.dcc/carnival-cinemas",
    logo: "/2024/Sponsor10.webp",
    category: "Entertainment Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-3",
    name: "Bounce INC",
    urlPath: "cyberstrike.dcc/bounce-inc",
    logo: "/2024/Sponsor08.jpeg",
    category: "Activity Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-4",
    name: "The J",
    urlPath: "cyberstrike.dcc/the-j",
    logo: "/2024/Sponsor21.jpeg",
    category: "F&B Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-5",
    name: "Gamer's Retreat",
    urlPath: "cyberstrike.dcc/gamers-retreat",
    logo: "/2024/Sponsor17.png",
    category: "Esports Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-6",
    name: "Parabolica",
    urlPath: "cyberstrike.dcc/parabolica",
    logo: "/2025/Sp09.jpg",
    category: "Social Gaming",
    tier: "04 / Partner",
  },
  {
    id: "prt-7",
    name: "No Escape",
    urlPath: "cyberstrike.dcc/no-escape",
    logo: "/2024/Sponsor31.webp",
    category: "Mystery Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-8",
    name: "SportsQVest",
    urlPath: "cyberstrike.dcc/sports-qvest",
    logo: "/2024/Sponsor42.png",
    category: "Merch Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-9",
    name: "Big Scoop Cafe",
    urlPath: "cyberstrike.dcc/big-scoop",
    logo: "/2024/Sponsor04.jpg",
    category: "Hospitality Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-10",
    name: "Rio",
    urlPath: "cyberstrike.dcc/rio",
    logo: "/2024/Sponsor38.png",
    category: "Beverage Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-11",
    name: "The Ranch",
    urlPath: "cyberstrike.dcc/the-ranch",
    logo: "/2024/Sponsor36.png",
    category: "Youth Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-12",
    name: "Chip'n Dip",
    urlPath: "cyberstrike.dcc/chip-n-dip",
    logo: "/2024/Sponsor22.png",
    category: "Snacks Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-13",
    name: "Peculiar Photobooths",
    urlPath: "cyberstrike.dcc/peculiar-photobooths",
    logo: "/2024/Sponsor33.png",
    category: "Photobooth Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-14",
    name: "Art Esthetique",
    urlPath: "cyberstrike.dcc/art-esthetique",
    logo: "/2024/Sponsor05.png",
    category: "Creative Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-15",
    name: "Chatore",
    urlPath: "cyberstrike.dcc/chatore",
    logo: "/2024/Sponsor12.jpeg",
    category: "Food Partner",
    tier: "04 / Partner",
  },
  {
    id: "prt-16",
    name: "Dreq",
    urlPath: "cyberstrike.dcc/dreq",
    logo: "/2024/Sponsor01.webp",
    category: "Apparel Partner",
    tier: "04 / Partner",
  },
];

const ALL_SPONSORS: SponsorItem[] = [
  TITLE_SPONSOR,
  ...POWERED_BY,
  ...ASSOCIATE_SPONSORS,
  ...PARTNERS,
];

type MarqueePill =
  | { kind: "sponsor"; sponsor: SponsorItem }
  | { kind: "cta"; id: string; label: string; href: string; lime?: boolean };

const ROW_1: MarqueePill[] = [
  TITLE_SPONSOR,
  ...POWERED_BY,
  ...ASSOCIATE_SPONSORS,
  PARTNERS[0],
].map((sponsor) => ({ kind: "sponsor", sponsor }));

const ROW_2: MarqueePill[] = [
  { kind: "sponsor", sponsor: PARTNERS[1] },
  { kind: "sponsor", sponsor: PARTNERS[2] },
  {
    kind: "cta",
    id: "cta-ecosystem",
    label: "23+ Brand Partners",
    href: "#join",
    lime: true,
  },
  { kind: "sponsor", sponsor: PARTNERS[3] },
  { kind: "sponsor", sponsor: PARTNERS[4] },
  { kind: "sponsor", sponsor: PARTNERS[5] },
  { kind: "sponsor", sponsor: PARTNERS[6] },
];

const ROW_3: MarqueePill[] = [
  {
    kind: "cta",
    id: "cta-and-more",
    label: "And Others",
    href: "#join",
  },
  ...PARTNERS.slice(7).map(
    (sponsor): MarqueePill => ({ kind: "sponsor", sponsor })
  ),
];

const MARQUEE_ROWS: {
  id: string;
  items: MarqueePill[];
  reverse?: boolean;
  duration: string;
}[] = [
  { id: "row-1", items: ROW_1, duration: "40s" },
  { id: "row-2", items: ROW_2, reverse: true, duration: "44s" },
  { id: "row-3", items: ROW_3, duration: "46s" },
];

interface MarqueeRowProps {
  items: MarqueePill[];
  reverse?: boolean;
  duration: string;
  activeId: string;
  onSelectSponsor: (sponsor: SponsorItem) => void;
}

/**
 * Infinite horizontal sponsor pill row with smooth pause-on-hover and edge fade.
 */
function MarqueeRow({
  items,
  reverse,
  duration,
  activeId,
  onSelectSponsor,
}: MarqueeRowProps) {
  const renderPill = (item: MarqueePill, keyPrefix: string) => {
    if (item.kind === "cta") {
      return (
        <a
          key={`${keyPrefix}-${item.id}`}
          href={item.href}
          className={`sp-pill ${item.lime ? "is-lime" : "is-text"}`}
        >
          {item.label}
        </a>
      );
    }

    const { sponsor } = item;
    const isActive = sponsor.id === activeId;
    return (
      <button
        key={`${keyPrefix}-${sponsor.id}`}
        type="button"
        className="sp-pill"
        data-active={isActive ? "true" : "false"}
        onMouseEnter={() => onSelectSponsor(sponsor)}
        onClick={() => onSelectSponsor(sponsor)}
        title={`${sponsor.name} — ${sponsor.category}`}
      >
        <span>{sponsor.name}</span>
        <span className="sp-ico">
          <Image
            src={sponsor.logo}
            alt={sponsor.name}
            width={40}
            height={40}
            className="object-contain"
          />
        </span>
      </button>
    );
  };

  return (
    <div className={`sp-row ${reverse ? "rev" : ""}`}>
      <div
        className="sp-track"
        style={{ "--sp-dur": duration } as React.CSSProperties}
      >
        {[0, 1].map((halfIdx) => (
          <div
            key={halfIdx}
            className="sp-half"
            aria-hidden={halfIdx === 1 ? true : undefined}
          >
            {items.map((item) => renderPill(item, `h${halfIdx}`))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SponsorsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSponsor, setActiveSponsor] = useState<SponsorItem>(TITLE_SPONSOR);
  const cxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 30);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver for heading reveals
  useEffect(() => {
    if (!isLoaded) return;

    const revealEls = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    revealEls.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [isLoaded]);

  // Subtle mouse parallax for the 3D floating cubes
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cxRef.current) return;
    const { clientX, clientY } = e;
    const cx = (clientX / window.innerWidth - 0.5) * 40;
    const cy = (clientY / window.innerHeight - 0.5) * 40;
    cxRef.current.style.setProperty("--px", `${cx}`);
    cxRef.current.style.setProperty("--py", `${cy}`);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const cycleSponsor = (dir: -1 | 1) => {
    const idx = ALL_SPONSORS.findIndex((s) => s.id === activeSponsor.id);
    const nextIdx = (idx + dir + ALL_SPONSORS.length) % ALL_SPONSORS.length;
    setActiveSponsor(ALL_SPONSORS[nextIdx]);
  };

  return (
    <div
      className={`sponsor-root home-root ${isLoaded ? "go" : ""} ${anton.variable} ${dmSans.variable}`}
    >
      <Navbar />
      <CustomCursor />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <header className="hero" id="hero">
        <div className="wrap">
          <div className="hg2">
            {/* Left Column: Editorial Headline & Actions */}
            <div>
              <div className="pill" style={{ marginBottom: 16 }}>
                <i />
                CYBERSTRIKE 2026 • DOT COM CLUB
              </div>
              <h1 className="h1 sh1" aria-label="Meet our sponsors.">
                <s>
                  <i>Meet our</i>
                </s>
                <s>
                  <i>sponsors.</i>
                </s>
              </h1>
              <p>
                Every breakthrough needs a launchpad. Our sponsors power the
                engineers, designers, and creators building the future at Jai
                Hind College.
              </p>
              <div className="bt">
                <a className="btn dk" href="#backers">
                  See All Sponsors
                </a>
                <a
                  className="btn wh"
                  href="mailto:jhcdotcomclub.official@gmail.com"
                >
                  Become a Sponsor
                </a>
              </div>
            </div>

            {/* Right Column: Hero Astronaut Stage */}
            <div className="stage s1">
              <div className="sbg" />
              <div className="bl a" />
              <div className="bl b" />
              <div className="rg" />
              <div className="rg r2" />
              <div className="pw">
                <Image
                  src="/images/sponsor-astronaut-hero.webp"
                  alt="Cyberstrike Astronaut"
                  width={600}
                  height={750}
                  priority
                  className="as"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── STATEMENT: BETTER TOGETHER ──────────────────────────────────── */}
      <section className="tier cnt">
        <div className="wrap">
          <div
            className="pill"
            style={{
              background: "#1B1030",
              color: "#F4EEFF",
              marginBottom: 16,
            }}
          >
            <i style={{ background: "#9E71FF" }} />
            PARTNERSHIP MATTERS
          </div>
          <h2 className="hd rv">Better together.</h2>
          <p className="lead">
            Great tech festivals aren’t built alone. They’re fueled by companies
            that believe in student innovation, open-source spirit, and the
            relentless curiosity of the next generation.
          </p>
        </div>
      </section>

      {/* ── BACKED BY THE BEST: ANIMATED 3-ROW PILL MARQUEE WALL ───────── */}
      <section
        className="tier t-dk"
        id="backers"
        style={{ background: "#0E0819" }}
      >
        {/* Floating 3D Cubes */}
        <div className="cx" ref={cxRef} aria-hidden="true">
          <div
            className="cs"
            style={
              {
                "--px": "4",
                "--py": "8",
                "--k": "0.05",
                left: "3%",
                top: "7%",
              } as React.CSSProperties
            }
          >
            <div
              className="fd"
              style={
                {
                  "--t": "18s",
                  "--dx": "14px",
                  "--dy": "18px",
                } as React.CSSProperties
              }
            >
              <div
                className="cube"
                style={
                  { "--s": "18px", "--t": "18s" } as React.CSSProperties
                }
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div
            className="cs"
            style={
              {
                "--px": "-6",
                "--py": "14",
                "--k": "0.07",
                right: "6%",
                top: "11%",
              } as React.CSSProperties
            }
          >
            <div
              className="fd"
              style={
                {
                  "--t": "22s",
                  "--dx": "-18px",
                  "--dy": "22px",
                } as React.CSSProperties
              }
            >
              <div
                className="cube"
                style={
                  { "--s": "26px", "--t": "22s" } as React.CSSProperties
                }
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div
            className="cs gt"
            style={
              {
                "--px": "7",
                "--py": "22",
                "--k": "0.06",
                left: "1%",
                top: "38%",
              } as React.CSSProperties
            }
          >
            <div
              className="fd"
              style={
                {
                  "--t": "25s",
                  "--dx": "20px",
                  "--dy": "-16px",
                } as React.CSSProperties
              }
            >
              <div
                className="cube"
                style={
                  { "--s": "22px", "--t": "25s" } as React.CSSProperties
                }
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div
            className="cs gt"
            style={
              {
                "--px": "-8",
                "--py": "30",
                "--k": "0.08",
                right: "2%",
                top: "56%",
              } as React.CSSProperties
            }
          >
            <div
              className="fd"
              style={
                {
                  "--t": "19s",
                  "--dx": "-14px",
                  "--dy": "24px",
                } as React.CSSProperties
              }
            >
              <div
                className="cube"
                style={
                  { "--s": "32px", "--t": "19s" } as React.CSSProperties
                }
              >
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <h2 className="hd rv">Backed by the best.</h2>
          <p className="lead" style={{ color: "#B3A5D6", maxWidth: 640 }}>
            From leading tech pioneers to hyper-growth innovators standing
            behind Cyberstrike 2025-2026 — hover or click any brand pill below
            to inspect their partnership.
          </p>

          {/* Animated 3-Row Sponsor Pill Marquee Container */}
          <div className="sp-wall">
            {MARQUEE_ROWS.map((row) => (
              <MarqueeRow
                key={row.id}
                items={row.items}
                reverse={row.reverse}
                duration={row.duration}
                activeId={activeSponsor.id}
                onSelectSponsor={setActiveSponsor}
              />
            ))}
          </div>

          {/* Interactive Selected Sponsor Spotlight Bar */}
          <div className="sp-spot">
            <div className="sp-spot-brand">
              <div className="sp-spot-logo">
                <Image
                  src={activeSponsor.logo}
                  alt={activeSponsor.name}
                  width={96}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="sp-spot-meta">
                <span className="sp-spot-tier">{activeSponsor.tier}</span>
                <h3>{activeSponsor.name}</h3>
                <p className="sp-spot-cat">
                  {activeSponsor.category} • {activeSponsor.urlPath}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-label="Previous sponsor"
                onClick={() => cycleSponsor(-1)}
                className="w-10 h-10 rounded-full border border-[#9E71FF]/40 bg-[#1A1230] text-[#F4EEFF] flex items-center justify-center hover:border-[#9E71FF] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Next sponsor"
                onClick={() => cycleSponsor(1)}
                className="w-10 h-10 rounded-full border border-[#9E71FF]/40 bg-[#1A1230] text-[#F4EEFF] flex items-center justify-center hover:border-[#9E71FF] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="mailto:jhcdotcomclub.official@gmail.com?subject=Partner%20Inquiry%20Cyberstrike%202026"
                className="sp-cta-lime"
              >
                <span>+ Become a Partner</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACKED IMPACT CARDS: WHY PARTNER WITH US ─────────────────────── */}
      <section className="tier t-dk">
        <div className="wrap">
          <h2 className="hd rv">Why partner with us.</h2>
          <p className="lead" style={{ color: "#B3A5D6" }}>
            Four reasons brands return to Cyberstrike year after year.
          </p>

          <div className="rs">
            <div
              style={
                {
                  "--i": "0",
                  "--b": "#9E71FF",
                  "--f": "#1B1030",
                } as React.CSSProperties
              }
            >
              <em>01 Be seen</em>
              <div>
                <h3>5,000+ TECH-FORWARD STUDENTS</h3>
                <p>
                  Unmatched on-campus and digital brand impressions across
                  Mumbai&apos;s premier colleges and computer science faculties.
                </p>
              </div>
            </div>

            <div
              style={
                {
                  "--i": "1",
                  "--b": "#EDE5FF",
                  "--f": "#1B1030",
                } as React.CSSProperties
              }
            >
              <em>02 Meet talent</em>
              <div>
                <h3>DIRECT HIRING PIPELINE</h3>
                <p>
                  Engage directly with passionate software engineers, UI/UX
                  designers, and ethical hackers through hackathons and
                  workshops.
                </p>
              </div>
            </div>

            <div
              style={
                {
                  "--i": "2",
                  "--b": "#5A2FC0",
                  "--f": "#F4EEFF",
                } as React.CSSProperties
              }
            >
              <em>03 Back a cause</em>
              <div>
                <h3>RECORD-BREAKING E-WASTE DRIVE</h3>
                <p>
                  Align your brand with genuine sustainability. Over 2 tons of
                  e-waste collected and responsibly recycled across college
                  editions.
                </p>
              </div>
            </div>

            <div
              style={
                {
                  "--i": "3",
                  "--b": "#ffffff",
                  "--f": "#1B1030",
                } as React.CSSProperties
              }
            >
              <em>04 Join the story</em>
              <div>
                <h3>OMNICHANNEL CREDITING</h3>
                <p>
                  Prominent placement across physical banners, official
                  merchandise, website portals, and digital social campaigns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / WHY SECTION WITH ASTRONAUT ─────────────────────────────── */}
      <section className="tier cta why" id="join">
        <div className="wrap">
          <div className="hg2">
            <div>
              <h2 className="hd rv">Be part of the story.</h2>
              <p>
                Custom packages, dedicated booths, track sponsorships, and
                campus-wide branding opportunities are open for Cyberstrike
                2026.
              </p>
              <div className="bt">
                <a
                  className="btn dk"
                  href="mailto:jhcdotcomclub.official@gmail.com"
                >
                  Get in Touch
                </a>
                <a
                  className="btn wh"
                  href="mailto:jhcdotcomclub.official@gmail.com?subject=Cyberstrike%202026%20Sponsorship%20Brochure"
                >
                  Request Brochure
                </a>
              </div>
            </div>

            <div className="stage s2">
              <div className="sbg" />
              <div className="bl a" />
              <div className="bl b" />
              <div className="rg" />
              <div className="rg r2" />
              <div className="pw">
                <Image
                  src="/images/sponsor-astronaut-cta.webp"
                  alt="Cyberstrike Astronaut in Orbit"
                  width={600}
                  height={750}
                  priority
                  className="as"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Same as /blogs) ───────────────────────────────────────── */}
      <FooterSection />
    </div>
  );
}
