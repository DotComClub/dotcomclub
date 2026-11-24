"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FormEvent, use, useEffect, useState } from "react";
import {
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
  DM_Sans,
} from "next/font/google";
import "../../../cyberstrike-26/cyberstrike.css";
import "../../events.css";
import "../../esports/esports.css";
import "../cultural.css";
import CyberstrikeBackground from "@/components/cyberstrike/CyberstrikeBackground";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});
const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

type EventSchema = {
  id: string;
  title: string;
  label: string;
  tagline: string;
  feeDesc: string;
  baseFeeNum: number;
  feeMode: "flat" | "per_person";
  teamFormat: string;
  venue: string;
  capacity: string;
  intro: string;
  rules: string[];
  confirmation: string;
  isSolo: boolean;
  isFixedTeam: boolean;
  teamSize?: number;
  isConditionalTeam?: boolean; // Beat Drop: Solo or 3-5
  isSizedTeam?: boolean; // La Couture: 6-8
};

const EVENTS_DATA: Record<string, EventSchema> = {
  "capture-the-strike": {
    id: "capture-the-strike",
    title: "CAPTURE THE STRIKE",
    label: "Feed 01",
    tagline: "Aim. Focus. Conquer.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo",
    venue: "Room Lab 3",
    capacity: "Maximum participation: 10–15 Participants",
    intro:
      "A team challenge that calls for focus, coordination and precision. Register all three team members and get ready to Capture the Strike. Registration is subject to availability and payment verification.",
    rules: [
      "Solo participants.",
      "One participant must be identified as Team Leader.",
      "All members must provide their details and college ID proof.",
      "Fee is ₹50 per participant.",
      "Participation is subject to capacity, payment verification and organizer confirmation.",
    ],
    confirmation:
      "Thank you for registering for CAPTURE THE STRIKE. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Room Lab 3.",
    isSolo: false, // collects Team Name + Team Leader as per doc
    isFixedTeam: true,
    teamSize: 1,
  },
  "blackout-empire": {
    id: "blackout-empire",
    title: "BLACKOUT EMPIRE",
    label: "Feed 02",
    tagline: "Enter the darkness. Outsmart your opponent. Claim the empire.",
    feeDesc: "₹100 per team",
    baseFeeNum: 100,
    feeMode: "flat",
    teamFormat: "Exactly 2 participants",
    venue: "Basement",
    capacity: "Maximum 6 teams",
    intro:
      "The darkness is your battlefield. Strategy is your weapon. Only the smartest team will emerge victorious. Register with your teammate and put your skills to the test. Registration is subject to availability and payment verification.",
    rules: [
      "Team must have exactly 2 participants.",
      "One participant must be identified as Team Leader.",
      "Both members must provide individual details and college ID proof.",
      "Fee is ₹100 per team.",
      "Maximum 6 teams; registration is subject to availability and payment verification.",
    ],
    confirmation:
      "Thank you for registering for BLACKOUT EMPIRE. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Basement.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 2,
  },
  "the-masked-truth": {
    id: "the-masked-truth",
    title: "THE MASKED TRUTH",
    label: "Feed 03",
    tagline: "Look beyond the mask. Can you uncover the truth?",
    feeDesc: "₹50 per participant",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo participation",
    venue: "Basement / Room 1A",
    capacity: "Maximum 21 participants",
    intro:
      "Step into the challenge, trust your instincts and uncover what lies behind the mask. Register as an individual participant. Registration is subject to availability and payment verification.",
    rules: [
      "This is an individual event; team registrations are not applicable.",
      "Participant must provide accurate personal and college details.",
      "Fee is ₹50 per participant.",
      "Participation is subject to the 21-person limit and payment verification.",
    ],
    confirmation:
      "Thank you for registering for THE MASKED TRUTH. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Basement / Room 1A.",
    isSolo: true,
    isFixedTeam: false,
  },
  "red-handed": {
    id: "red-handed",
    title: "RED HANDED",
    label: "Feed 04",
    tagline: "Stay sharp. Catch the clue. Don't get caught.",
    feeDesc: "₹40 per person (₹160 for a 4-person team)",
    baseFeeNum: 160,
    feeMode: "flat",
    teamFormat: "Exactly 4 participants",
    venue: "Room 2D; waiting area: any room on 1st or 2nd floor of New Building",
    capacity: "Maximum 15 Teams",
    intro:
      "A team event that puts observation and quick thinking to the test. Assemble your four-member team and register all participants. Registration is subject to availability and payment verification.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All four participants must provide their details and college ID proof.",
      "Fee is ₹40 per participant; total ₹160 per team.",
      "Follow organizer instructions for the event room and waiting area.",
    ],
    confirmation:
      "Thank you for registering for RED HANDED. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Room 2D; waiting area: any room on 1st or 2nd floor of New Building.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 4,
  },
  "beat-drop": {
    id: "beat-drop",
    title: "BEAT DROP",
    label: "Feed 05",
    tagline: "Feel the beat. Own the moment.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo OR team of 3–5 participants",
    venue: "Basement",
    capacity: "Maximum 10 Teams",
    intro:
      "Bring your energy and rhythm to Beat Drop. Register individually or as a team, according to the permitted format. Registration is subject to availability and payment verification.",
    rules: [
      "Registration may be solo or as a team of min 3 – max 5 participants.",
      "Fee is ₹50 per participant; calculate total according to the number registered.",
      "For team entries, identify one Team Leader.",
      "For solo entries, complete only Participant 1 details; do not add other participants.",
      "Capacity is listed as 10; organizers must confirm whether the limit counts entries, teams or people.",
    ],
    confirmation:
      "Thank you for registering for BEAT DROP. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Basement.",
    isSolo: false,
    isFixedTeam: false,
    isConditionalTeam: true,
  },
  "la-couture-nights": {
    id: "la-couture-nights",
    title: "LA COUTURE NIGHTS",
    label: "Feed 06",
    tagline: "Style the stage. Make your statement.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "6–8 participants per team",
    venue: "Auditorium",
    capacity: "Maximum 10 Teams",
    intro:
      "Creativity meets confidence at La Couture Nights. Bring your team together and make your mark on the stage. Registration is subject to availability and payment verification.",
    rules: [
      "Each team must have a minimum of 6 and maximum of 8 participants.",
      "One participant must be identified as Team Leader.",
      "Provide details and college ID proof for every registered participant.",
      "Fee is ₹50 per participant; total depends on team size.",
      "Maximum participation is listed as 10; organizers must confirm whether this means teams or people.",
    ],
    confirmation:
      "Thank you for registering for LA COUTURE NIGHTS. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Auditorium.",
    isSolo: false,
    isFixedTeam: false,
    isSizedTeam: true,
  },
  "escape-room": {
    id: "escape-room",
    title: "ESCAPE ROOM",
    label: "Feed 07",
    tagline: "Think fast. Work together. Find your way out.",
    feeDesc: "₹50 per person (₹200 for a 4-person team)",
    baseFeeNum: 200,
    feeMode: "flat",
    teamFormat: "Exactly 4 participants",
    venue: "Rooms 1A and 1D; waiting area: Room 1C",
    capacity: "Maximum 15 Teams",
    intro:
      "Can your team solve the clues, beat the clock and escape? Register your four-member team and take on the challenge. Registration is subject to availability and payment verification.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All participants must provide individual details and college ID proof.",
      "Fee is ₹50 per participant; total ₹200 per team.",
      "Follow organizer instructions for assigned rooms and the waiting area.",
    ],
    confirmation:
      "Thank you for registering for ESCAPE ROOM. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Rooms 1A and 1D; waiting area: Room 1C.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 4,
  },
  "the-static-carnival": {
    id: "the-static-carnival",
    title: "ESCAPE ROOM",
    label: "Feed 07",
    tagline: "Think fast. Work together. Find your way out.",
    feeDesc: "₹50 per person (₹200 for a 4-person team)",
    baseFeeNum: 200,
    feeMode: "flat",
    teamFormat: "Exactly 4 participants",
    venue: "Rooms 1A and 1D; waiting area: Room 1C",
    capacity: "Maximum 15 Teams",
    intro:
      "Can your team solve the clues, beat the clock and escape? Register your four-member team and take on the challenge. Registration is subject to availability and payment verification.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All participants must provide individual details and college ID proof.",
      "Fee is ₹50 per participant; total ₹200 per team.",
      "Follow organizer instructions for assigned rooms and the waiting area.",
    ],
    confirmation:
      "Thank you for registering for ESCAPE ROOM. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: Rooms 1A and 1D; waiting area: Room 1C.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 4,
  },
  debate: {
    id: "debate",
    title: "DEBATE",
    label: "Feed 08",
    tagline: "Speak with purpose. Argue with impact.",
    feeDesc: "₹100 per participant",
    baseFeeNum: 100,
    feeMode: "per_person",
    teamFormat: "Solo participation",
    venue: "AV Room",
    capacity: "Maximum 24 participants",
    intro:
      "Present your perspective, defend your arguments and make your voice heard. Register as an individual participant. Registration is subject to availability and payment verification.",
    rules: [
      "This is an individual event; each registration is for one participant.",
      "Participant must provide accurate personal and college details.",
      "Fee is ₹100 per participant.",
      "Participants should bring/use sheets, bottles and pens, following organizer instructions.",
      "Participation is subject to the 24-person limit and payment verification.",
    ],
    confirmation:
      "Thank you for registering for DEBATE. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: AV Room.",
    isSolo: true,
    isFixedTeam: false,
  },
  "debate-dead-air": {
    id: "debate-dead-air",
    title: "DEBATE",
    label: "Feed 08",
    tagline: "Speak with purpose. Argue with impact.",
    feeDesc: "₹100 per participant",
    baseFeeNum: 100,
    feeMode: "per_person",
    teamFormat: "Solo participation",
    venue: "AV Room",
    capacity: "Maximum 24 participants",
    intro:
      "Present your perspective, defend your arguments and make your voice heard. Register as an individual participant. Registration is subject to availability and payment verification.",
    rules: [
      "This is an individual event; each registration is for one participant.",
      "Participant must provide accurate personal and college details.",
      "Fee is ₹100 per participant.",
      "Participants should bring/use sheets, bottles and pens, following organizer instructions.",
      "Participation is subject to the 24-person limit and payment verification.",
    ],
    confirmation:
      "Thank you for registering for DEBATE. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification. Venue: AV Room.",
    isSolo: true,
    isFixedTeam: false,
  },
  "roll-the-chaos": {
    id: "roll-the-chaos",
    title: "ROLL THE CHAOS",
    label: "Feed 06",
    tagline: "Capture the best CYBERSTRIKE moments.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo or 2–4 participants",
    venue: "Campus wide",
    capacity: "Open capacity",
    intro:
      "Capture the best CYBERSTRIKE moments in a creative short reel. Submit before the deadline.",
    rules: [
      "Reels must feature CYBERSTRIKE and its events.",
      "Use any editing app; keep it original and appropriate.",
      "Fee is ₹50 per participant.",
      "Follow organizer instructions.",
    ],
    confirmation:
      "Thank you for registering for ROLL THE CHAOS. Your details will be reviewed by the organizing committee. Participation is confirmed only after registration and payment verification.",
    isSolo: true,
    isFixedTeam: false,
  },
};

