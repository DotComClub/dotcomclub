import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Navbar } from "@/components/home/Navbar";
import { anton, dmSans } from "@/fonts/font";

export const metadata: Metadata = createMetadata({
  title: "E-waste Drive 2026 | JHC Dot Com Club",
  description: "Join JHC Dot Com Club's E-waste Drive 2026. Track the impact of our collective effort towards sustainability. View leaderboards and submit your e-waste contribution.",
  keywords: ["e-waste drive", "sustainability", "environmental initiative", "JHC Dot Com Club", "electronic waste", "recycling", "green initiative"],
  openGraph: {
    title: "E-waste Drive 2026 | JHC Dot Com Club",
    description: "Join our movement towards sustainability. Track the impact and view leaderboards for our E-waste Drive 2026.",
    url: "https://www.jhcdotcomclub.com/ewaste",
  },
});

export default function EwasteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`ewaste-root home-root ${anton.variable} ${dmSans.variable}`}>
      <Navbar />
      {children}
    </div>
  );
}
