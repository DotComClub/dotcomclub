import { EventsReveal } from "@/components/cyberstrike/EventsReveal";

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
