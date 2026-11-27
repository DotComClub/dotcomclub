import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "./Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

import { Anton, Dancing_Script } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const dmSans = localFont({
  src: [
    {
      path: "../public/fonts/dm-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm",
  display: "swap",
});

export const dmSansFull = localFont({
  src: [
    {
      path: "../public/fonts/dm-sans-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-500.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/dm-sans-700.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-400-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/jetbrains-mono-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-500.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const vt323 = localFont({
  src: [
    {
      path: "../public/fonts/vt323-400.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-vt323",
  display: "swap",
});

export const circular = localFont({
  src: [
    {
      path: "./circularweb-book.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-circular",
});

export const zentry = localFont({
  src: [
    {
      path: "./zentry-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-zentry",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
});


