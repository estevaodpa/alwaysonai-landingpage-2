"use client";

import { motion } from "framer-motion";
import { ready } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Ready() {
  return (
    <section id="pronto" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div
        className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 900,
          height: 500,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,120,255,0.1) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative lp-container flex flex-col items-center gap-7">
        {/* Título com revelação por máscara */}
        <motion.h2
          initial={{ clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 }}
          whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lp-h2 text-center"
          style={{ maxWidth: 900 }}
        >
          {ready.title}{" "}
          <span className="lp-accent">{ready.titleHi}</span>
        </motion.h2>

        {/* Chips em cascata com varredor de luz */}
        <div className="relative flex flex-wrap items-center justify-center gap-2.5">
          {ready.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE }}
              className="relative overflow-hidden rounded-full px-5 py-3 text-sm font-medium"
              style={{
                color: "var(--on-dark)",
                background: "rgba(0,168,255,0.08)",
                border: "1px solid rgba(0,168,255,0.22)",
              }}
            >
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 20%, rgba(0,168,255,0.22) 50%, transparent 80%)",
                }}
                initial={{ x: "-120%" }}
                whileInView={{ x: "120%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.08, ease: "easeInOut" }}
              />
              <span className="relative z-10">{item}</span>
            </motion.span>
          ))}
        </div>

        {/* Fechamento com recorte */}
        <motion.div
          initial={{ clipPath: "inset(0 50% 100% 50%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(0 0% 0% 0%)", opacity: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="pt-4"
        >
          <p
            className="text-center font-medium"
            style={{
              fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
              lineHeight: 1.4,
              color: "var(--on-dark)",
              maxWidth: 760,
            }}
          >
            A conversa acontece no WhatsApp.{" "}
            <span className="lp-accent">O resto se organiza sozinho.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
