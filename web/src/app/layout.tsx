import type { Metadata } from "next";
import "./globals.css";
import { ScenarioRuntime } from "@/components/ScenarioRuntime";
import { Overlays } from "@/components/Overlays";

export const metadata: Metadata = {
  title: "Hamilton · Agentic delivery ops",
  description: "An AI operations layer for small delivery fleets. Interactive prototype.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScenarioRuntime />
        {children}
        <Overlays />
      </body>
    </html>
  );
}
