import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Cyberstrike 26 — Lost Signal | Dot Com Club",
  description:
    "Dot Com Club presents Cyberstrike 2026: Lost Signal. Theme: Root Probe. Hackathon at Jai Hind College, Mumbai.",
});

export default function Cyberstrike26Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

