"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useSceneStore } from "@/stores/sceneStore";
import HUD from "@/components/HUD";
import TimelineRail from "@/components/TimelineRail";
import IntroChips from "@/components/IntroChips";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });
const FacetStageOverlay = dynamic(() => import("@/components/FacetStageOverlay"), { ssr: false });
const LegacyPanels = dynamic(() => import("@/components/LegacyPanels"), { ssr: false });
const ContactOutro = dynamic(() => import("@/components/ContactOutro"), { ssr: false });

export default function Page() {
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <a className="skip-link" href="#page-content">
        Skip to contact
      </a>
      <HeroScene />
      <HUD />
      <IntroChips />
      <TimelineRail />
      {useSceneStore((state) => state.activeOrb) ? <FacetStageOverlay /> : null}
      <LegacyPanels />
      <section id="contact-outro">
        <ContactOutro />
      </section>
    </main>
  );
}
