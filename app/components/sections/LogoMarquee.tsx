"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { marquee } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function LogoMarquee() {
  // duplica para o loop ser contínuo sem buraco
  const items = [...marquee.logos, ...marquee.logos];

  return (
    <section className="relative pt-2 pb-10 lg:pb-14" style={{ overflowX: "clip" }}>
      <div
        className="lp-container flex flex-col items-center gap-5 w-full min-w-0"
        style={{ maxWidth: 1180 }}
      >
        <Reveal className="w-full">
          <p
            className="text-center font-semibold"
            style={{ fontSize: "1rem", color: "#18191c" }}
          >
            {marquee.headline}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="w-full min-w-0">
          <div className="lp-marquee w-full max-w-full" style={{ maxWidth: "100%" }}>
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            >
              {items.map((logo, i) => (
                <div
                  key={`${logo.src}-${i}`}
                  className="flex shrink-0 items-center px-7 lg:px-10"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.w}
                    height={110}
                    className="h-[80px] w-auto object-contain sm:h-[96px] lg:h-[104px]"
                    style={{ filter: "saturate(0.72)" }}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
