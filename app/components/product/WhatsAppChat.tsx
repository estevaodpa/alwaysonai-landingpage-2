"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  demoTimeline,
  RESTART_DELAY,
  CHAT_CONTACT_NAME,
  CHAT_CONTACT_STATUS,
  CHAT_HEADER_TITLE,
  type DemoStage,
} from "../../lib/demo-timeline";

type RenderedMessage = {
  id: number;
  kind: "incoming" | "outgoing";
  text: string;
  timestamp: string;
};

const WA_BG = "#0b141a";
const WA_BUBBLE_RECEIVED = "#1f2c34";
const WA_TEXT_PRIMARY = "#e9edef";
const WA_TEXT_SECONDARY = "#8696a0";
const WA_HEADER_BG = "#1f2c34";
const WA_CHECK_READ = "#53bdeb";

export function WhatsAppChat() {
  const [messages, setMessages] = useState<RenderedMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }
    });
  }, [prefersReducedMotion]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
  }, []);

  const nextId = useCallback(() => ++idCounter.current, []);

  const reset = useCallback(() => {
    setMessages([]);
    setStageIndex(0);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    if (stageIndex >= demoTimeline.length) {
      addTimeout(() => reset(), RESTART_DELAY);
      return;
    }

    const stage: DemoStage = demoTimeline[stageIndex];

    const processStage = () => {
      if (stage.message) {
        if (stage.message.kind === "outgoing" && stage.typingDuration) {
          if (prefersReducedMotion) {
            setMessages((prev) => [
              ...prev,
              {
                id: nextId(),
                kind: "outgoing",
                text: stage.message!.text,
                timestamp: stage.message!.timestamp,
              },
            ]);
            scrollToBottom();
            addTimeout(() => setStageIndex((i) => i + 1), 300);
          } else {
            setIsTyping(true);
            scrollToBottom();
            addTimeout(() => {
              setIsTyping(false);
              setMessages((prev) => [
                ...prev,
                {
                  id: nextId(),
                  kind: "outgoing",
                  text: stage.message!.text,
                  timestamp: stage.message!.timestamp,
                },
              ]);
              scrollToBottom();
              addTimeout(() => setStageIndex((i) => i + 1), 300);
            }, stage.typingDuration);
          }
        } else if (stage.message.kind === "incoming") {
          setMessages((prev) => [
            ...prev,
            {
              id: nextId(),
              kind: "incoming",
              text: stage.message!.text,
              timestamp: stage.message!.timestamp,
            },
          ]);
          scrollToBottom();
          addTimeout(() => setStageIndex((i) => i + 1), 300);
        }
      } else {
        addTimeout(() => setStageIndex((i) => i + 1), stage.delay);
      }
    };

    addTimeout(processStage, stage.delay);

    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  return (
    <div
      className="relative w-full h-full flex flex-col"
      style={{ background: WA_BG }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='0.4'%3E%3Ccircle cx='15' cy='15' r='2.5'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='85' cy='85' r='2.5'/%3E%3Cpath d='M8 35 Q20 28 32 35'/%3E%3Cpath d='M68 65 Q80 58 92 65'/%3E%3Cpath d='M40 8 L45 18 L35 18 Z'/%3E%3Cpath d='M60 92 L65 82 L55 82 Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      <div
        className="relative z-10 h-6 flex items-center justify-between px-4 text-[10px] font-semibold shrink-0"
        style={{ color: WA_TEXT_PRIMARY }}
      >
        <span>14:32</span>
        <div className="flex items-center gap-1">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor">
            <rect x="0" y="6" width="2" height="4" rx="0.5" />
            <rect x="3" y="4" width="2" height="6" rx="0.5" />
            <rect x="6" y="2" width="2" height="8" rx="0.5" />
            <rect x="9" y="0" width="2" height="10" rx="0.5" />
          </svg>
          <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
            <path d="M6.5 0C4 0 1.7 1 0 2.7l1.4 1.4c1.3-1.3 3.1-2.1 5.1-2.1s3.8.8 5.1 2.1L13 2.7C11.3 1 9 0 6.5 0z" />
            <path d="M6.5 3.5c-1.5 0-2.9.6-4 1.6l1.4 1.4c.7-.7 1.6-1.1 2.6-1.1s1.9.4 2.6 1.1l1.4-1.4c-1.1-1-2.5-1.6-4-1.6z" />
            <circle cx="6.5" cy="7.5" r="1.5" />
          </svg>
          <div className="flex items-center">
            <div
              className="w-6 h-3 border rounded-[2px] flex items-center px-[1px]"
              style={{ borderColor: WA_TEXT_PRIMARY }}
            >
              <div
                className="h-2 rounded-[1px]"
                style={{ background: WA_TEXT_PRIMARY, width: "80%" }}
              />
            </div>
            <div
              className="w-[2px] h-[4px] ml-[1px] rounded-r"
              style={{ background: WA_TEXT_PRIMARY }}
            />
          </div>
        </div>
      </div>

      <div
        className="relative z-10 h-16 flex items-center pl-14 pr-3 gap-2 shrink-0"
        style={{ background: WA_HEADER_BG, paddingTop: "12px" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 absolute left-3 top-1/2 -translate-y-1/2"
        >
          <path
            d="M15 18l-6-6 6-6"
            stroke="#00a8ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-medium"
          style={{
            background:
              "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
            color: "#fff",
          }}
        >
          M
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-medium truncate"
            style={{ color: WA_TEXT_PRIMARY }}
          >
            {CHAT_CONTACT_NAME}
          </div>
          <div
            className="text-[11px] truncate"
            style={{ color: WA_TEXT_SECONDARY }}
          >
            {CHAT_HEADER_TITLE} · {CHAT_CONTACT_STATUS}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
              stroke="#00a8ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="#00a8ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto p-3 flex flex-col gap-1.5"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.1) transparent",
        }}
      >
        <div className="flex justify-center my-2">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: WA_TEXT_SECONDARY,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="11"
                width="18"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 11V7a5 5 0 0110 0v4"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span>Mensagens são protegidas com criptografia ponta-a-ponta</span>
          </div>
        </div>

        <div className="flex justify-center my-2">
          <span
            className="text-[10px] px-2 py-0.5 rounded-md"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: WA_TEXT_SECONDARY,
            }}
          >
            Hoje
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {messages.map((msg) =>
            msg.kind === "incoming" ? (
              <IncomingBubble
                key={msg.id}
                text={msg.text}
                timestamp={msg.timestamp}
              />
            ) : (
              <OutgoingBubble
                key={msg.id}
                text={msg.text}
                timestamp={msg.timestamp}
              />
            )
          )}
          {isTyping && <TypingBubble key="typing" />}
        </AnimatePresence>
      </div>

      <div
        className="relative z-10 h-14 flex items-center px-3 gap-2 shrink-0"
        style={{ background: WA_HEADER_BG }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#8696a0"
            strokeWidth="1.5"
          />
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2"
            stroke="#8696a0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="9" cy="10" r="1" fill="#8696a0" />
          <circle cx="15" cy="10" r="1" fill="#8696a0" />
        </svg>

        <div
          className="flex-1 h-9 rounded-full px-4 flex items-center text-sm"
          style={{
            background: "#2a3942",
            color: WA_TEXT_SECONDARY,
          }}
        >
          Mensagem
        </div>

        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
              fill="#fff"
            />
            <path
              d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IncomingBubble({ text, timestamp }: { text: string; timestamp: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="self-start max-w-[80%]"
    >
      <div
        className="relative px-2.5 py-1.5 rounded-lg"
        style={{
          background: WA_BUBBLE_RECEIVED,
          color: WA_TEXT_PRIMARY,
          fontSize: "13px",
          lineHeight: 1.4,
          borderTopLeftRadius: "2px",
        }}
      >
        <span>{text}</span>
        <span
          className="inline-block ml-2 text-[10px]"
          style={{ color: WA_TEXT_SECONDARY }}
        >
          {timestamp}
        </span>
      </div>
    </motion.div>
  );
}

function OutgoingBubble({ text, timestamp }: { text: string; timestamp: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="self-end max-w-[80%]"
    >
      <div
        className="relative px-2.5 py-1.5 rounded-lg"
        style={{
          background:
            "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
          color: "#fff",
          fontSize: "13px",
          lineHeight: 1.4,
          borderTopRightRadius: "2px",
        }}
      >
        <span>{text}</span>
        <span className="inline-flex items-center gap-1 ml-2 text-[10px] opacity-90">
          {timestamp}
          <svg width="16" height="11" viewBox="0 0 18 11" fill="none">
            <path
              d="M1 5.5l3 3 5-6"
              stroke={WA_CHECK_READ}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 5.5l3 3 5-6"
              stroke={WA_CHECK_READ}
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="self-start"
    >
      <div
        className="relative px-3 py-2.5 rounded-lg flex items-center gap-1"
        style={{
          background: WA_BUBBLE_RECEIVED,
          borderTopLeftRadius: "2px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: WA_TEXT_SECONDARY }}
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
