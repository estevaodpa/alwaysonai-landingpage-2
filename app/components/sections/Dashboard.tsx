"use client";

import Image from "next/image";
import { dashboard } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

const STAGE_COLORS = [
  { border: "rgba(0,168,255,0.28)", dot: "#00a8ff", bg: "rgba(0,168,255,0.08)" },
  { border: "rgba(120,120,255,0.26)", dot: "#7878ff", bg: "rgba(120,120,255,0.08)" },
  { border: "rgba(16,185,129,0.26)", dot: "#10b981", bg: "rgba(16,185,129,0.08)" },
  { border: "rgba(77,195,255,0.38)", dot: "#4dc3ff", bg: "rgba(0,168,255,0.14)" },
];

export function Dashboard() {
  const cardsPerColumn = [
    dashboard.cards.slice(0, 1),
    dashboard.cards.slice(1, 3),
    dashboard.cards.slice(3, 5),
    dashboard.cards.slice(5, 6),
  ];

  return (
    <section id="painel" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container flex flex-col gap-7">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {dashboard.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 921 }}>
              {dashboard.title}{" "}
              <span className="lp-accent">{dashboard.titleHi}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 700 }}>
              {dashboard.support}
            </p>
          </Reveal>
        </div>

        {/* Kanban */}
        <Reveal delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {dashboard.columns.map((col, i) => (
              <div
                key={col.title}
                className="rounded-2xl p-4"
                style={{
                  background: STAGE_COLORS[i].bg,
                  border: `1px solid ${STAGE_COLORS[i].border}`,
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.1em]"
                    style={{ color: "var(--on-dark-2)" }}
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
                  style={{ color: "var(--on-dark-3)" }}
                >
                  {col.note}
                </p>

                <div className="mt-3.5 flex flex-col gap-2">
                  {cardsPerColumn[i].map((c) => (
                    <div
                      key={c.name}
                      className="rounded-xl px-3 py-2.5"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        className="text-sm font-medium"
                        style={{ color: "var(--on-dark)" }}
                      >
                        {c.name}
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <span className="text-xs" style={{ color: "var(--on-dark-2)" }}>
                          {c.note}
                        </span>
                        <span
                          className="text-[0.6875rem] tabular-nums"
                          style={{ color: "var(--on-dark-3)" }}
                        >
                          {c.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Print real */}
        <Reveal delay={0.14}>
          <div
            className="overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
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
    </section>
  );
}
