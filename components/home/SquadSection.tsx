"use client";

import Link from "next/link";
import { RevealHeading } from "./RevealHeading";
import { getTeamPhoto } from "@/lib/team-photos";

const SQUAD_MEMBERS = [
  { name: "Rahul Jat", role: "President" },
  { name: "Diya Artani", role: "Vice President" },
  { name: "Adithya Suvarna", role: "Technical Operations Co-ordinator" },
  { name: "Ganesh Tiwari", role: "Vice President and Contingent Leader" },
];

export function SquadSection() {
  return (
    <section id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <RevealHeading>Meet our elite squad</RevealHeading>
        <p className="lead">The talented team behind DCC&apos;s innovation and success.</p>

        <div className="squad">
          {SQUAD_MEMBERS.map((member) => (
            <div key={member.name} className="person">
              <i
                aria-hidden="true"
                style={
                  getTeamPhoto(member.name)
                    ? { backgroundImage: `url("${getTeamPhoto(member.name)}")` }
                    : undefined
                }
              />
              <b>{member.name}</b>
              <small>{member.role}</small>
            </div>
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
