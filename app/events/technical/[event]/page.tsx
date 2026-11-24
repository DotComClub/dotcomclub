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
import "../../cultural/cultural.css";
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

type TechEventSchema = {
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
};

const TECH_EVENTS_DATA: Record<string, TechEventSchema> = {
  "cyber-hunt": {
    id: "cyber-hunt",
    title: "CYBER HUNT",
    label: "Feed 01",
    tagline: "Aim, decrypt, unlock.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo / Individual",
    venue: "Lab 1",
    capacity: "Maximum participation: 20 Participants",
    intro:
      "A digital treasure hunt. Solve cyber puzzles, cryptic ciphers and decode security locks to unlock each password-protected file. Registration is subject to availability and verification.",
    rules: [
      "Solo participants.",
      "Every participant starts with the same locked file.",
      "Each solved puzzle yields the next password; no skipping or borrowing.",
      "Limited hints available at a predefined penalty.",
      "First verified correct final answer wins.",
    ],
    confirmation:
      "Thank you for registering for CYBER HUNT. Your details will be reviewed by the technical committee. Venue: Lab 1.",
    isSolo: true,
    isFixedTeam: false,
  },
  "ai-prompt-wars": {
    id: "ai-prompt-wars",
    title: "AI PROMPT WARS",
    label: "Feed 02",
    tagline: "Out-prompt, out-think, out-create.",
    feeDesc: "₹100 per team",
    baseFeeNum: 100,
    feeMode: "flat",
    teamFormat: "Exactly 2 participants",
    venue: "Lab 3",
    capacity: "Maximum 10 teams",
    intro:
      "Build sharp prompts, improve AI output and catch subtle errors and hallucinations under strict time constraints. Test your prompt engineering mastery.",
    rules: [
      "Team must have exactly 2 participants.",
      "One participant must be identified as Team Leader.",
      "Both members must provide details and college ID proof.",
      "Organiser-approved AI tools only.",
      "Judged on prompt quality, accuracy, relevance, and error detection.",
    ],
    confirmation:
      "Thank you for registering for AI PROMPT WARS. Your details will be reviewed by the organizing committee. Venue: Lab 3.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 2,
  },
  "algorithm-auction": {
    id: "algorithm-auction",
    title: "ALGORITHM AUCTION",
    label: "Feed 03",
    tagline: "Bid wisely. Code ruthlessly.",
    feeDesc: "₹100 per team",
    baseFeeNum: 100,
    feeMode: "flat",
    teamFormat: "Exactly 2 participants",
    venue: "Lab 4",
    capacity: "Maximum 10 teams",
    intro:
      "Bid virtual CyberCoins for the right to solve programming challenges. Balance your budget and code efficiently under pressure. Highest score wins.",
    rules: [
      "Team must have exactly 2 participants.",
      "One participant must be identified as Team Leader.",
      "Both members must provide details and college ID proof.",
      "Accepted bids cannot be withdrawn; submit solutions within time limit.",
      "Highest final score wins.",
    ],
    confirmation:
      "Thank you for registering for ALGORITHM AUCTION. Your details will be reviewed by the technical committee. Venue: Lab 4.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 2,
  },
  "among-us": {
    id: "among-us",
    title: "AMONG US: CYBERSTRIKE",
    label: "Feed 04",
    tagline: "Trust no one. Spot the imposter.",
    feeDesc: "₹50 per participant",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo participation",
    venue: "Lab 6A / Corridor",
    capacity: "Maximum 12 players per lobby",
    intro:
      "Real-life social deduction. Crewmates finish tech tasks while Impostors sabotage the system. Decipher cues, call emergency meetings and survive the purge.",
    rules: [
      "Individual registration; roles assigned secretly by the Game Master.",
      "Crewmates complete tasks at designated tech stations.",
      "Meetings and voting follow official protocols.",
      "No real hacking, private file access or physical interference.",
      "The Game Master settles all disputes.",
    ],
    confirmation:
      "Thank you for registering for AMONG US: CYBERSTRIKE EDITION. Your details will be reviewed by the organizing committee. Venue: Lab 6A / Corridor.",
    isSolo: true,
    isFixedTeam: false,
  },
  "signal-sprint": {
    id: "signal-sprint",
    title: "SIGNAL SPRINT",
    label: "Feed 05",
    tagline: "Fast mind. Quick buzzer. Total dominance.",
    feeDesc: "₹160 per team (₹40 / person)",
    baseFeeNum: 160,
    feeMode: "flat",
    teamFormat: "Exactly 4 participants",
    venue: "Seminar Hall",
    capacity: "Maximum 12 teams",
    intro:
      "A three-level tech quiz that tests knowledge, observation, algorithmic logic and quick reflexes under buzzer pressure.",
    rules: [
      "Team must have exactly 4 participants.",
      "One participant must be identified as Team Leader.",
      "All four participants must provide details and college ID proof.",
      "Three rounds: survey-board questions, visual recognition, speed buzzer.",
      "Referee's decision is final.",
    ],
    confirmation:
      "Thank you for registering for SIGNAL SPRINT. Your details will be reviewed by the organizing committee. Venue: Seminar Hall.",
    isSolo: false,
    isFixedTeam: true,
    teamSize: 4,
  },
  "canva-override": {
    id: "canva-override",
    title: "CANVA: CREATIVE OVERRIDE",
    label: "Feed 06",
    tagline: "Prompt. Design. Render the future.",
    feeDesc: "₹50 per person",
    baseFeeNum: 50,
    feeMode: "per_person",
    teamFormat: "Solo participation",
    venue: "Lab 5",
    capacity: "Maximum 20 participants",
    intro:
      "A timed, AI-assisted design contest: generate an aesthetic cyber poster, then create a promotional motion graphic. Showcase visual mastery.",
    rules: [
      "Solo participants.",
      "Round 1: AI-assisted poster on an assigned cyber theme.",
      "Round 2: short promotional motion graphic on a secondary theme.",
      "Canva and approved generative tools only; original work submitted before deadlines.",
      "Highest combined score across rounds wins.",
    ],
    confirmation:
      "Thank you for registering for CANVA: CREATIVE OVERRIDE. Your details will be reviewed by the organizing committee. Venue: Lab 5.",
    isSolo: true,
    isFixedTeam: false,
  },
};

