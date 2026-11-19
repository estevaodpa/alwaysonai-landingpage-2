import { MetaPixelProvider } from "./components/MetaPixelProvider";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { LogoMarquee } from "./components/sections/LogoMarquee";
import { CasesReais } from "./components/sections/CasesReais";
import { Features } from "./components/sections/Features";
import { Niches } from "./components/sections/Niches";
import { Dashboard } from "./components/sections/Dashboard";
import { Comparison } from "./components/sections/Comparison";
import { AgendaIntegrada } from "./components/sections/AgendaIntegrada";
import { Testimonials } from "./components/sections/Testimonials";
import { Ready } from "./components/sections/Ready";
import { Faq } from "./components/sections/Faq";
import { Closing } from "./components/sections/Closing";
import { Footer } from "./components/sections/Footer";
import { WhatsAppFloat } from "./components/sections/WhatsAppFloat";

export default function Home() {
  return (
    <MetaPixelProvider>
      <Header />
      <main className="flex-1">
        {/* Claro */}
        <Hero />
        <LogoMarquee />
        <CasesReais />

        {/* Escuro — até a agenda */}
        <div style={{ background: "var(--bg-dark-2)" }}>
          <Features />
          <Niches />
          <Dashboard />
          <Comparison />
          <AgendaIntegrada />
        </div>

        {/* Depoimentos logo abaixo da agenda */}
        <Testimonials />

        {/* Entregue pronto + FAQ */}
        <div style={{ background: "var(--bg-dark-2)" }}>
          <Ready />
        </div>
        <Faq />

        {/* CTA final — última seção */}
        <Closing />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MetaPixelProvider>
  );
}
