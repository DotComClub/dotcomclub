import { createMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { EventsReveal } from "@/components/cyberstrike/EventsReveal";

export const metadata: Metadata = createMetadata({
  title: "Events — Cyberstrike 26",
  description:
    "Eighteen events on three channels. Pick a channel to see every event, its rules and how to register.",
  keywords: [
    "Cyberstrike 2026",
    "Events",
    "E-Sports",
    "Technical",
    "Cultural",
    "Dot Com Club",
    "Jai Hind College",
  ],
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EventsReveal />
      {children}
    </>
  );
}