export default function TechEventRegistrationPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event: slug } = use(params);
  const ev = TECH_EVENTS_DATA[slug] || TECH_EVENTS_DATA["cyber-hunt"];

  // Form State
  const [codeType, setCodeType] = useState<"PRNC" | "CC">("PRNC");
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
      setUploadedFiles((prev) => ({
        ...prev,
        [fieldKey]: `file://${file.name}`,
      }));
    } finally {
      setUploadingField(null);
    }
  };

  const totalParticipants = ev.isSolo ? 1 : ev.teamSize || 2;
  const isTeamEntry = !ev.isSolo;

  // Calculated Fee
  let calculatedFee = ev.feeDesc;
  if (ev.feeMode === "per_person") {
    calculatedFee = `₹${ev.baseFeeNum * totalParticipants} (₹${ev.baseFeeNum} × ${totalParticipants})`;
  } else {
    calculatedFee = `₹${ev.baseFeeNum} flat fee`;
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
        phone: getVal("p1_phone"),
        email: getVal("p1_email"),
        classYear: getVal("p1_year"),
        collegeIdUrl: uploadedFiles["p1_id"],
      };

      await createRegistration({
        event: ev.title,
        collegeName,
        codeType,
        codeValue,
        teamName,
        entryFormat: isTeamEntry ? "Team" : "Solo",
        teamSize: String(totalParticipants),
        name: p1.name,
        email: p1.email,
        phone: p1.phone,
        classYear: p1.classYear,
        collegeIdUrl: p1.collegeIdUrl,
        participants: participantsList,
        registrationFee: calculatedFee,
        paymentMethod,
        upiTransactionId: getVal("upiTxnId") || undefined,
        paymentScreenshotUrl: uploadedFiles["payment_ss"] || undefined,
        additionalPaymentInfo: getVal("additionalPaymentInfo") || undefined,
        declarationAccepted: true,
      });

      setSubmitted(true);
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please check required fields."
      );
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
        <header className="er-header">
          <div className="eh-top mono">
            <Link href="/events/technical" className="navback">
              <span aria-hidden="true">←</span> Technical Events
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
          <div className="confirmation-card">
            <div className="mono success-badge">
              <span aria-hidden="true">✓</span> REGISTRATION SECURED
            </div>
            <h2 className="disp confirm-heading">{ev.title}</h2>
            <p className="confirm-text">{ev.confirmation}</p>
            <div className="confirm-meta mono">
              <div>
                <span>FEE ASSESSED</span>
                <b>{calculatedFee}</b>
              </div>
              <div>
                <span>PAYMENT METHOD</span>
                <b>{paymentMethod}</b>
              </div>
              <div>
                <span>STATUS</span>
                <b style={{ color: "var(--cyan)" }}>PENDING VERIFICATION</b>
              </div>
            </div>
            <div className="confirm-actions">
              <Link href="/events/technical" className="rgb action-btn">
                <span>
                  <i className="pd" aria-hidden="true" />
                  Return to Technical Events
                </span>
                <b aria-hidden="true">↗</b>
                <s className="sn" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <form className="er-form" onSubmit={handleSubmit}>
            {/* College & Institution Details */}
            <fieldset className="er-section">
              <legend className="mono">01 / Institution Credentials</legend>
              <div className="er-grid">
                <label className="er-field col-full">
                  <span>College / Institution Name *</span>
                  <input
                    name="collegeName"
                    type="text"
                    required
                    placeholder="Enter full college name"
                  />
                </label>

                <div className="code-selector col-full">
                  <span className="mono code-label">Verification Code Type *</span>
                  <div className="code-options">
                    <label className={`code-opt ${codeType === "PRNC" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="codeTypeRadio"
                        value="PRNC"
                        checked={codeType === "PRNC"}
                        onChange={() => setCodeType("PRNC")}
                      />
                      <span className="opt-title mono">PRNC Code</span>
                      <small>Permanent Registration Number / College Roll</small>
                    </label>
                    <label className={`code-opt ${codeType === "CC" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="codeTypeRadio"
                        value="CC"
                        checked={codeType === "CC"}
                        onChange={() => setCodeType("CC")}
                      />
                      <span className="opt-title mono">Contingent Code (CC)</span>
                      <small>College Contingent / Group Code</small>
                    </label>
                  </div>
                </div>

                <label className="er-field col-full">
                  <span>
                    {codeType === "PRNC"
                      ? "Enter PRNC / Roll Number *"
                      : "Enter Contingent Code (CC) *"}
                  </span>
                  <input
                    name="codeValue"
                    type="text"
                    required
                    placeholder={
                      codeType === "PRNC"
                        ? "e.g. 2024-BScIT-084"
                        : "e.g. CC-DCC-2026"
                    }
                  />
                </label>
              </div>
            </fieldset>

            {/* Team Details (If Team Event) */}
            {isTeamEntry && (
              <fieldset className="er-section">
                <legend className="mono">02 / Team Credentials</legend>
                <div className="er-grid">
                  <label className="er-field col-full">
                    <span>Team Name *</span>
                    <input
                      name="teamName"
                      type="text"
                      required
                      placeholder="e.g. Cipher Syndicate"
                    />
                  </label>
                </div>
              </fieldset>
            )}

            {/* Participant Rosters */}
            <fieldset className="er-section">
              <legend className="mono">
                {isTeamEntry
                  ? `03 / Participant Roster (${totalParticipants} Members)`
                  : "02 / Participant Details"}
              </legend>

              <div className="participants-stack">
                {Array.from({ length: totalParticipants }, (_, idx) => {
                  const num = idx + 1;
                  const isLeader = isTeamEntry && num === 1;
                  const roleLabel = isLeader
                    ? "Team Leader"
                    : isTeamEntry
                    ? `Team Member ${num}`
                    : "Primary Participant";

                  return (
                    <div key={num} className="participant-card">
                      <div className="p-header mono">
                        <span>P{String(num).padStart(2, "0")}</span>
                        <b>{roleLabel}</b>
                      </div>

                      <div className="er-grid">
                        <label className="er-field">
                          <span>Full Name *</span>
                          <input
                            name={`p${num}_name`}
                            type="text"
                            required
                            placeholder="John Doe"
                          />
                        </label>

                        <label className="er-field">
                          <span>Phone Number *</span>
                          <input
                            name={`p${num}_phone`}
                            type="tel"
                            required
                            placeholder="10-digit mobile"
                            pattern="[0-9]{10}"
                          />
                        </label>

                        <label className="er-field">
                          <span>Email Address *</span>
                          <input
                            name={`p${num}_email`}
                            type="email"
                            required
                            placeholder="user@domain.com"
                          />
                        </label>

                        <label className="er-field">
                          <span>Class / Year *</span>
                          <input
                            name={`p${num}_year`}
                            type="text"
                            required
                            placeholder="e.g. FYBSc IT / SYBCA"
                          />
                        </label>

                        {/* College ID Upload */}
                        <div className="er-field col-full">
                          <span>College ID Photo Proof *</span>
                          <label className="event-upload">
                            <span className="event-upload-icon" aria-hidden="true">
                              ↑
                            </span>
                            <span className="event-upload-copy">
                              <b>Upload College ID Card</b>
                              <small>JPG, PNG, WEBP or PDF · Max 5 MB</small>
                            </span>
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,.webp,.pdf"
                              disabled={uploadingField === `p${num}_id`}
                              onChange={(e) =>
                                handleFileUpload(`p${num}_id`, e.target.files?.[0])
                              }
                            />
                          </label>
                          {uploadedFiles[`p${num}_id`] && (
                            <span className="event-upload-status mono">
                              <b aria-hidden="true">✓</b> ID Proof Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Payment & Settlement */}
            <fieldset className="er-section">
              <legend className="mono">04 / Registration Fee &amp; Payment</legend>
              <div className="fee-summary-box">
                <div className="fee-row">
                  <span className="mono">Total Payable Amount</span>
                  <b className="fee-amount">{calculatedFee}</b>
                </div>
                <p className="fee-note">
                  * All registrations are verified against transaction records.
                </p>
              </div>

              <div className="er-grid" style={{ marginTop: "24px" }}>
                <div className="code-selector col-full">
                  <span className="mono code-label">Payment Mode *</span>
                  <div className="code-options">
                    <label className={`code-opt ${paymentMethod === "UPI" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="payMethodRadio"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={() => setPaymentMethod("UPI")}
                      />
                      <span className="opt-title mono">UPI / QR Code</span>
                      <small>GPay, PhonePe, Paytm</small>
                    </label>
                    <label
                      className={`code-opt ${
                        paymentMethod === "Bank Transfer" ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payMethodRadio"
                        value="Bank Transfer"
                        checked={paymentMethod === "Bank Transfer"}
                        onChange={() => setPaymentMethod("Bank Transfer")}
                      />
                      <span className="opt-title mono">Bank Transfer</span>
                      <small>IMPS / NEFT Transfer</small>
                    </label>
                    <label className={`code-opt ${paymentMethod === "Cash" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="payMethodRadio"
                        value="Cash"
                        checked={paymentMethod === "Cash"}
                        onChange={() => setPaymentMethod("Cash")}
                      />
                      <span className="opt-title mono">Cash Desk</span>
                      <small>On-spot desk verification</small>
                    </label>
                  </div>
                </div>

                {paymentMethod !== "Cash" && (
                  <>
                    <label className="er-field">
                      <span>UPI Reference / UTR Number *</span>
                      <input
                        name="upiTxnId"
                        type="text"
                        required
                        placeholder="12-digit transaction ID"
                      />
                    </label>

                    <div className="er-field">
                      <span>Payment Screenshot Proof *</span>
                      <label className="event-upload">
                        <span className="event-upload-icon" aria-hidden="true">
                          ↑
                        </span>
                        <span className="event-upload-copy">
                          <b>Attach Payment Screenshot</b>
                          <small>JPG, PNG or WEBP</small>
                        </span>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.webp"
                          disabled={uploadingField === "payment_ss"}
                          onChange={(e) =>
                            handleFileUpload("payment_ss", e.target.files?.[0])
                          }
                        />
                      </label>
                      {uploadedFiles["payment_ss"] && (
                        <span className="event-upload-status mono">
                          <b aria-hidden="true">✓</b> Payment Screenshot Attached
                        </span>
                      )}
                    </div>
                  </>
                )}

                <label className="er-field col-full">
                  <span>Additional Notes / Reference (Optional)</span>
                  <input
                    name="additionalPaymentInfo"
                    type="text"
                    placeholder="Any comments, payer name or transaction notes"
                  />
                </label>
              </div>
            </fieldset>

            {/* Rules & Compliance Declaration */}
            <fieldset className="er-section">
              <legend className="mono">05 / Rules &amp; Declaration</legend>
              <div className="rules-summary">
                <h4 className="mono">Event Guidelines</h4>
                <ol className="rls">
                  {ev.rules.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ol>
              </div>

              <label className="declaration-label">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                />
                <span>
                  I declare that all participant details, PRNC / Contingent credentials
                  and payment records provided are authentic. I agree to abide by the
                  official CYBERSTRIKE &apos;26 technical regulations.
                </span>
              </label>
            </fieldset>

            {error && <div className="er-error mono">{error}</div>}

            <div className="form-submit-row">
              <button
                type="submit"
                className="rgb er-submit"
                disabled={submitting || Boolean(uploadingField)}
              >
                <span>
                  <i className="pd" aria-hidden="true" />
                  {submitting
                    ? "TRANSMITTING REGISTRATION..."
                    : `SUBMIT REGISTRATION · ${calculatedFee}`}
                </span>
                <b aria-hidden="true">↗</b>
                <s className="sn" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
