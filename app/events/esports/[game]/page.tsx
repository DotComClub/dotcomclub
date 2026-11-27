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
import "../esports.css";
import "./registration.css";
import CyberstrikeBackground from "@/components/cyberstrike/CyberstrikeBackground";
import { PaymentQrCard } from "@/components/cyberstrike/PaymentQrCard";

const games: Record<string, { title: string; label: string; roster: "bgmi" | "valorant" | "solo" }> = {
  bgmi: { title: "BGMI", label: "Feed 01", roster: "bgmi" },
  valorant: { title: "VALORANT", label: "Feed 02", roster: "valorant" },
  "clash-royale": { title: "CLASH ROYALE", label: "Feed 03", roster: "solo" },
  "fifa-25": { title: "FIFA 25", label: "Feed 04", roster: "solo" },
  "real-cricket": { title: "REAL CRICKET", label: "Esports registration", roster: "solo" },
};

function Field({ label, name, type = "text", placeholder, required = true, fullWidth = false }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean; fullWidth?: boolean }) {
  return (
    <label className={`er-field${fullWidth ? " full" : ""}`}>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={type === "email" ? "email" : "off"}
        inputMode={type === "tel" ? "tel" : undefined}
      />
    </label>
  );
}

function PlayerRoster({
  requiredCount,
  subLabel = "Substitute player",
  uploadedFiles,
  uploadingField,
  onFileUpload,
}: {
  requiredCount: number;
  subLabel?: string;
  uploadedFiles: Record<string, string>;
  uploadingField: string | null;
  onFileUpload: (fieldKey: string, file: File | undefined) => void;
}) {
  const totalCount = requiredCount + 1;

  return (
    <div className="er-team">
      <div className="er-team-name">
        <Field label="Team Name" name="teamName" />
      </div>
      {Array.from({ length: totalCount }, (_, index) => (
        <fieldset key={index}>
          <legend>
            {index < requiredCount ? `Player ${index + 1}` : subLabel}
          </legend>
          <div className="er-fields">
            <Field label="Name" name={`player${index + 1}Name`} required={index < requiredCount} />
            <Field label="Mail" name={`player${index + 1}Email`} type="email" required={index < requiredCount} />
            <Field label="IGN (with tag)" name={`player${index + 1}Ign`} required={index < requiredCount} />
            <Field label="Number" name={`player${index + 1}Number`} type="tel" required={index < requiredCount} placeholder="10-digit number" />
            <Field label="College Name" name={`player${index + 1}CollegeName`} required={index < requiredCount} fullWidth />
            <div className="er-field">
              <span>College ID Photo *</span>
              <label className="event-upload">
                <span className="event-upload-icon" aria-hidden="true">↑</span>
                <span className="event-upload-copy">
                  <b>Choose college ID</b>
                  <small>JPG, PNG, WEBP or PDF · Max 4 MB</small>
                </span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  required={index < requiredCount}
                  disabled={uploadingField === `player${index + 1}CollegeId`}
                  onChange={(event) =>
                    onFileUpload(
                      `player${index + 1}CollegeId`,
                      event.target.files?.[0]
                    )
                  }
                />
              </label>
              {uploadedFiles[`player${index + 1}CollegeId`] && (
                <span className="event-upload-status">
                  <b aria-hidden="true">✓</b> College ID uploaded
                </span>
              )}
            </div>
            <div className="er-field">
              <span>Government ID Photo *</span>
              <label className="event-upload">
                <span className="event-upload-icon" aria-hidden="true">↑</span>
                <span className="event-upload-copy">
                  <b>Choose government ID</b>
                  <small>JPG, PNG, WEBP or PDF · Max 4 MB</small>
                </span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.pdf"
                  required={index < requiredCount}
                  disabled={uploadingField === `player${index + 1}GovtId`}
                  onChange={(event) =>
                    onFileUpload(
                      `player${index + 1}GovtId`,
                      event.target.files?.[0]
                    )
                  }
                />
              </label>
              {uploadedFiles[`player${index + 1}GovtId`] && (
                <span className="event-upload-status">
                  <b aria-hidden="true">✓</b> Government ID uploaded
                </span>
              )}
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default function GameRegistrationPage({ params }: { params: Promise<{ game: string }> }) {
  const { game: gameSlug } = use(params);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [codeType, setCodeType] = useState<"PRNC" | "CC">("PRNC");
  const [paymentMethod, setPaymentMethod] = useState<string>("UPI");
  const [declaration, setDeclaration] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const createRegistration = useMutation(api.esportsRegistrations.createRegistration);

  const game = games[gameSlug];

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

  if (!game) {
    return null;
  }

  const handleFileUpload = async (fieldKey: string, file: File | undefined) => {
    if (!file) return;
    setUploadingField(fieldKey);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !result.url) {
        throw new Error(result.error || "College ID upload failed.");
      }
      setUploadedFiles((current) => ({ ...current, [fieldKey]: result.url! }));
    } catch (uploadError) {
      console.error("College ID upload failed:", uploadError);
      setUploadedFiles((current) => {
        const next = { ...current };
        delete next[fieldKey];
        return next;
      });
      setError("College ID photo could not be uploaded. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    try {
      const codeValue = value("codeValue");
      if (!codeValue) {
        throw new Error(`Enter your ${codeType} code.`);
      }

      const paymentScreenshotUrl = uploadedFiles.paymentScreenshot;
      if (!paymentScreenshotUrl) {
        throw new Error("Please upload your payment screenshot before submitting.");
      }

      if (!declaration) {
        throw new Error("Please confirm the declaration checkbox before submitting.");
      }

      const paymentPayload = {
        paymentMethod,
        ...(value("upiTransactionId")
          ? { upiTransactionId: value("upiTransactionId") }
          : {}),
        paymentScreenshotUrl,
        ...(value("additionalPaymentInfo")
          ? { additionalPaymentInfo: value("additionalPaymentInfo") }
          : {}),
        declarationAccepted: true,
      };

      if (game.roster === "bgmi" || game.roster === "valorant") {
        const requiredCount = game.roster === "bgmi" ? 4 : 5;
        const players = [];
        for (let index = 0; index < requiredCount + 1; index++) {
          const playerNumber = index + 1;
          const name = value(`player${playerNumber}Name`);
          if (index >= requiredCount && !name) continue;

          const collegeIdUrl = uploadedFiles[`player${playerNumber}CollegeId`];
          if (!collegeIdUrl) {
            throw new Error(`Upload a college ID photo for player ${playerNumber}.`);
          }
          const govtIdUrl = uploadedFiles[`player${playerNumber}GovtId`];
          if (!govtIdUrl) {
            throw new Error(`Upload a government ID photo for player ${playerNumber}.`);
          }

          players.push({
            name,
            email: value(`player${playerNumber}Email`),
            ign: value(`player${playerNumber}Ign`),
            collegeIdUrl,
            govtIdUrl,
            number: value(`player${playerNumber}Number`),
            collegeName: value(`player${playerNumber}CollegeName`),
          });
        }
        await createRegistration({
          game: game.title,
          codeType,
          codeValue,
          teamName: value("teamName"),
          players,
          ...paymentPayload,
        });
      } else if (gameSlug === "clash-royale") {
        const collegeIdUrl = uploadedFiles.collegeIdPhoto;
        if (!collegeIdUrl) throw new Error("Upload your college ID photo.");
        const govtIdUrl = uploadedFiles.govtIdPhoto;
        if (!govtIdUrl) throw new Error("Upload your government ID photo.");
        await createRegistration({
          game: game.title,
          codeType,
          codeValue,
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          ign: value("ign"),
          playerTag: value("playerTag"),
          collegeName: value("collegeName"),
          collegeIdUrl,
          govtIdUrl,
          ...paymentPayload,
        });
      } else {
        const collegeIdUrl = uploadedFiles.collegeIdPhoto;
        if (!collegeIdUrl) throw new Error("Upload your college ID photo.");
        const govtIdUrl = uploadedFiles.govtIdPhoto;
        if (!govtIdUrl) throw new Error("Upload your government ID photo.");
        await createRegistration({
          game: game.title,
          codeType,
          codeValue,
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          collegeName: value("collegeName"),
          collegeIdUrl,
          govtIdUrl,
          ...(gameSlug === "real-cricket" ? { ign: value("ign") } : {}),
          ...paymentPayload,
        });
      }
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Esports registration failed:", submissionError);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Registration could not be submitted. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`cs26-root esports-registration live ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}>
      <CyberstrikeBackground />
      <main className="er-main">
        <header className="er-header">
          <div className="eh-top mono">
            <Link href="/events/esports" className="navback"><span aria-hidden="true">←</span>Esports</Link>
            <span>{game.label}</span>
          </div>
          <h1
            className={`ph disp er-title${gameSlug === "real-cricket" ? " real-cricket-title" : ""}`}
            aria-label={game.title}
          >
            {game.title}
          </h1>
          <p className="pin">Registration feed. Complete every required field before submission.</p>
        </header>

        {submitted ? (
          <section className="er-success" role="status">
            <span aria-hidden="true">✓</span>
            <h2 className="disp er-success-title" aria-label="Registration received">Registration received</h2>
            <p>Your {game.title} entry has been submitted successfully.</p>
            <Link className="rgb" href="/events/esports"><span>Back to esports</span><b aria-hidden="true">↗</b></Link>
          </section>
        ) : (
          <form className="er-form" onSubmit={submit}>
            <div className="er-field prnc-cc-toggle-group er-code-block">
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
                  aria-pressed={codeType === "PRNC"}
                >
                  PRNC Code
                </button>
                <button
                  type="button"
                  className={`prnc-cc-btn ${
                    codeType === "CC" ? "active" : ""
                  }`}
                  onClick={() => setCodeType("CC")}
                  aria-pressed={codeType === "CC"}
                >
                  CC Code
                </button>
              </div>
              <input
                name="codeValue"
                type="text"
                required
                autoComplete="off"
                placeholder={
                  codeType === "PRNC"
                    ? "Enter PRNC Code (e.g. PRNC-1042)"
                    : "Enter Contingent Code (e.g. CC-JHC)"
                }
              />
            </div>

            {game.roster === "bgmi" && (
              <>
                <p className="er-roster-note">BGMI roster: 4 players + 1 substitute.</p>
                <PlayerRoster
                  requiredCount={4}
                  subLabel="Substitute player (1)"
                  uploadedFiles={uploadedFiles}
                  uploadingField={uploadingField}
                  onFileUpload={handleFileUpload}
                />
              </>
            )}

            {game.roster === "valorant" && (
              <>
                <p className="er-roster-note">VALORANT roster: 5 players + 1 substitute.</p>
                <PlayerRoster
                  requiredCount={5}
                  subLabel="Substitute player (1)"
                  uploadedFiles={uploadedFiles}
                  uploadingField={uploadingField}
                  onFileUpload={handleFileUpload}
                />
              </>
            )}

            {game.roster === "solo" && (
              <div className="er-fields">
                <Field label="Name" name="name" />
                <Field label="Mail" name="email" type="email" />
                <Field label="Number" name="phone" type="tel" placeholder="10-digit number" />
                <Field label="College Name" name="collegeName" />
                {(gameSlug === "clash-royale" || gameSlug === "real-cricket") && (
                  <Field label={gameSlug === "clash-royale" ? "In-game Name" : "IGN"} name="ign" />
                )}
                {gameSlug === "clash-royale" && (
                  <Field label="Player Tag" name="playerTag" placeholder="#P22YPL2CP" />
                )}
                <div className="er-field">
                  <span>College ID Photo *</span>
                  <label className="event-upload">
                    <span className="event-upload-icon" aria-hidden="true">↑</span>
                    <span className="event-upload-copy">
                      <b>Choose college ID</b>
                      <small>JPG, PNG, WEBP or PDF · Max 4 MB</small>
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      required
                      disabled={uploadingField === "collegeIdPhoto"}
                      onChange={(event) =>
                        handleFileUpload(
                          "collegeIdPhoto",
                          event.target.files?.[0]
                        )
                      }
                    />
                  </label>
                  {uploadedFiles.collegeIdPhoto && (
                    <span className="event-upload-status">
                      <b aria-hidden="true">✓</b> College ID uploaded
                    </span>
                  )}
                </div>
                <div className="er-field">
                  <span>Government ID Photo *</span>
                  <label className="event-upload">
                    <span className="event-upload-icon" aria-hidden="true">↑</span>
                    <span className="event-upload-copy">
                      <b>Choose government ID</b>
                      <small>JPG, PNG, WEBP or PDF · Max 4 MB</small>
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      required
                      disabled={uploadingField === "govtIdPhoto"}
                      onChange={(event) =>
                        handleFileUpload(
                          "govtIdPhoto",
                          event.target.files?.[0]
                        )
                      }
                    />
                  </label>
                  {uploadedFiles.govtIdPhoto && (
                    <span className="event-upload-status">
                      <b aria-hidden="true">✓</b> Government ID uploaded
                    </span>
                  )}
                </div>
              </div>
            )}

            <fieldset className="er-payment-box">
              <legend>Payment &amp; Verification</legend>

              <PaymentQrCard />

              <div className="er-fields">
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
                    autoComplete="off"
                    placeholder="12-digit UPI reference or txn ID"
                  />
                </label>

                <div className="er-field full">
                  <span>Payment Screenshot (PDF / JPG / PNG) *</span>
                  <label className="event-upload">
                    <span className="event-upload-icon" aria-hidden="true">↑</span>
                    <span className="event-upload-copy">
                      <b>Choose payment screenshot</b>
                      <small>JPG, PNG, WEBP or PDF · Max 4 MB</small>
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf"
                      required={!uploadedFiles.paymentScreenshot}
                      disabled={uploadingField === "paymentScreenshot"}
                      onChange={(event) =>
                        handleFileUpload(
                          "paymentScreenshot",
                          event.target.files?.[0]
                        )
                      }
                    />
                  </label>
                  {uploadedFiles.paymentScreenshot && (
                    <span className="event-upload-status">
                      <b aria-hidden="true">✓</b> Payment proof uploaded
                    </span>
                  )}
                </div>

                <label className="er-field full">
                  <span>Additional Payment Information (Optional)</span>
                  <textarea
                    name="additionalPaymentInfo"
                    placeholder="Any notes about payer name, transfer time, or registration remarks..."
                  />
                </label>
              </div>

              <label className="declaration-label">
                <input
                  type="checkbox"
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                  required
                />
                <span>
                  <b>Required Declaration:</b> I confirm all roster and payment
                  details provided are accurate, and I understand registration is
                  subject to capacity and payment verification.
                </span>
              </label>
            </fieldset>

            {error && <p className="er-error" role="alert">{error}</p>}
            <button className="rgb er-submit" type="submit" disabled={submitting || uploadingField !== null}>
              <span>{uploadingField ? "Uploading file..." : submitting ? "Submitting..." : "Submit registration"}</span>
              <b aria-hidden="true">↗</b>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
