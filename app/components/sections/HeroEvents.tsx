"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Event = {
  icon: "bolt" | "spark" | "calendar" | "check";
  title: string;
  detail: string;
  active?: boolean;
};

const LEFT: Event[] = [
  {
    icon: "bolt",
    title: "Novo lead detectado",
    detail: "Mariana iniciou uma conversa",
    active: true,
  },
  {
    icon: "spark",
    title: "Intenção identificada",
    detail: "Procedimento e origem mapeados",
  },
];

const RIGHT: Event[] = [
  {
    icon: "calendar",
    title: "Lead qualificado",
    detail: "Perfil compatível com o procedimento",
  },
  {
    icon: "check",
    title: "Agendamento confirmado",
    detail: "A IA marcou a consulta na agenda",
  },
];

function Icon({ name }: { name: Event["icon"] }) {
  const common = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none" };
  if (name === "bolt")
    return (
      <svg {...common}>
        <path
          d="M9 1.5 3.5 9H8l-.8 5.5L12.5 7H8l1-5.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "spark")
    return (
      <svg {...common}>
        <path
          d="M8 2v3M8 11v3M2 8h3M11 8h3M3.8 3.8l2.1 2.1M10.1 10.1l2.1 2.1M12.2 3.8l-2.1 2.1M5.9 10.1l-2.1 2.1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "calendar")
    return (
      <svg {...common}>
        <rect
          x="2"
          y="3.2"
          width="12"
          height="10.3"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M2 6.6h12M5.4 1.8v2.6M10.6 1.8v2.6"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  return (
    <svg {...common}>
      <path
        d="M3 8.4 6.3 11.7 13 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EventCard({
  event,
  className,
  delay,
}: {
  event: Event;
  className: string;
  delay: number;
}) {
  const isActive = event.active;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`absolute ${className} w-[212px] sm:w-[250px] rounded-2xl px-4 py-3`}
      style={{
        background: isActive ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.62)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${isActive ? "rgba(16,185,129,0.35)" : "rgba(24,25,28,0.07)"}`,
        boxShadow: isActive
          ? "0 12px 32px rgba(0,0,0,0.08)"
          : "0 6px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
          style={{
            background: isActive ? "#10b981" : "rgba(24,25,28,0.06)",
            color: isActive ? "#fff" : "rgba(24,25,28,0.45)",
          }}
        >
          <Icon name={event.icon} />
        </span>
        <div className="min-w-0">
          <div
            className="text-sm font-bold leading-tight"
            style={{
              color: isActive ? "var(--ink)" : "rgba(24,25,28,0.45)",
            }}
          >
            {event.title}
          </div>
          <div
            className="text-xs mt-1 leading-snug"
            style={{ color: "rgba(24,25,28,0.45)" }}
          >
            {event.detail}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Pills de operação ao redor do mockup — mesmo mecanismo do modelo. */
export function HeroEvents() {
  return (
    <>
      <EventCard event={LEFT[0]} className="left-[14%] top-[4%]" delay={0.55} />
      <EventCard event={LEFT[1]} className="left-[16%] top-[24%]" delay={0.7} />
      <EventCard event={RIGHT[0]} className="right-[14%] top-[6%]" delay={0.65} />
      <EventCard event={RIGHT[1]} className="right-[16%] top-[26%]" delay={0.8} />
    </>
  );
}
