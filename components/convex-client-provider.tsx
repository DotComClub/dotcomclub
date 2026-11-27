"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://dummy.convex.cloud";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.warn(
    "⚠️ NEXT_PUBLIC_CONVEX_URL is not configured. Convex features will run in mock/offline mode. Add NEXT_PUBLIC_CONVEX_URL to your .env.local or run `npx convex dev`."
  );
}

const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
