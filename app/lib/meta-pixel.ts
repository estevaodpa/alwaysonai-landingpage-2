"use client";

// Integração centralizada do Meta Pixel.
// O Pixel ID pode vir da variável de ambiente NEXT_PUBLIC_META_PIXEL_ID,
// com fallback para o ID padrão do alwayson.ai definido abaixo.
// Sem um ID válido, o site funciona normalmente sem tentar disparar o Pixel.

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1651770943216322";

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue?: unknown[];
      push?: unknown;
      loaded?: boolean;
      version?: string;
    };
    _fbq?: unknown;
  }
}

export function isMetaPixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID);
}

// Carrega o script base do Meta Pixel e inicializa com o Pixel ID.
// Idempotente: só executa uma vez por página e retorna cedo se já carregado
// ou se o Pixel ID estiver vazio.
export function loadMetaPixel(): void {
  if (!isMetaPixelEnabled()) return;
  if (typeof window === "undefined" || window.fbq) return;

  const self = function (...args: unknown[]) {
    if (self.callMethod) {
      self.callMethod(...args);
    } else {
      self.queue?.push(args);
    }
  } as Window["fbq"] & { callMethod?: (...a: unknown[]) => void; queue?: unknown[] };

  self.push = self;
  self.loaded = true;
  self.version = "2.0";
  self.queue = [];
  window.fbq = self;
  window._fbq = self;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

// Dispara um evento padrão do Meta Pixel. No-op seguro quando o Pixel não
// está habilitado ou o fbq ainda não foi carregado.
export function trackMetaEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!isMetaPixelEnabled()) return;
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", eventName, params);
}

// Dispara um evento customizado (trackCustom). No-op seguro.
export function trackCustomEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!isMetaPixelEnabled()) return;
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", eventName, params);
}
