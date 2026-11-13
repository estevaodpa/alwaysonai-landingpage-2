"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { demoTimeline, type DemoStage } from "../../lib/demo-timeline";

type FloatingEvent = {
  id: number;
  label: string;
  enteredAt: number;
  depth: number;
};

type Layer = "back" | "mid" | "front";

export function FloatingEvents({ layer = "mid" as Layer }) {
  const [events, setEvents] = useState<FloatingEvent[]>([]);
  const [stageIndex, setStageIndex] = useState(0);
  const idCounter = useRef(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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
    setEvents([]);
    setStageIndex(0);
  }, []);

  useEffect(() => {
    if (stageIndex >= demoTimeline.length) {
      addTimeout(() => reset(), 5000);
      return;
    }

    const stage: DemoStage = demoTimeline[stageIndex];

    const processStage = () => {
      if (stage.event) {
        const newEvent: FloatingEvent = {
          id: nextId(),
          label: stage.event.label,
          enteredAt: Date.now(),
          depth: 0,
        };

        setEvents((prev) => {
          const updated = [...prev, newEvent];
          return updated.slice(-2);
        });
      }
      addTimeout(() => setStageIndex((i) => i + 1), stage.delay);
    };

    addTimeout(processStage, stage.delay);

    return () => clearAllTimeouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageIndex]);

  useEffect(() => {
    return () => clearAllTimeouts();
  }, [clearAllTimeouts]);

  const layerStyles = {
    back: {
      scale: 0.85,
      opacity: 0.5,
      blur: 2,
      filter: "blur(2px)",
      translateZ: -200,
    },
    mid: {
      scale: 0.92,
      opacity: 0.75,
      blur: 0.5,
      filter: "blur(0.5px)",
      translateZ: -50,
    },
    front: {
      scale: 1,
      opacity: 1,
      blur: 0,
      filter: "blur(0px)",
      translateZ: 0,
    },
  };

  const style = layerStyles[layer];

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        transform: `translateZ(${style.translateZ}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence mode="popLayout">
        {events.map((event, index) => {
          const isLatest = index === events.length - 1;
          const depth = events.length - 1 - index;
          const positionX = isLatest ? 0 : depth * 40;
          const positionY = isLatest ? 0 : -depth * 30;
          const finalOpacity = isLatest ? style.opacity : style.opacity * 0.6;
          const finalScale = isLatest ? style.scale : style.scale * 0.95;

          return (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                scale: style.scale * 0.8,
                y: 20,
                filter: style.filter,
              }}
              animate={{
                opacity: finalOpacity,
                scale: finalScale,
                x: positionX,
                y: positionY,
                filter: style.filter,
              }}
              exit={{
                opacity: 0,
                scale: style.scale * 0.85,
                filter: "blur(3px)",
                transition: { duration: 0.6 },
              }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute ${
                isLatest
                  ? layer === "back"
                    ? "top-[5%] left-[5%]"
                    : layer === "mid"
                    ? "top-[12%] right-[8%]"
                    : "top-[25%] right-[2%]"
                  : "top-[8%] left-[8%]"
              }`}
              style={{
                zIndex: layer === "front" ? 30 : layer === "mid" ? 20 : 10,
              }}
            >
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full"
                style={{
                  background:
                    layer === "front"
                      ? "linear-gradient(135deg, rgba(0,80,200,0.18) 0%, rgba(0,168,255,0.18) 100%)"
                      : "linear-gradient(135deg, rgba(0,80,200,0.10) 0%, rgba(0,168,255,0.10) 100%)",
                  border:
                    layer === "front"
                      ? "1px solid rgba(0,168,255,0.35)"
                      : "1px solid rgba(0,168,255,0.20)",
                  backdropFilter: layer === "front" ? "blur(12px)" : "blur(6px)",
                  boxShadow:
                    layer === "front"
                      ? "0 8px 24px rgba(0,0,0,0.3), 0 0 20px rgba(0,168,255,0.15)"
                      : "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
                  }}
                />
                <span className="text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">
                  {event.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
