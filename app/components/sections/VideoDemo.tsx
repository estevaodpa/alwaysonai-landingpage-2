"use client";

import { useEffect, useRef, useState } from "react";
import { video } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function VideoDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => {
      v.muted = true;
      const p = v.play();
      if (p) p.catch(() => {});
    };
    play();
    const onCanPlay = () => {
      setReady(true);
      play();
    };
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <Section id="demo" surface="base">
      <div className="lp-container">
        <SectionHead
          kicker={video.kicker}
          title={video.title}
          titleHi={video.titleHi}
          support={video.support}
        />

        <Reveal delay={0.12}>
          <div
            className="relative mt-12 lg:mt-16 mx-auto overflow-hidden"
            style={{
              maxWidth: 900,
              borderRadius: 20,
              border: "1px solid var(--border-default)",
              background: "#000",
              boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
            }}
          >
            <video
              ref={videoRef}
              className="w-full h-auto block"
              poster="/videos/demo-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setReady(true)}
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity .6s ease",
              }}
            >
              <source
                src="/videos/video_demo_ia_agendamento.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
