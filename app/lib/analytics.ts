"use client";

// Eventos do Meta Pixel usados na LP2.
// O carregamento do script base acontece uma única vez, no AppShell.

import { trackMetaEvent, trackCustomEvent } from "./meta-pixel";

export function track(eventName: string, params?: Record<string, unknown>): void {
  trackMetaEvent(eventName, params);
}

export function trackCustom(eventName: string, params?: Record<string, unknown>): void {
  trackCustomEvent(eventName, params);
}

/** CTA principal clicado (topo, hero, seção do diagnóstico). */
export function trackCtaClick(location: string): void {
  trackCustom("LeadCtaClick", { cta_location: location });
}

/** Diagnóstico iniciado. */
export function trackDiagnosticStart(): void {
  trackCustom("StartDiagnostic");
}

/** Diagnóstico concluído com sucesso (payload enviado ao n8n). */
export function trackDiagnosticComplete(): void {
  trackCustom("CompleteDiagnostic");
  track("CompleteRegistration");
}

/** Clique no botão de WhatsApp após o diagnóstico. */
export function trackWhatsAppClick(): void {
  trackCustom("ContactWhatsApp");
}
