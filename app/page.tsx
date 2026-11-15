import { MetaPixelProvider } from "./components/MetaPixelProvider";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { LogoMarquee } from "./components/sections/LogoMarquee";
import { Features } from "./components/sections/Features";
import { ThreeSteps } from "./components/sections/ThreeSteps";
import { Niches } from "./components/sections/Niches";
import { Dashboard } from "./components/sections/Dashboard";
import { Integrations } from "./components/sections/Integrations";
import { Comparison } from "./components/sections/Comparison";
import { Ready } from "./components/sections/Ready";
import { VideoDemo } from "./components/sections/VideoDemo";
import { Diagnostic } from "./components/sections/Diagnostic";
import { Closing } from "./components/sections/Closing";
import { Testimonials } from "./components/sections/Testimonials";
import { Faq } from "./components/sections/Faq";
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

        {/* Bloco escuro contínuo — mesmo ritmo de contraste do modelo */}
        <div style={{ background: "var(--bg-dark-2)" }}>
          <Features />
          <ThreeSteps />
          <Niches />
          <Dashboard />
          <Integrations />
          <Comparison />
          <Ready />
          <VideoDemo />
          <Diagnostic />
          <Closing />
        </div>

        {/* Claro */}
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MetaPixelProvider>
  );
}
