"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FormEvent, use, useEffect, useState } from "react";
import {
  dmSansFull as dmSans,
  instrumentSerif,
  jetbrainsMono,
  vt323,
} from "@/fonts/font";
import "../../../cyberstrike-26/cyberstrike.css";
import "../../events.css";
import "../../esports/esports.css";
import "../../cultural/cultural.css";
import CyberstrikeBackground from "@/components/cyberstrike/CyberstrikeBackground";
import { CyberstrikeFooter } from "@/components/cyberstrike/CyberstrikeFooter";
import { TECHNICAL_EVENTS_BY_ID } from "@/lib/technical-events";

export default function TechEventRegistrationPage({
  params,
}: {
  params: Promise<{ event: string }>;
}) {
  const { event: slug } = use(params);
  const ev =
    TECHNICAL_EVENTS_BY_ID[slug] || TECHNICAL_EVENTS_BY_ID["cyber-hunt"];

  // Form State
  const [collegeName, setCollegeName] = useState("");
  const [codeType, setCodeType] = useState<"PRNC" | "CC">("PRNC");
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI");
  const [declaration, setDeclaration] = useState(false);

  // Per-participant college names (auto-populated from Section 1 unless edited)
  const [participantColleges, setParticipantColleges] = useState<
    Record<number, string>
  >({});
  const [editedColleges, setEditedColleges] = useState<Record<number, boolean>>(
    {}
  );

  // File Upload States
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {}
  );

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const createRegistration = useMutation(
    api.technicalRegistrations.createTechnicalRegistration
  );

  // Reset transient state when switching between sub-events
  useEffect(() => {
    setSubmitted(false);
    setError("");
    setDeclaration(false);
    setUploadedFiles({});
  }, [ev.id]);

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
      document.removeEventListener(
        "pointerover",
        onPointerOver as EventListener
      );
    };
  }, []);

  const totalParticipants = ev.isSolo ? 1 : ev.teamSize;
  const isTeamEntry = !ev.isSolo;

  // Keep unedited participant college fields synced with Section 1 College Name
  const handleInstitutionChange = (val: string) => {
    setCollegeName(val);
    setParticipantColleges((prev) => {
      const next = { ...prev };
      for (let i = 1; i <= totalParticipants; i++) {
        if (!editedColleges[i]) {
          next[i] = val;
        }
      }
      return next;
    });
  };

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
      setError(
        err instanceof Error
          ? err.message
          : "File upload failed. Please use a PDF, JPG, or PNG under 4 MB."
      );
    } finally {
      setUploadingField(null);
    }
  };

  // Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    for (let i = 1; i <= totalParticipants; i++) {
      if (!uploadedFiles[`p${i}_id`]) {
        setError(
          `Please upload College ID Proof (PDF/JPG/PNG) for Participant ${i}.`
        );
        return;
      }
    }

    if (!uploadedFiles["paymentScreenshot"]) {
      setError(
        "Please upload your Payment Screenshot / Proof (PDF/JPG/PNG) before submitting."
      );
      return;
    }

    if (!declaration) {
      setError(
        "Please confirm the final declaration checkbox before submitting."
      );
      return;
    }

    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const getVal = (name: string) => String(formData.get(name) ?? "").trim();

    try {
      const institution = getVal("collegeName");
      const codeValue = getVal("codeValue");
      const teamName = isTeamEntry ? getVal("teamName") : undefined;

      const participantsList = [];
      for (let i = 1; i <= totalParticipants; i++) {
        const role = ev.isSolo
          ? "INDIVIDUAL"
          : i === 1
          ? "TEAM LEADER"
          : "TEAM MEMBER";

        const pName = getVal(`p${i}_name`);
        const pPhone = getVal(`p${i}_phone`);
        const pEmail = getVal(`p${i}_email`);
        const pYear = getVal(`p${i}_year`);
        const pCollege = getVal(`p${i}_college`) || institution;
        const pCollegeIdUrl = uploadedFiles[`p${i}_id`];

        participantsList.push({
          role,
          name: pName,
          phone: pPhone,
          email: pEmail,
          classYear: `${pYear} · ${pCollege}`,
          ...(pCollegeIdUrl ? { collegeIdUrl: pCollegeIdUrl } : {}),
        });
      }

      const p1 = participantsList[0];

      await createRegistration({
        event: ev.title,
        collegeName: institution,
        codeType,
        codeValue,
        ...(teamName ? { teamName } : {}),
        entryFormat: ev.teamFormat,
        teamSize: String(totalParticipants),
        name: p1.name,
        email: p1.email,
        phone: p1.phone,
        classYear: p1.classYear,
        ...(p1.collegeIdUrl ? { collegeIdUrl: p1.collegeIdUrl } : {}),
        participants: participantsList,
        registrationFee: ev.feeDesc,
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
      setError(
        err instanceof Error
          ? err.message
          : "Registration could not be submitted. Please check all required fields."
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
        {/* Sub-Event Navigation Bar */}
        <header className="er-header">
          <div className="eh-top mono">
            <Link href="/events/technical" className="navback">
              <span aria-hidden="true">←</span> Technical Events
            </Link>
            <span>
              Feed {ev.number} · {ev.day}
            </span>
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
              DAY: <b>{ev.day}</b>
            </span>
            <span>
              CAPACITY: <b>{ev.capacity}</b>
            </span>
          </div>

          <p className="pin">{ev.intro}</p>
        </header>

        {submitted ? (
          <section className="er-success" role="status">
            <span className="check-icon" aria-hidden="true">
              ✓
            </span>
            <h2 data-events-sl>Registration Received</h2>
            <div className="success-message">
              <p>{ev.confirmation}</p>
            </div>
            <Link className="rgb" href="/events/technical">
              <span>
                <i className="pd" aria-hidden="true" />
                Return to Technical Events
              </span>
              <b aria-hidden="true">↗</b>
              <s className="sn" aria-hidden="true" />
            </Link>
          </section>
        ) : (
          <form key={ev.id} onSubmit={handleSubmit} className="er-form">
            {/* ========================================================
                SECTION 1 – COLLEGE DETAILS
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">[ 01 — College Details ]</div>
              <h3 className="cr-sec-title">College Details</h3>
              <p className="cr-sec-desc">
                Please provide your institution details.
              </p>

              <div className="er-fields">
                <label className="er-field">
                  <span>College Name *</span>
                  <input
                    name="collegeName"
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => handleInstitutionChange(e.target.value)}
                    placeholder="e.g. Jai Hind College, Mumbai"
                  />
                </label>

                <div className="er-field prnc-cc-toggle-group">
                  <span className="prnc-cc-toggle-label">
                    PRNC / CC Code *
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
                        ? "Enter PRNC Code"
                        : "Enter CC (Contingent) Code"
                    }
                  />
                </div>
              </div>
            </div>

            {/* ========================================================
                SECTION 2 – PARTICIPANT DETAILS
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">
                [ 02 — Participant Details ]
              </div>
              <h3 className="cr-sec-title">
                {isTeamEntry ? "Team & Participants" : "Participant Details"}
              </h3>
              <p className="cr-sec-desc">
                Entry format: {ev.teamFormat}.{" "}
                {isTeamEntry
                  ? "Participant 1 is the Team Leader. All member fields and College ID proofs are mandatory."
                  : "Individual entry — collect Participant 1 details only."}
              </p>

              {isTeamEntry && (
                <div className="er-fields" style={{ marginBottom: "28px" }}>
                  <label className="er-field full">
                    <span>Team Name *</span>
                    <input
                      name="teamName"
                      type="text"
                      required
                      placeholder="Enter your team name"
                    />
                  </label>
                </div>
              )}

              {Array.from({ length: totalParticipants }, (_, idx) => {
                const pNum = idx + 1;
                const isLeader = isTeamEntry && pNum === 1;

                return (
                  <div key={pNum} className="participant-card">
                    <div className="participant-card-header">
                      <span
                        className={`participant-card-title ${
                          isLeader ? "leader" : ""
                        }`}
                      >
                        {ev.isSolo
                          ? "Participant 1 — Individual"
                          : isLeader
                          ? "Participant 1 — TEAM LEADER"
                          : `Participant ${pNum} — TEAM MEMBER`}
                      </span>
                      <span
                        className={`participant-badge ${
                          isLeader ? "leader" : ""
                        }`}
                      >
                        {isLeader ? "TEAM LEADER · REQUIRED" : "ALL REQUIRED"}
                      </span>
                    </div>

                    <div className="er-fields">
                      <label className="er-field">
                        <span>Full Name *</span>
                        <input
                          name={`p${pNum}_name`}
                          type="text"
                          required
                          placeholder="Full name as on ID"
                        />
                      </label>

                      <label className="er-field">
                        <span>Contact Number *</span>
                        <input
                          name={`p${pNum}_phone`}
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                        />
                      </label>

                      <label className="er-field">
                        <span>Email Address *</span>
                        <input
                          name={`p${pNum}_email`}
                          type="email"
                          required
                          placeholder="name@example.com"
                        />
                      </label>

                      <label className="er-field">
                        <span>Class / Year *</span>
                        <input
                          name={`p${pNum}_year`}
                          type="text"
                          required
                          placeholder="e.g. FYBSc IT / SYBCom"
                        />
                      </label>

                      <label className="er-field full">
                        <span>College *</span>
                        <input
                          name={`p${pNum}_college`}
                          type="text"
                          required
                          value={participantColleges[pNum] ?? ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditedColleges((prev) => ({
                              ...prev,
                              [pNum]: true,
                            }));
                            setParticipantColleges((prev) => ({
                              ...prev,
                              [pNum]: val,
                            }));
                          }}
                          placeholder="Participant's college name"
                        />
                      </label>

                      <div className="er-field full">
                        <span>
                          College ID Proof Upload (PDF / JPG / PNG) *
                        </span>
                        <label className="event-upload">
                          <span className="event-upload-icon" aria-hidden="true">
                            ↑
                          </span>
                          <span className="event-upload-copy">
                            <b>Choose college ID</b>
                            <small>PDF, JPG or PNG · Max 4 MB</small>
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            disabled={uploadingField === `p${pNum}_id`}
                            onChange={(e) =>
                              handleFileUpload(
                                `p${pNum}_id`,
                                e.target.files?.[0]
                              )
                            }
                          />
                        </label>
                        {uploadingField === `p${pNum}_id` && (
                          <span className="event-upload-status">
                            Uploading College ID...
                          </span>
                        )}
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
                SECTION 3 – EVENT FLOW, PAYMENT & RULES
                ======================================================== */}
            <div className="cr-section">
              <div className="cr-sec-tag mono">
                [ 03 — Event Flow, Payment &amp; Rules ]
              </div>
              <h3 className="cr-sec-title">Flow, Payment &amp; Declaration</h3>
              <p className="cr-sec-desc">
                Review the official event flow and regulations, then complete
                your payment details below.
              </p>

              {/* A. Event Flow */}
              <div className="event-flow-box">
                <h4>A. Event Flow</h4>
                <ol>
                  {ev.eventFlow.map((step, fIdx) => (
                    <li key={fIdx}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* B. Payment Details */}
              <div className="fee-display-card">
                <div>
                  <div className="fee-display-label">Registration Fee</div>
                  <div style={{ fontSize: "12px", color: "var(--dim)" }}>
                    {ev.teamFormat} · {ev.venue} ({ev.day})
                  </div>
                </div>
                <div className="fee-display-amount">{ev.feeDesc}</div>
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
                    {paymentMethod !== "Cash" ? "*" : "(If applicable)"}
                  </span>
                  <input
                    name="upiTransactionId"
                    type="text"
                    required={paymentMethod !== "Cash"}
                    placeholder="Enter transaction or reference number"
                  />
                </label>

                <div className="er-field full">
                  <span>Payment Screenshot (PDF / JPG / PNG) *</span>
                  <label className="event-upload">
                    <span className="event-upload-icon" aria-hidden="true">
                      ↑
                    </span>
                    <span className="event-upload-copy">
                      <b>Choose payment screenshot</b>
                      <small>PDF, JPG or PNG · Max 4 MB</small>
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      disabled={uploadingField === "paymentScreenshot"}
                      onChange={(e) =>
                        handleFileUpload(
                          "paymentScreenshot",
                          e.target.files?.[0]
                        )
                      }
                    />
                  </label>
                  {uploadingField === "paymentScreenshot" && (
                    <span className="event-upload-status">
                      Uploading payment proof...
                    </span>
                  )}
                  {uploadedFiles["paymentScreenshot"] && (
                    <span className="event-upload-status">
                      <b aria-hidden="true">✓</b> Payment screenshot uploaded
                    </span>
                  )}
                </div>

                <label className="er-field full">
                  <span>Additional Payment Information (Optional)</span>
                  <textarea
                    name="additionalPaymentInfo"
                    placeholder="Any notes regarding payer name, transfer reference, or cash desk confirmation..."
                  />
                </label>
              </div>

              {/* C. Rules & Regulations */}
              <div className="rules-box">
                <h4>C. Rules &amp; Regulations</h4>
                <ul>
                  {ev.rules.map((rule, rIdx) => (
                    <li key={rIdx}>{rule}</li>
                  ))}
                </ul>
              </div>

              {/* E. Final Declaration */}
              <label className="declaration-label">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  required
                />
                <span>
                  <b>Final Declaration:</b> I confirm that the registration
                  format and participant details are accurate; all participants
                  agree to follow the event rules and organiser instructions;
                  and I understand that participation is subject to event
                  capacity and payment verification.
                </span>
              </label>

              {error && (
                <div className="er-error" role="alert">
                  {error}
                </div>
              )}

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

      <CyberstrikeFooter />
    </div>
  );
}
