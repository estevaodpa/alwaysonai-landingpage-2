"use client";

import Image from "next/image";
import { dashboard } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

const STAGE_COLORS = [
  { bg: "rgba(0,168,255,0.10)", border: "rgba(0,168,255,0.28)", dot: "#00a8ff" },
  { bg: "rgba(120,120,255,0.10)", border: "rgba(120,120,255,0.26)", dot: "#7878ff" },
  { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.26)", dot: "#10b981" },
  { bg: "rgba(0,168,255,0.16)", border: "rgba(0,168,255,0.38)", dot: "#4dc3ff" },
];

export function Dashboard() {
  const cardsPerColumn = [
    dashboard.cards.slice(0, 1),
    dashboard.cards.slice(1, 3),
    dashboard.cards.slice(3, 5),
    dashboard.cards.slice(5, 6),
  ];

  return (
    <Section id="painel" surface="base">
      <div className="lp-glow bottom-0 right-0 w-[700px] h-[500px]" aria-hidden="true" />

      <div className="relative lp-container">
        <SectionHead
          kicker={dashboard.kicker}
          title={dashboard.title}
          titleHi={dashboard.titleHi}
          support={dashboard.support}
        />

        {/* Kanban */}
        <div className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {dashboard.columns.map((col, i) => (
            <Reveal key={col.title} delay={i * 0.07}>
              <div
                className="h-full rounded-2xl p-3.5 lg:p-4"
                style={{
                  background: "var(--surface-card)",
                  border: `1px solid ${STAGE_COLORS[i].border}`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {col.title}
                  </span>
                  <span
                    className="text-[0.6875rem] font-bold tabular-nums"
                    style={{ color: STAGE_COLORS[i].dot }}
                  >
                    {col.count}
                  </span>
                </div>
                <p
                  className="mt-1.5 text-xs leading-snug"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {col.note}
                </p>

                <div className="mt-3.5 flex flex-col gap-2">
                  {cardsPerColumn[i].map((c) => (
                    <div
                      key={c.name}
                      className="rounded-xl px-3 py-2.5"
                      style={{
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {c.name}
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <span
                          className="text-xs"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {c.note}
                        </span>
                        <span
                          className="text-[0.6875rem] tabular-nums"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {c.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Print real da tabela de contatos */}
        <Reveal delay={0.12}>
          <div
            className="mt-5 lg:mt-6 overflow-hidden"
            style={{
              borderRadius: 20,
              border: "1px solid var(--border-default)",
              background: "var(--surface-card)",
            }}
          >
            <Image
              src={dashboard.image}
              alt={dashboard.imageAlt}
              width={1400}
              height={773}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
