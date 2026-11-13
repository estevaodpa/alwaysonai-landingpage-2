"use client";

import Image from "next/image";
import { steps } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function ThreeSteps() {
  return (
    <Section id="como-funciona" surface="base">
      <div className="relative lp-container">
        <SectionHead
          kicker={steps.kicker}
          title={steps.title}
          titleHi={steps.titleHi}
          support={steps.support}
        />

        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Coluna de passos */}
          <div className="flex flex-col gap-4">
            {steps.items.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="lp-card flex gap-5">
                  <span
                    className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full font-semibold text-lg"
                    style={{
                      background: "var(--gradient-brand)",
                      color: "#fff",
                      boxShadow: "0 10px 26px rgba(0,120,255,0.3)",
                    }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="lp-h3">{s.title}</h3>
                    <p className="lp-body mt-2">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mockup */}
          <Reveal delay={0.16}>
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 20,
                border: "1px solid var(--border-default)",
                background: "var(--surface-card)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="/produto/agenda.png"
                alt="Agenda da clínica com os horários já preenchidos pela IA"
                width={1400}
                height={782}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
