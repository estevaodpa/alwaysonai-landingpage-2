# LP2 — Design System

> Fonte de verdade das decisões visuais da landing page 2.
> Herança: **formato** do botconversa.com.br · **identidade** do alwayson.ai.

---

## 1. A regra de modelagem

**Modelar** = copiar estrutura, ordem de seções, ritmo de scroll, mecanismos de
interação e tipos de componente.

**Não copiar** = logo, mockups, fotos, ícones, copy, código, paleta e tipografia
do site de referência.

Tudo que aparece na LP2 é reconstruído a partir de:

- Componentes copiados do site alwayson.ai atual
  (`SmartphoneFrame`, `PhoneVideo`, `WhatsAppChat`, `chat/*`, `FloatingEvents`)
- Assets reais do produto (`public/produto`, `public/proofs`)
- Tokens do `DESIGN.md` do site atual

---

## 2. Mecanismos modelados no botconversa

| Mecanismo | Como foi aplicado |
|---|---|
| Hero centralizado + mockup abaixo | Headline em 2 linhas centralizadas, CTA único, celular mockado em escala 0.78–0.95 logo abaixo |
| Segmentado com indicador deslizante | Pill de 3 estados no hero, `layoutId` do framer-motion para o indicador |
| Marquee infinito de logos | `lp-marquee-track` com `translateX(-50%)` em loop de 38s, pausa no hover |
| Cards com mockup dentro | 4 cards de recurso + grade de nichos com print real |
| Comparação "Hoje vs. Com" | 2 colunas com mesma hierarquia e tokens da marca |
| Bloco Pricing → Diagnóstico | O slot exato do Pricing virou o diagnóstico inline (mesmo peso visual) |
| Acordeão com `grid-template-rows` | FAQ com `0fr → 1fr` em 0.35s |
| Sombra suave no card | `0 1px 20px rgba(0,0,0,.03)` base + lift no hover |
| Botão gradiente sólido uppercase | `linear-gradient(135deg, #0050c8, #00a8ff)`, pill, glow |
| Botão flutuante de WhatsApp | Verde `#25D366`, fixo, some sobre o diagnóstico |
| Seções que clareiam no fim | base `#08090c` → body `#0b0e13` → lift `#12161d` (depoimentos/FAQ/footer) |

---

## 3. Paleta

### Backgrounds
- `--bg-base: #08090c` — hero, seções "transparentes"
- `--bg-body: #0b0e13` — blocos de conteúdo
- `--bg-lift: #12161d` — blocos finais (depoimentos, FAQ)
- `--surface-card: #11151c` · `--surface-card-2: #161a22` — cards

### Texto
- `--text-primary: #f5f6f7` · `--text-secondary: #9ba1ac` · `--text-tertiary: #5c6370`

### Accent
- `--accent-royal: #0050c8` → `--accent-cyan: #00a8ff` (135deg) — gradiente da marca
- `--accent: #00a8ff` — destaque em texto e bordas
- `--accent-muted: rgba(0,168,255,.12)` · `--accent-glow: rgba(0,168,255,.25)`

### Borders
- `--border-subtle: rgba(255,255,255,.06)` · `--border-default: rgba(255,255,255,.1)` · `--border-accent: rgba(0,168,255,.2)`

> **Regra**: o azul é tempero, nunca prato principal. Uma seção pode ter no
> máximo um elemento com gradiente sólido.

---

## 4. Tipografia

**Geist Sans** (via `next/font/google`). Escala:

| Papel | Tamanho | Peso | Tracking | Leading |
|---|---|---|---|---|
| H1 | `clamp(2.35rem, 6vw, 4.25rem)` | 600 | `-0.035em` | 1.06 |
| H2 | `clamp(2rem, 4.2vw, 3.25rem)` | 600 | `-0.025em` | 1.1 |
| H3 | `clamp(1.15rem, 1.8vw, 1.4rem)` | 600 | `-0.015em` | 1.3 |
| Lead | `clamp(1rem, 1.4vw, 1.15rem)` | 400 | normal | 1.65 |
| Body | `0.9375rem` | 400 | normal | 1.7 |
| Kicker | `0.8125rem` | 500 | `0.16em` uppercase | 1.4 |

Hierarquia da headline: a **última frase** ou a **palavra-chave** leva
`lp-accent` (gradiente). Nunca a frase inteira.

---

## 5. Layout

- Container: `1200px` (1280px a partir de `xl`), padding lateral `24px`
- Padding de seção: `72px` mobile · `120px` desktop
- Raio: `10px` (inputs) · `16px` (cards pequenos) · `20px` (cards) · `9999px` (pills)
- Sombra: `0 24px 60px rgba(0,0,0,.45)` no hover de card

---

## 6. Movimento

- Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)` (EASE)
- Duração: 0.32s (troca de pergunta) · 0.35s (acordeão) · 0.5s (fade) · 0.7s (reveal)
- `whileInView` com `once: true` e `margin: "-12% 0px"` — reveal na entrada
- `prefers-reduced-motion` respeitado globalmente via CSS

> **Avoid**: `AnimatePresence mode="wait"` para troca de tela — trava a saída e
> impede o próximo estado de montar. Use remount por `key`.

---

## 7. Princípios

1. **CLARITY > AESTHETIC > EFFECTS** — movimento explica, não decora
2. **Dark-first** — o logo tem wordmark branco; não existe versão clara
3. **Prova real** — todo print é do produto real, nunca mock genérico
4. **Copy num arquivo só** — `app/lib/copy.ts`; nada de texto no JSX
5. **Contrato não se mexe** — `lib/diagnostic.ts` e `lib/meta-pixel.ts` são
   cópias literais do site atual
