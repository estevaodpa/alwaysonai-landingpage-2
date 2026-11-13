import { MetaPixelProvider } from "./components/MetaPixelProvider";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { LogoMarquee } from "./components/sections/LogoMarquee";
import { Features } from "./components/sections/Features";
import { Metrics } from "./components/sections/Metrics";
import { ThreeSteps } from "./components/sections/ThreeSteps";
import { Niches } from "./components/sections/Niches";
import { Dashboard } from "./components/sections/Dashboard";
import { Personalization } from "./components/sections/Personalization";
import { Comparison } from "./components/sections/Comparison";
import { Ready } from "./components/sections/Ready";
import { VideoDemo } from "./components/sections/VideoDemo";
import { Diagnostic } from "./components/sections/Diagnostic";
import { Testimonials } from "./components/sections/Testimonials";
import { Faq } from "./components/sections/Faq";
import { Closing } from "./components/sections/Closing";
import { Footer } from "./components/sections/Footer";
import { WhatsAppFloat } from "./components/sections/WhatsAppFloat";

export default function Home() {
  return (
    <MetaPixelProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Features />
        <Metrics />
        <ThreeSteps />
        <Niches />
        <Dashboard />
        <Personalization />
        <Comparison />
        <Ready />
        <VideoDemo />
        <Diagnostic />
        <Testimonials />
        <Faq />
        <Closing />
      </main>
      <Footer />
      <WhatsAppFloat />
    </MetaPixelProvider>
  );
}
