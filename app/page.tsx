// File: app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import HUD from "@/components/HUD";
import TimelineRail from "@/components/TimelineRail";
import IntroChips from "@/components/IntroChips";
import ContactOutro from "@/components/ContactOutro";

// Dynamically import the 3D scene to keep the main bundle small
const Scene = dynamic(() => import("@/components/canvas/Scene").then(mod => mod.Scene), {
  ssr: false,
});

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <a className="skip-link" href="#page-content">
        Skip to main content
      </a>
      
      {/* The 3D scene is now the background */}
      <Scene />

      {/* The rest of the UI is layered on top */}
      <div id="page-content" className="relative z-10">
        <HUD />
        <IntroChips />
        <TimelineRail />
        {/* FacetStageOverlay is removed as it's part of the old system */}
        {/* <LegacyPanels /> */}
        <section id="contact-outro">
          <ContactOutro />
        </section>
      </div>
    </main>
  );
}