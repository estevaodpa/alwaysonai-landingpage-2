"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCta = (e: React.MouseEvent, location: string) => {
    e.preventDefault();
    trackCtaClick(location);
    document
      .querySelector("#diagnostico")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-base)]/85 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="lp-container h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#top" className="flex items-center shrink-0">
          <Image
            src="/logos/alwayson-logo-text-transparent-crop.png"
            alt="alwayson.ai"
            width={1094}
            height={158}
            priority
            className="hidden sm:block"
            style={{ height: "34px", width: "auto" }}
          />
          <Image
            src="/logos/alwayson-logo-symbol-crop.png"
            alt="alwayson.ai"
            width={200}
            height={151}
            priority
            className="sm:hidden"
            style={{ height: "30px", width: "auto" }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            {nav.login}
          </a>
          <a
            href="#diagnostico"
            onClick={(e) => handleCta(e, "header")}
            className="lp-btn-secondary !py-2.5 !px-5 !text-[0.8125rem]"
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
            className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="lg:hidden bg-[var(--bg-base)]/95 backdrop-blur-xl border-b border-[var(--border-subtle)] overflow-hidden"
          >
            <nav className="lp-container flex flex-col gap-5 py-8">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#diagnostico"
                onClick={(e) => handleCta(e, "header_mobile")}
                className="lp-btn-primary mt-2 w-full"
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
