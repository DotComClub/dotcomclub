"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FormEvent, use, useState } from "react";
import {
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
  DM_Sans,
} from "next/font/google";
import "../../../cyberstrike-26/cyberstrike.css";
import "../esports.css";
import "./registration.css";

const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], variable: "--font-instrument-serif" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"], variable: "--font-vt323" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });

const games: Record<string, { title: string; label: string; roster: "bgmi" | "valorant" | "solo" }> = {
  bgmi: { title: "BGMI", label: "Feed 01", roster: "bgmi" },
  valorant: { title: "VALORANT", label: "Feed 02", roster: "valorant" },
  "clash-royale": { title: "CLASH ROYALE", label: "Feed 03", roster: "solo" },
  "fifa-25": { title: "FIFA 25", label: "Feed 04", roster: "solo" },
  "real-cricket": { title: "REAL CRICKET", label: "Esports registration", roster: "solo" },
};

function Field({ label, name, type = "text", placeholder, required = true }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="er-field">
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

function PlayerRoster({ requiredCount, subLabel = "Substitute player" }: { requiredCount: number; subLabel?: string }) {
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
            <Field label="College ID" name={`player${index + 1}CollegeId`} required={index < requiredCount} />
            <Field label="Number" name={`player${index + 1}Number`} type="tel" required={index < requiredCount} placeholder="10-digit number" />
            <Field label="College Name" name={`player${index + 1}CollegeName`} required={index < requiredCount} />
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
  const createRegistration = useMutation(api.esportsRegistrations.createRegistration);

  const game = games[gameSlug];

  if (!game) {
    return null;
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    try {
      if (game.roster === "bgmi" || game.roster === "valorant") {
        const requiredCount = game.roster === "bgmi" ? 4 : 5;
        const players = Array.from({ length: requiredCount + 1 }, (_, index) => ({
          name: value(`player${index + 1}Name`),
          email: value(`player${index + 1}Email`),
          ign: value(`player${index + 1}Ign`),
          collegeId: value(`player${index + 1}CollegeId`),
          number: value(`player${index + 1}Number`),
          collegeName: value(`player${index + 1}CollegeName`),
        })).filter((player, index) => index < requiredCount || Boolean(player.name));
        await createRegistration({ game: game.title, teamName: value("teamName"), players });
      } else if (gameSlug === "clash-royale") {
        await createRegistration({
          game: game.title,
          phone: value("phone"),
          name: value("name"),
          ign: value("ign"),
          playerTag: value("playerTag"),
        });
      } else {
        await createRegistration({
          game: game.title,
          name: value("name"),
          email: value("email"),
          phone: value("phone"),
          collegeName: value("collegeName"),
          ...(gameSlug === "real-cricket" ? { ign: value("ign") } : {}),
        });
      }
      setSubmitted(true);
    } catch (submissionError) {
      console.error("Esports registration failed:", submissionError);
      setError("Registration could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`cs26-root esports-registration ${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}>
      <main className="er-main">
        <header className="er-header">
          <div className="eh-top mono">
            <Link href="/events/esports" className="navback"><span aria-hidden="true">←</span>Esports</Link>
            <span>{game.label}</span>
          </div>
          <h1
            className={`ph${gameSlug === "real-cricket" ? " real-cricket-title" : ""}`}
            data-t={game.title}
            data-events-sl
          >
            {game.title}
          </h1>
          <p className="pin">Registration feed. Complete every required field before submission.</p>
        </header>

        {submitted ? (
          <section className="er-success" role="status">
            <span aria-hidden="true">✓</span>
            <h2 data-events-sl>Registration received</h2>
            <p>Your {game.title} entry has been submitted successfully.</p>
            <Link className="rgb" href="/events/esports"><span>Back to esports</span><b aria-hidden="true">↗</b></Link>
          </section>
        ) : (
          <form className="er-form" onSubmit={submit}>
            {game.roster === "bgmi" && (
              <>
                <p className="er-roster-note">BGMI roster: 4 players + 1 substitute.</p>
                <PlayerRoster requiredCount={4} subLabel="Substitute player (1)" />
              </>
            )}

            {game.roster === "valorant" && (
              <>
                <p className="er-roster-note">VALORANT roster: 5 players + 1 substitute.</p>
                <PlayerRoster requiredCount={5} subLabel="Substitute player (1)" />
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
              </div>
            )}

            {error && <p className="er-error" role="alert">{error}</p>}
            <button className="rgb er-submit" type="submit" disabled={submitting}>
              <span>{submitting ? "Submitting..." : "Submit registration"}</span>
              <b aria-hidden="true">↗</b>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
