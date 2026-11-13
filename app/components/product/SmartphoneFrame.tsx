"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { WhatsAppChat } from "./WhatsAppChat";

export function SmartphoneFrame({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) / rect.width;
      const offsetY = (e.clientY - centerY) / rect.height;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    if (isHovering) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering, mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        perspective: 1400,
        transformStyle: "preserve-3d",
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -4, 0, 4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          transform: "rotateY(-8deg) rotateX(2deg)",
        }}
        className="relative"
      >
        <div
          className="relative w-[340px] h-[700px] rounded-[52px] p-[10px]"
          style={{
            background:
              "linear-gradient(145deg, #1f2329 0%, #0f1115 50%, #1a1d22 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.1), 0 40px 80px rgba(0,0,0,0.6), 0 0 100px rgba(0,168,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="relative w-full h-full rounded-[44px] overflow-hidden"
            style={{
              background: "#000",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 -1px 0 rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="absolute top-[10px] left-1/2 translate-x-[36px] w-[90px] h-[26px] rounded-full z-30"
              style={{ background: "#000" }}
            />

            <div className="absolute inset-0 rounded-[44px] overflow-hidden">
              {children ?? <WhatsAppChat />}
            </div>

            {/* Subtle screen reflection overlay */}
            <div
              className="absolute inset-0 rounded-[44px] pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.02) 100%)",
              }}
            />
          </div>

          {/* Side buttons */}
          <div
            className="absolute -left-[2px] top-[120px] w-[2px] h-[30px] rounded-l-sm"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute -left-[2px] top-[170px] w-[2px] h-[50px] rounded-l-sm"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute -left-[2px] top-[230px] w-[2px] h-[50px] rounded-l-sm"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="absolute -right-[2px] top-[180px] w-[2px] h-[80px] rounded-r-sm"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />

          {/* Bottom edge highlight */}
          <div
            className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[60px] h-[1px] rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          />
        </div>

        {/* Subtle reflection overlay on outer frame */}
        <div
          className="absolute inset-0 rounded-[52px] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 35%, transparent 65%, rgba(255,255,255,0.02) 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
