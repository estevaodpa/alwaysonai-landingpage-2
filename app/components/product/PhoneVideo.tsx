"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Momento (em segundos) em que a IA confirma o agendamento no vídeo.
// A notificação de grupo deve aparecer exatamente quando isso acontece.
const NOTIFICATION_AT = 52.5;
const VIDEO_SRC = "/videos/video_demo_ia_agendamento.mp4";
const POSTER_SRC = "/videos/demo-poster.jpg";

export function PhoneVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS ignora o atributo `muted` do JSX em alguns casos: trava via JS.
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => {});
    };

    // Tenta tocar no mount; se o SO bloquear (economia de bateria/dados),
    // o primeiro toque do usuário destrava.
    tryPlay();
    const onCanPlay = () => tryPlay();
    const onFirstTouch = () => tryPlay();
    window.addEventListener("pointerdown", onFirstTouch, { once: true });

    const onTimeUpdate = () => {
      // Mostra a notificação a partir do momento da confirmação;
      // esconde quando o vídeo reinicia o loop (volta para 0).
      setShowNotification(video.currentTime >= NOTIFICATION_AT);
    };

    const onEnded = () => setShowNotification(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      window.removeEventListener("pointerdown", onFirstTouch);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0b141a]">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Notificação de agendamento — sincronizada com o momento da confirmação */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 flex items-center justify-center p-4"
          >
            <Image
              src="/produto/foto_agendamento_grupo.png"
              alt="Notificação de nova consulta agendada"
              width={1074}
              height={738}
              className="w-full max-w-[320px] h-auto rounded-2xl"
              style={{
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(0,168,255,0.15)",
              }}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
