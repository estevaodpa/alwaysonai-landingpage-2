"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../ui/Logo";
import { nav } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const WHATSAPP_URL =
    "https://wa.me/5564999877992?text=Oi!%20Vim%20pelo%20site%20da%20alwayson.ai%20e%20quero%20falar%20sobre%20a%20minha%20cl%C3%ADnica.";

  const handleCta = (location: string) => {
    trackCtaClick(location);
    setMenuOpen(false);
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 h-16 px-4"
    >
      <div
        className="lp-glass h-14 flex items-center gap-3 pl-2 pr-3 py-3 backdrop-blur-[10px]"
        style={{ borderRadius: 12 }}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center shrink-0">
          <Logo variant="dark" height={26} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-12 ml-6">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm transition-opacity duration-150 hover:opacity-60"
              style={{ color: "#212327" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            onClick={() => handleCta("header")}
            className="lp-btn !py-2.5 !px-5 !text-[0.8125rem] !rounded-[10px]"
          >
            {nav.cta}
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`w-5 h-0.5 bg-[#212327] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#212327] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[#212327] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="lg:hidden fixed inset-0 top-16 z-40 px-4 pt-8"
            style={{ background: "rgba(247,250,255,0.96)" }}
          >
            <nav className="flex flex-col gap-6">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-semibold"
                  style={{ color: "#18191c" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                onClick={() => handleCta("header_mobile")}
                className="lp-btn mt-4 w-full"
              >
                {nav.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
