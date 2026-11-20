"use client";

import Image from "next/image";
import { testimonials } from "../../lib/copy";
import { Reveal, Segs } from "../ui/primitives";

export function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]"
      style={{ background: "var(--bg-white)" }}
    >
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <Reveal>
            <p className="lp-label" style={{ color: "#0050c8" }}>
              Prova real
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="font-semibold"
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              {testimonials.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead" style={{ maxWidth: 700 }}>
              <Segs segs={testimonials.support} />
            </p>
          </Reveal>
        </div>

        {/* 2 colunas — prints em tamanho natural, legíveis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1280px] mx-auto w-full min-w-0">
          {testimonials.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="w-full min-w-0">
              <figure
                className="h-full overflow-hidden w-full max-w-full"
                style={{
                  borderRadius: 22,
                  background: "#fff",
                  border: "1px solid rgba(24,25,28,0.09)",
                  boxShadow: "0 12px 44px rgba(0,0,0,0.07)",
                }}
              >
                {/* Identidade — foto real + nome + profissão */}
                <figcaption
                  className="flex items-center gap-4 px-5 py-5"
                  style={{ borderBottom: "1px solid rgba(24,25,28,0.07)" }}
                >
                  <Image
                    src={p.avatar}
                    alt={`Foto de ${p.name}`}
                    width={160}
                    height={160}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                    style={{ border: "2px solid rgba(0,168,255,0.35)" }}
                    loading="eager"
                    decoding="async"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className="font-bold leading-tight"
                      style={{
                        fontSize: "1.1875rem",
                        letterSpacing: "-0.015em",
                        color: "var(--ink)",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      className="mt-1 text-sm font-medium"
                      style={{ color: "#0050c8" }}
                    >
                      {p.profession}
                    </div>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-3 py-1.5 text-[0.6875rem] font-bold"
                    style={{
                      background: "rgba(0,168,255,0.1)",
                      color: "#0050c8",
                    }}
                  >
                    Caso real
                  </span>
                </figcaption>

                {/* Print em resolução natural — qualquer pessoa consegue ler */}
                <div className="px-4 pt-4 w-full min-w-0">
                  <div
                    className="overflow-hidden max-w-full"
                    style={{
                      borderRadius: 14,
                      border: "1px solid rgba(24,25,28,0.08)",
                      background: "#0b141a",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={`Conversa real de ${p.name}`}
                      width={p.width}
                      height={p.height}
                      className="w-full h-auto"
                      style={{ imageRendering: "auto" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Depoimento em destaque */}
                <div className="px-5 py-5">
                  <p
                    className="font-semibold leading-snug"
                    style={{ fontSize: "1.0625rem", color: "var(--ink)" }}
                  >
                    “{p.highlight}”
                  </p>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: "var(--ink-3)" }}
                  >
                    {p.quote}
                  </p>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
