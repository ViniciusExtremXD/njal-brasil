import React from 'react';
import { ParticleCanvas } from './components/ui/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { BrandManifesto } from './components/BrandManifesto';
import { CollectionShowcase } from './components/CollectionShowcase';
import { LookbookSection } from './components/LookbookSection';
import { TechFeatures } from './components/TechFeatures';
import { AthleteReviews } from './components/AthleteReviews';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { InstagramReelsSection } from './components/InstagramReelsSection';
import { CustomManufacturingSection } from './components/CustomManufacturingSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingCTA } from './components/WhatsAppFloatingCTA';

export function App() {
  return (
    <div className="relative min-h-screen bg-njal-bg text-njal-silver selection:bg-njal-red selection:text-white">
      {/* Ambient particle dynamic canvas */}
      <ParticleCanvas />

      {/* Tactical atmosphere: scanlines + film grain over the whole vitrine */}
      <div className="pointer-events-none fixed inset-0 z-[60] overlay-scanlines opacity-40 mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 z-[60] overlay-grain opacity-[0.06] mix-blend-soft-light" />

      {/* Main Sticky Navbar with Direct Instagram & WhatsApp Actions */}
      <Navbar />

      <main className="relative z-10">
        {/* Cinematic Hero with Authentic Identity & Multi-Athlete Showcase */}
        <Hero />

        {/* Dual Infinite Kinetic Marquee Tickers */}
        <MarqueeTicker />

        {/* Brand Manifesto: The Soul, History & Warrior Culture */}
        <BrandManifesto />

        {/* Curated Collection Showcase (Exemplar Drops with Instagram Redirection) */}
        <CollectionShowcase />

        {/* Real Action Athlete Lookbook */}
        <LookbookSection />

        {/* Textile Warfare Engineering & Big Features */}
        <TechFeatures />

        {/* Social Proof: Authentic Athlete & Coach Reviews */}
        <AthleteReviews />

        {/* The Brand Philosophy & Viking Saga */}
        <BrandPhilosophy />

        {/* Official Instagram Mural & Reels Section */}
        <InstagramReelsSection />

        {/* Custom B2B Manufacturing Section */}
        <CustomManufacturingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Concierge Button */}
      <WhatsAppFloatingCTA />
    </div>
  );
}

export default App;
