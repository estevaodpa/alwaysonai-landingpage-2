"use client";

import { useEffect, useRef, useState } from "react";
import { video } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

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
    <section id="demo" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container flex flex-col items-center gap-8">
        <Reveal>
          <h2 className="lp-h2 text-center" style={{ maxWidth: 760 }}>
            {video.title}{" "}
            <span className="lp-accent">{video.titleHi}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="lp-lead lp-lead-dark text-center" style={{ maxWidth: 700 }}>
            {video.support}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <div
            className="relative w-full overflow-hidden mt-4"
            style={{
              maxWidth: 900,
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.1)",
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
    </section>
  );
}