export default function EventRegistrationPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event: slug } = use(params);
  const ev = EVENTS_DATA[slug] || EVENTS_DATA["capture-the-strike"];

  // Form State
  const [codeType, setCodeType] = useState<"PRNC" | "CC">("PRNC");
  const [beatDropFormat, setBeatDropFormat] = useState<"solo" | "team">("solo");
  const [beatDropTeamSize, setBeatDropTeamSize] = useState<number>(3);
  const [coutureTeamSize, setCoutureTeamSize] = useState<number>(6);
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI");
  const [declaration, setDeclaration] = useState(false);

  // File Upload States
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});

  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const titleEl = document.querySelector<HTMLElement>(".er-title");

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
      timer = setTimeout(tick, 2000 + Math.random() * 2600);
    };
    timer = setTimeout(tick, 1800);

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const target = e.target as HTMLElement | null;
      const h = target?.closest(".er-title") as HTMLElement | null;
      if (!h || h.contains(e.relatedTarget as Node | null)) return;
      fireGlx(h);
    };
    document.addEventListener("pointerover", onPointerOver as EventListener);

    return () => {
      disposed = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("pointerover", onPointerOver as EventListener);
    };
  }, []);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const createRegistration = useMutation(
    api.culturalRegistrations.createCulturalRegistration
  );

  // File Upload Helper
  const handleFileUpload = async (
    fieldKey: string,
    file: File | undefined
  ) => {
    if (!file) return;
    setUploadingField(fieldKey);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "File upload failed.");
      }

      setUploadedFiles((prev) => ({ ...prev, [fieldKey]: data.url! }));
    } catch (err: unknown) {
      console.warn("Cloudinary upload failed, using local file name preview:", err);
      // Fallback preview so user is not blocked
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldKey]: `file://${file.name}`,
      }));
    } finally {
      setUploadingField(null);
    }
  };

  // Determine participant slots
  let totalParticipants = 1;
  let isTeamEntry = !ev.isSolo;

  if (ev.isFixedTeam && ev.teamSize) {
    totalParticipants = ev.teamSize;
  } else if (ev.isConditionalTeam) {
    if (beatDropFormat === "solo") {
      totalParticipants = 1;
      isTeamEntry = false;
    } else {
      totalParticipants = beatDropTeamSize;
      isTeamEntry = true;
    }
  } else if (ev.isSizedTeam) {
    totalParticipants = coutureTeamSize;
    isTeamEntry = true;
  }

  // Calculated Fee
  let calculatedFee = ev.feeDesc;
  if (ev.feeMode === "per_person") {
    calculatedFee = `₹${ev.baseFeeNum * totalParticipants} (₹${ev.baseFeeNum} × ${totalParticipants})`;
  }

  // Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!declaration) {
      setError("Please confirm the final declaration checkbox before submitting.");
      return;
    }

    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const getVal = (name: string) => String(form.get(name) ?? "").trim();

    try {
      const collegeName = getVal("collegeName");
      const codeValue = getVal("codeValue");
      const teamName = isTeamEntry ? getVal("teamName") : undefined;

      // Extract participants
      const participantsList = [];
      for (let i = 1; i <= totalParticipants; i++) {
        const role =
          ev.isSolo || (!isTeamEntry && i === 1)
            ? "INDIVIDUAL"
            : i === 1
            ? "TEAM LEADER"
            : "TEAM MEMBER";

        const pName = getVal(`p${i}_name`);
        const pPhone = getVal(`p${i}_phone`);
        const pEmail = getVal(`p${i}_email`);
        const pYear = getVal(`p${i}_year`);
        const pCollegeIdUrl = uploadedFiles[`p${i}_id`] || undefined;

        if (pName) {
          participantsList.push({
            role,
            name: pName,
            phone: pPhone,
            email: pEmail,
            classYear: pYear,
            ...(pCollegeIdUrl ? { collegeIdUrl: pCollegeIdUrl } : {}),
          });
        }
      }

      const p1 = participantsList[0] || {
        name: getVal("p1_name"),
        email: getVal("p1_email"),
        phone: getVal("p1_phone"),
        classYear: getVal("p1_year"),
        collegeIdUrl: uploadedFiles["p1_id"] || undefined,
      };

      await createRegistration({
        event: ev.title,
        collegeName,
        codeType,
        codeValue,
        ...(teamName ? { teamName } : {}),
        entryFormat: ev.isConditionalTeam ? beatDropFormat : ev.teamFormat,
        teamSize: String(totalParticipants),
        name: p1.name,
        email: p1.email,
        phone: p1.phone,
        classYear: p1.classYear,
        ...(p1.collegeIdUrl ? { collegeIdUrl: p1.collegeIdUrl } : {}),
        participants: participantsList,
        registrationFee: calculatedFee,
        paymentMethod,
        ...(getVal("upiTransactionId")
          ? { upiTransactionId: getVal("upiTransactionId") }
          : {}),
        ...(uploadedFiles["paymentScreenshot"]
          ? { paymentScreenshotUrl: uploadedFiles["paymentScreenshot"] }
          : {}),
        ...(getVal("additionalPaymentInfo")
          ? { additionalPaymentInfo: getVal("additionalPaymentInfo") }
          : {}),
        declarationAccepted: true,
      });

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setError("Registration could not be submitted. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`cs26-root cultural-registration live ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}
    >
      <CyberstrikeBackground />
      <main className="er-main" id="main" tabIndex={-1}>
        {/* Navigation Header */}
        <header className="er-header">
          <div className="eh-top mono">
            <Link href="/events/cultural" className="navback">
              <span aria-hidden="true">←</span> Cultural Events
            </Link>
            <span>{ev.label}</span>
          </div>

          <h1 className="ph disp er-title" aria-label={ev.title}>
            {ev.title}
          </h1>

          <p className="tagline">&ldquo;{ev.tagline}&rdquo;</p>

          <div className="meta-bar">
            <span>
              FEE: <b>{ev.feeDesc}</b>
            </span>
            <span>
              FORMAT: <b>{ev.teamFormat}</b>
            </span>
            <span>
              VENUE: <b>{ev.venue}</b>
            </span>
            <span>
              CAPACITY: <b>{ev.capacity}</b>
            </span>
          </div>

          <p className="pin">{ev.intro}</p>
        </header>

        {submitted ? (
          /* Confirmation Message from doc */
          <section className="er-success" role="status">
            <span className="check-icon" aria-hidden="true">
              ✓
            </span>
            <h2 data-events-sl>Registration Received</h2>
            <div className="success-message">
              <p>{ev.confirmation}</p>
            </div>
            <Link className="rgb" href="/events/cultural">
              <span>
                <i className="pd" aria-hidden="true" />
                Return to Cultural Events
              </span>
              <b aria-hidden="true">↗</b>
              <s className="sn" aria-hidden="true" />
            </Link>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="er-form">
            {/* ========================================================
                SECTION 1 – COLLEGE DETAILS
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">[ 01 — College Details ]</div>
              <h3 className="cr-sec-title">Institution Details</h3>
              <p className="cr-sec-desc">
                Please provide your institution details and choose whether you
                are entering with a PRNC Code or a Contingent (CC) Code.
              </p>

              <div className="er-fields">
                <label className="er-field">
                  <span>College Name *</span>
                  <input
                    name="collegeName"
                    type="text"
                    required
                    placeholder="e.g. Jai Hind College, Mumbai"
                  />
                </label>

                {/* PRNC / CC Code with Toggle */}
                <div className="er-field prnc-cc-toggle-group">
                  <span className="prnc-cc-toggle-label">
                    Registration Code Type *
                  </span>
                  <div
                    className="prnc-cc-toggle"
                    role="group"
                    aria-label="Code Type Toggle"
                  >
                    <button
                      type="button"
                      className={`prnc-cc-btn ${
                        codeType === "PRNC" ? "active" : ""
                      }`}
                      onClick={() => setCodeType("PRNC")}
                    >
                      PRNC Code
                    </button>
                    <button
                      type="button"
                      className={`prnc-cc-btn ${
                        codeType === "CC" ? "active" : ""
                      }`}
                      onClick={() => setCodeType("CC")}
                    >
                      CC Code
                    </button>
                  </div>
                  <input
                    name="codeValue"
                    type="text"
                    required
                    placeholder={
                      codeType === "PRNC"
                        ? "Enter PRNC Code (e.g. PRNC-1042)"
                        : "Enter Contingent Code (e.g. CC-JHC)"
                    }
                  />
                </div>
              </div>
            </div>

            {/* ========================================================
                SECTION 2 – PARTICIPANT DETAILS
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">[ 02 — Participant Details ]</div>
              <h3 className="cr-sec-title">Participant &amp; Team</h3>
              <p className="cr-sec-desc">
                {ev.isSolo
                  ? "Individual registration. Please provide your contact and verification details."
                  : "Register the team leader and members according to the event capacity requirements."}
              </p>

              {/* Conditional entry format for Beat Drop */}
              {ev.isConditionalTeam && (
                <div className="er-fields" style={{ marginBottom: "24px" }}>
                  <div className="er-field">
                    <span>Entry Format *</span>
                    <div className="prnc-cc-toggle">
                      <button
                        type="button"
                        className={`prnc-cc-btn ${
                          beatDropFormat === "solo" ? "active" : ""
                        }`}
                        onClick={() => setBeatDropFormat("solo")}
                      >
                        Solo Entry
                      </button>
                      <button
                        type="button"
                        className={`prnc-cc-btn ${
                          beatDropFormat === "team" ? "active" : ""
                        }`}
                        onClick={() => setBeatDropFormat("team")}
                      >
                        Team (3–5 Members)
                      </button>
                    </div>
                  </div>

                  {beatDropFormat === "team" && (
                    <label className="er-field">
                      <span>Number of Participants in Crew *</span>
                      <select
                        value={beatDropTeamSize}
                        onChange={(e) =>
                          setBeatDropTeamSize(Number(e.target.value))
                        }
                      >
                        <option value={3}>3 Participants (Min)</option>
                        <option value={4}>4 Participants</option>
                        <option value={5}>5 Participants (Max)</option>
                      </select>
                    </label>
                  )}
                </div>
              )}

              {/* Sized selector for La Couture Nights */}
              {ev.isSizedTeam && (
                <div className="er-fields" style={{ marginBottom: "24px" }}>
                  <label className="er-field">
                    <span>Team Size Selector *</span>
                    <select
                      value={coutureTeamSize}
                      onChange={(e) =>
                        setCoutureTeamSize(Number(e.target.value))
                      }
                    >
                      <option value={6}>6 Participants (Min)</option>
                      <option value={7}>7 Participants</option>
                      <option value={8}>8 Participants (Max)</option>
                    </select>
                  </label>
                </div>
              )}

              {/* Team Name Field when applicable */}
              {isTeamEntry && (
                <div className="er-fields" style={{ marginBottom: "28px" }}>
                  <label className="er-field full">
                    <span>Team Name *</span>
                    <input
                      name="teamName"
                      type="text"
                      required
                      placeholder="e.g. Strike Force Alpha"
                    />
                  </label>
                </div>
              )}

              {/* Participant Cards */}
              {Array.from({ length: totalParticipants }, (_, idx) => {
                const pNum = idx + 1;
                const isLeader = !ev.isSolo && pNum === 1;
                const isOptional =
                  ev.isConditionalTeam &&
                  beatDropFormat === "team" &&
                  pNum > 3;

                return (
                  <div key={pNum} className="participant-card">
                    <div className="participant-card-header">
                      <span
                        className={`participant-card-title ${
                          isLeader ? "leader" : ""
                        }`}
                      >
                        {ev.isSolo
                          ? "Participant 1 – Individual"
                          : isLeader
                          ? "Participant 1 – TEAM LEADER"
                          : `Participant ${pNum} – TEAM MEMBER`}
                      </span>
                      <span
                        className={`participant-badge ${
                          isLeader ? "leader" : ""
                        }`}
                      >
                        {isLeader
                          ? "TEAM LEADER"
                          : isOptional
                          ? "OPTIONAL"
                          : "MANDATORY"}
                      </span>
                    </div>

                    <div className="er-fields">
                      <label className="er-field">
                        <span>Full Name *</span>
                        <input
                          name={`p${pNum}_name`}
                          type="text"
                          required={!isOptional}
                          placeholder="Full name as on ID"
                        />
                      </label>

                      <label className="er-field">
                        <span>Contact Number *</span>
                        <input
                          name={`p${pNum}_phone`}
                          type="tel"
                          required={!isOptional}
                          placeholder="10-digit mobile number"
                        />
                      </label>

                      <label className="er-field">
                        <span>Email Address *</span>
                        <input
                          name={`p${pNum}_email`}
                          type="email"
                          required={!isOptional}
                          placeholder="name@example.com"
                        />
                      </label>

                      <label className="er-field">
                        <span>Class / Year *</span>
                        <select
                          name={`p${pNum}_year`}
                          required={!isOptional}
                          defaultValue="FY"
                        >
                          <option value="FY">First Year (FY)</option>
                          <option value="SY">Second Year (SY)</option>
                          <option value="TY">Third Year (TY)</option>
                          <option value="Other">Postgraduate / Other</option>
                        </select>
                      </label>

                      <div className="er-field full">
                        <span>
                          College ID Proof Upload (PDF / JPG / PNG) *
                        </span>
                        <label className="event-upload">
                          <span className="event-upload-icon" aria-hidden="true">↑</span>
                          <span className="event-upload-copy">
                            <b>Choose college ID</b>
                            <small>PDF, JPG, PNG or WEBP · Max 4 MB</small>
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={(e) =>
                              handleFileUpload(
                                `p${pNum}_id`,
                                e.target.files?.[0]
                              )
                            }
                            disabled={uploadingField === `p${pNum}_id`}
                          />
                        </label>
                        {uploadedFiles[`p${pNum}_id`] && (
                          <span className="event-upload-status">
                            <b aria-hidden="true">✓</b> College ID uploaded
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================================
                SECTION 3 – PAYMENT PROOF & RULES
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">
                [ 03 — Payment Proof &amp; Rules ]
              </div>
              <h3 className="cr-sec-title">Payment Verification</h3>
              <p className="cr-sec-desc">
                Payment is required to confirm your slot. Complete payment via
                UPI, Bank Transfer, or Cash (if accepted at desk).
              </p>

              {/* Display-only Fee Card */}
              <div className="fee-display-card">
                <div>
                  <div className="fee-display-label">Registration Fee</div>
                  <div style={{ fontSize: "12px", color: "var(--dim)" }}>
                    Calculated for {totalParticipants}{" "}
                    {totalParticipants === 1 ? "participant" : "participants"}
                  </div>
                </div>
                <div className="fee-display-amount">{calculatedFee}</div>
              </div>

              <div className="er-fields" style={{ marginBottom: "28px" }}>
                <label className="er-field">
                  <span>Payment Method *</span>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash (only if accepted)</option>
                  </select>
                </label>

                <label className="er-field">
                  <span>
                    UPI Transaction ID / Reference Number{" "}
                    {paymentMethod !== "Cash" && "*"}
                  </span>
                  <input
                    name="upiTransactionId"
                    type="text"
                    required={paymentMethod !== "Cash"}
                    placeholder="12-digit UPI reference or txn ID"
                  />
                </label>

                <div className="er-field full">
                  <span>Payment Screenshot (PDF / JPG / PNG) *</span>
                  <label className="event-upload">
                    <span className="event-upload-icon" aria-hidden="true">↑</span>
                    <span className="event-upload-copy">
                      <b>Choose payment screenshot</b>
                      <small>PDF, JPG, PNG or WEBP · Max 4 MB</small>
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.webp"
                      required={!uploadedFiles["paymentScreenshot"]}
                      onChange={(e) =>
                        handleFileUpload(
                          "paymentScreenshot",
                          e.target.files?.[0]
                        )
                      }
                      disabled={uploadingField === "paymentScreenshot"}
                    />
                  </label>
                  {uploadedFiles["paymentScreenshot"] && (
                    <span className="event-upload-status">
                      <b aria-hidden="true">✓</b> Payment proof uploaded
                    </span>
                  )}
                </div>

                <label className="er-field full">
                  <span>Additional Payment Information (Optional)</span>
                  <textarea
                    name="additionalPaymentInfo"
                    placeholder="Any notes about account name, transfer time, or registration remarks..."
                  />
                </label>
              </div>

              {/* B. Rules & Regulations Box */}
              <div className="rules-box">
                <h4>Rules &amp; Regulations</h4>
                <ul>
                  {ev.rules.map((rule, rIdx) => (
                    <li key={rIdx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* C. Final Declaration Checkbox */}
              <label className="declaration-label">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  required
                />
                <span>
                  <b>Required Declaration:</b> I confirm the participant/team
                  size and format meet the event requirements; all information
                  is accurate; participant(s) agree to follow organizer
                  instructions and event rules; and I understand registration is
                  subject to capacity and payment verification.
                </span>
              </label>

              {/* Error Banner */}
              {error && (
                <div className="er-error" role="alert">
                  {error}
                </div>
              )}

              {/* BOLD & VISIBLE SUBMIT BUTTON */}
              <div className="submit-container">
                <button
                  type="submit"
                  className="event-submit er-submit-btn"
                  disabled={submitting || uploadingField !== null}
                >
                  <span>
                    <i className="pd" aria-hidden="true" />
                    {submitting
                      ? "TRANSMITTING REGISTRATION..."
                      : `SUBMIT ${ev.title} REGISTRATION`}
                  </span>
                  <b aria-hidden="true">↗</b>
                  <s className="sn" aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
