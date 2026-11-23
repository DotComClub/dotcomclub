import type { ReactNode } from "react";
import {
  Instrument_Serif,
  JetBrains_Mono,
  VT323,
  DM_Sans,
} from "next/font/google";
import { EventsReveal } from "@/components/cyberstrike/EventsReveal";
import { EventsNavbar } from "@/components/cyberstrike/EventsNavbar";
import "../cyberstrike-26/cyberstrike.css";
import "./events.css";

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

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export default function EventsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={`${instrumentSerif.variable} ${jetbrainsMono.variable} ${vt323.variable} ${dmSans.variable}`}
    >
      <EventsNavbar />
      <EventsReveal />
      {children}
    </div>
  );
}
