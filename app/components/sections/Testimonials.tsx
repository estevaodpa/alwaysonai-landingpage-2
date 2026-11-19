"use client";

import Image from "next/image";
import { testimonials } from "../../lib/copy";
import { Reveal, Segs } from "../ui/primitives";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative pt-20 lg:pt-28 pb-16 lg:pb-24"
      style={{
        background: "linear-gradient(180deg, #eaf3ff 0%, #ffffff 42%)",
      }}
    >
      {/* Curva azul — transição do bloco escuro para o claro */}
      <div
        className="absolute left-1/2 pointer-events-none"
        style={{
          top: -320,
          transform: "translateX(-50%)",
          width: 2800,
          maxWidth: "220vw",
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 50%, #1e9cff 0%, #0a72d8 36%, rgba(0,80,200,0) 66%)",
          opacity: 0.92,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="relative lp-container" style={{ zIndex: 1 }}>
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-8 lg:mb-10">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--ink-3)" }}>
              {testimonials.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ color: "var(--ink)", maxWidth: 803 }}>
              {testimonials.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead" style={{ maxWidth: 700 }}>
              <Segs segs={testimonials.support} />
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <figure
                className="h-full flex flex-col overflow-hidden"
                style={{
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.72)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  boxShadow: "0 1px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Texto no topo */}
                <div className="p-5 flex-1">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(24,25,28,0.62)" }}
                  >
                    {p.quote}
                  </p>
                </div>

                {/* Print da conversa */}
                <div className="px-4">
                  <div
                    className="overflow-hidden"
                    style={{ borderRadius: 12, border: "1px solid rgba(24,25,28,0.07)" }}
                  >
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.profession}`}
                      width={p.width}
                      height={p.height}
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Autor embaixo, com divisor */}
                <figcaption
                  className="mt-4 px-5 py-4 flex items-center gap-3"
                  style={{ borderTop: "1px solid rgba(24,25,28,0.08)" }}
                >
                  <span
                    className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-bold text-xs"
                    style={{
                      background: "linear-gradient(135deg, #1e9cff 0%, #0050c8 100%)",
                      color: "#fff",
                    }}
                    aria-hidden="true"
                  >
                    {p.name
                      .replace(/^(Doutora|Doutor)\s+/i, "")
                      .split(" ")
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--ink)" }}
                    >
                      {p.name}
                    </div>
                    <div className="text-xs" style={{ color: "var(--ink-3)" }}>
                      {p.profession}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Conclusão */}
        <Reveal delay={0.12}>
          <div className="mt-14 lg:mt-16 text-center">
            <div className="flex justify-center mb-8">
              <div
                className="w-24 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,80,200,0.35), transparent)",
                }}
              />
            </div>

            <h3
              className="font-semibold"
              style={{
                fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              {testimonials.closing.headline}
            </h3>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
              {testimonials.closing.results.map((r) => (
                <div key={r.label} className="text-center">
                  <div
                    className="text-xs uppercase tracking-[0.12em]"
                    style={{ color: "var(--ink-3)" }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="mt-1.5 font-semibold"
                    style={{ fontSize: "1.1875rem", color: "var(--brand-2)" }}
                  >
                    {r.value}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-6 font-medium"
              style={{
                fontSize: "1.1875rem",
                lineHeight: 1.55,
                color: "var(--ink-3)",
              }}
            >
              <Segs segs={testimonials.closing.final} />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
