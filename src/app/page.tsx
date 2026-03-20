import SmoothScroller from "@/components/SmoothScroller";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import HeroSequence from "@/components/HeroSequence";
import ManifestoVault from "@/components/ManifestoVault";
import MolecularScience from "@/components/MolecularScience";
import TimelineOverture from "@/components/TimelineOverture";
import TestimonialMonolith from "@/components/TestimonialMonolith";
import PurchaseTerminal from "@/components/PurchaseTerminal";
import FooterEditorial from "@/components/FooterEditorial";

export default function Home() {
  return (
    <SmoothScroller>
      <GlobalAtmosphere />
      <Cursor />
      <Header />
      <main className="relative z-10">
        <HeroSequence />
        <ManifestoVault />
        <MolecularScience />
        <TimelineOverture />
        <TestimonialMonolith />
        <PurchaseTerminal />
        <FooterEditorial />
      </main>
    </SmoothScroller>
  );
}
