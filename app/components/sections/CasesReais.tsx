"use client";

import Image from "next/image";
import { Reveal } from "../ui/primitives";

const CASES = [
  {
    titulo: "Case Real de cliente",
    niche: "Estética",
    img: "/cases/case-01.webp",
    alt: "Paciente procura a clínica e a secretária responde na hora",
    beneficio: "Resposta em menos de 1 minuto",
    detalhe: "Primeiro contato",
  },
  {
    titulo: "Case Real de cliente",
    niche: "Estética",
    img: "/cases/case-02.webp",
    alt: "Secretária confirma horário e pede o nome completo",
    beneficio: "Conversa natural, sem parecer robô",
    detalhe: "Qualificação",
  },
  {
    titulo: "Case Real de cliente",
    niche: "Estética",
    img: "/cases/case-03.webp",
    alt: "Secretária envia endereço e explica o sinal",
    beneficio: "Tira dúvidas e explica os valores",
    detalhe: "Objeção tratada",
  },
  {
    titulo: "Case Real de cliente",
    niche: "Estética",
    img: "/cases/case-04.webp",
    alt: "Secretária confere o comprovante enviado",
    beneficio: "Confirma o pagamento sozinha",
    detalhe: "Comprovante",
  },
  {
    titulo: "Case Real de cliente",
    niche: "Estética",
    img: "/cases/case-05.webp",
    alt: "Consulta confirmada pela secretária de IA",
    beneficio: "Consulta agendada sem a equipe",
    detalhe: "Agendamento",
  },
];

export function CasesReais() {
  return (
    <section className="relative pt-10 pb-16 lg:pb-24" style={{ background: "#f7faff" }}>
      <div className="lp-container">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="lp-label" style={{ color: "#6d6f74" }}>
              Prova real
            </p>
            <h2
              className="mt-3 font-semibold"
              style={{
                fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "#18191c",
              }}
            >
              Cases reais, do jeito que acontece.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: "#6d6f74", maxWidth: 620, marginInline: "auto" }}
            >
              Cada quadrante abaixo é um momento de uma conversa real atendida pela
              Secretária Inteligente.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CASES.map((c, i) => (
            <Reveal key={c.img} delay={i * 0.06}>
              <article
                className="h-full overflow-hidden"
                style={{
                  borderRadius: 18,
                  background: "#fff",
                  border: "1px solid rgba(24,25,28,0.08)",
                  boxShadow: "0 1px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div className="p-4">
                  <div
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.08em]"
                    style={{ color: "#0050c8" }}
                  >
                    {c.titulo}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="px-2 py-1 rounded-full text-[0.625rem] font-bold uppercase tracking-[0.08em]"
                      style={{ background: "rgba(0,168,255,0.1)", color: "#0050c8" }}
                    >
                      {c.niche}
                    </span>
                    <span className="text-[0.6875rem]" style={{ color: "#9ba1ac" }}>
                      {c.detalhe}
                    </span>
                  </div>
                </div>

                <div className="px-3">
                  <div
                    className="overflow-hidden"
                    style={{ borderRadius: 12, border: "1px solid rgba(24,25,28,0.06)" }}
                  >
                    <Image
                      src={c.img}
                      alt={c.alt}
                      width={900}
                      height={600}
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <p
                    className="font-semibold leading-snug"
                    style={{ fontSize: "0.9375rem", color: "#18191c" }}
                  >
                    {c.beneficio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
