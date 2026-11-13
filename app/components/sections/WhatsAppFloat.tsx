"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

const WHATSAPP_URL =
  "https://wa.me/5564999877992?text=Oi!%20Vim%20pelo%20site%20da%20alwayson.ai%20e%20quero%20falar%20sobre%20a%20minha%20cl%C3%ADnica.";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [diagnosticInView, setDiagnosticInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector("#diagnostico");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setDiagnosticInView(entry.isIntersecting),
      { rootMargin: "-20% 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = visible && !diagnosticInView;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCtaClick("float_whatsapp")}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.35, ease: EASE }}
          aria-label="Falar no WhatsApp"
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full"
          style={{
            background: "#25D366",
            boxShadow: "0 12px 32px rgba(37,211,102,0.35)",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z"
              fill="#fff"
            />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
