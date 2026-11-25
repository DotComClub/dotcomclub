"use client";

import Link from "next/link";
import Image from "next/image";
import { RevealHeading } from "./RevealHeading";
import { TEAM_PHOTOS } from "@/lib/team-photos";

const SQUAD_MEMBERS = [
  { name: "Rahul Jat", role: "President", photo: TEAM_PHOTOS["Rahul Jat"] },
  { name: "Diya Artani", role: "Vice President", photo: TEAM_PHOTOS["Diya Artani"] },
  {
    name: "Ganesh Tiwari",
    role: "Vice President & Contingent Leader",
    photo: TEAM_PHOTOS["Ganesh Tiwari"],
  },
  {
    name: "Adithya Suvarna",
    role: "Technical Operations Coordinator",
    photo: TEAM_PHOTOS["Adithya Suvarna"],
  },
  { name: "Sagar Shetty", role: "Events Coordinator", photo: "/images/team-core/sagar-shetty.jpg" },
  { name: "Samiksha Pawar", role: "PR Coordinator", photo: "/images/team-core/samiksha-pawar.jpg" },
  {
    name: "Mayuresh Deshpande",
    role: "Social Media Coordinator",
    photo: "/images/team-core/mayuresh-deshpande.jpg",
  },
  {
    name: "Insiya Amrelivala",
    role: "Marketing Coordinator",
    photo: "/images/team-core/insiya-amrelivala.jpg",
  },
  {
    name: "Shivam Chauhan",
    role: "Creatives Coordinator",
    photo: "/images/team-core/shivam-chauhan.jpg",
  },
  {
    name: "Hussain Tinwala & Bhalchandra Kumbhargaonkar",
    role: "Treasurers",
    photo: "/images/team-core/treasurers.jpg",
  },
];

export function SquadSection() {
  return (
    <section id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <RevealHeading>Meet our elite squad</RevealHeading>
        <p className="lead">The talented team behind DCC&apos;s innovation and success.</p>

        <div className="squad">
          {SQUAD_MEMBERS.map((member) => (
            <article
              key={member.name}
              className={`person squad-card${member.role === "Treasurers" ? " squad-card--treasurers" : ""}`}
            >
              <div className="squad-card__portrait">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  width={member.role === "Treasurers" ? 768 : 1080}
                  height={member.role === "Treasurers" ? 960 : 1350}
                  sizes="(max-width: 559px) 100vw, (max-width: 999px) 50vw, 25vw"
                  className="squad-card__image"
                />
              </div>
              <div className="squad-card__details">
                <b>{member.name}</b>
                <small>{member.role}</small>
              </div>
            </article>
          ))}
        </div>

        <p style={{ marginTop: 36 }}>
          <Link className="btn" href="/teams">
            Meet the full team
          </Link>
        </p>
      </div>
    </section>
  );
}
