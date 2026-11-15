# LP2 — Design System

> Fonte de verdade das decisões visuais da landing page 2.
>
> **Formato, ritmo, geometria e mecanismos:** fiel ao botconversa.com.br
> **Conteúdo, identidade, logo, provas e produto:** alwayson.ai

---

## 1. A regra de modelagem

**Modelar** = copiar estrutura, ordem de seções, ritmo de scroll, mecanismos de
interação, geometria (padding, gaps, max-width, raios) e tipos de componente.

**Não copiar** = logo, mockups, fotos, ícones, copy, código, paleta e tipografia
do site de referência.

Tudo que aparece na LP2 é reconstruído a partir de:

- Componentes copiados do site alwayson.ai atual
  (`SmartphoneFrame`, `PhoneVideo`, `WhatsAppChat`, `chat/*`)
- Assets reais do produto (`public/produto`, `public/proofs`)
- Tokens abaixo

---

## 2. Geometria medida no modelo (1440×900)

| Elemento | Valor |
|---|---|
| Padding de página | 32px (20px mobile) |
| Container | `1280px` · `1520px` no hero |
| Padding de seção | `72px 0px` |
| Gap do hero (blocos) | `120px` |
| Gap do mosaico de recursos | `12px` — grid `311px × 4`, 2 linhas de `310px` |
| Gap da grade de 3 passos | `28px` — colunas `408px` |
| Gap do grade de comparação | `12px` — 2 colunas |
| Header de seção | `803px` (FAQ, diagnóstico) · `841px` (recursos) · `921px` (passos, nichos) · `774px` (recursos, título) |
| Raio de card | `16px` · `20px` (depoimentos) · `24px` (cards claros) |
| Raio de botão | `8px` |
| Nav | `fixed`, `h-64`, vidro `rgba(255,255,255,.5)` + `blur(10px)`, raio `12px` |

### Mecanismos do modelo replicados

| Mecanismo | Como |
|---|---|
| Hero centralizado, mockup abaixo | headline em 2 linhas, CTA, `gap 120px`, pills + celular |
| Grade em perspectiva | `.lp-perspective-grid` — elipses cônicas a partir de `50% 72%` |
| Pills de operação flutuantes | 4 cards ao redor do celular (`HeroEvents.tsx`) |
| Abas com indicador | `layoutId` do framer-motion sobre gradiente da marca |
| Card com borda gradiente | `padding: 1px` + `border-radius: 16px` + gradiente |
| Card com brilho radial | `radial-gradient(120% 70% at 50% 0%, …)` |
| Mosaico de recursos | grid 4×2 com um card de borda azul |
| Bloco claro aninhado | painel `#f4f5f7` dentro do card escuro |
| Bloco "3 passos" | 3 colunas: card claro + número circulado + título + descrição |
| Curva azul de transição | elipse `#1e9cff → #0050c8` entre o bloco escuro e o claro |
| Bloco "Para empresas" | foto à direita + overlay + texto à esquerda |
| Acordeão | `grid-template-rows: 0fr → 1fr`, 0.35s |
| Botão flutuante de WhatsApp | fixo, some sobre o diagnóstico |

---

## 3. Paleta (alwayson.ai)

### Fundos
- `--bg-light: #f7faff` — hero e seções claras
- `--bg-white: #ffffff` — FAQ e rodapé
- `--bg-dark-2: #18191c` — bloco escuro contínuo (recursos → diagnóstico)
- `--bg-dark: #0f1012` — card "Para empresas"

### Texto
- Sobre claro: `#18191c` · `#2f3238` · `#6d6f74`
- Sobre escuro: `#ffffff` · `#c9ced6` · `rgba(255,255,255,.45)`

### Marca
- `--brand: #00a8ff` (cyan) · `--brand-2: #0050c8` (royal)
- `--brand-grad: linear-gradient(135deg, #0050c8, #00a8ff)`
- `--brand-grad-btn: linear-gradient(135deg, #1e9cff, #0050c8)` — botão: claro → profundo

### Bordas
- `--line-light: rgba(24,25,28,.12)` · `--line-dark: rgba(255,255,255,.08)`

> **Regra**: o azul é tempero. Uma seção tem no máximo um elemento com gradiente
> sólido (o card de borda azul do mosaico).

---

## 4. Tipografia

**Geist Sans** (via `next/font/google`).

| Papel | Tamanho | Peso | Tracking | Leading |
|---|---|---|---|---|
| H1 | `clamp(2.25rem, 5.4vw, 3.5rem)` | 700 | `-0.03em` | 1 |
| H2 | `clamp(1.75rem, 3.6vw, 2.5rem)` | 600 | `-0.02em` | 1 |
| H3 | `1.125rem` | 600 | `-0.015em` | 1.2 |
| Lead | `1.125rem` | 400 | normal | 1.4 |
| Body | `0.9375rem` | 400 | normal | 1.6 |
| Label | `0.6875rem` | 800 | `0.08em` uppercase | 1.4 |

Hierarquia da headline: **a última frase** ou **a palavra-chave** leva
`lp-accent` (gradiente). Nunca a frase inteira.

---

## 5. Movimento

- Easing padrão: `cubic-bezier(0.16, 1, 0.3, 1)`
- `whileInView` com `once: true` e `margin: "-10% 0px"`
- `prefers-reduced-motion` respeitado globalmente via CSS

> **Avoid**: `AnimatePresence mode="wait"` — trava a saída nesta versão do
> framer-motion e impede o próximo estado de montar. Use remount por `key`.

---

## 6. Princípios

1. **Formato primeiro** — a geometria vem do modelo, não do gosto
2. **Identidade sempre** — cor, logo e copy são alwayson
3. **Prova real** — todo print é do produto real
4. **Copy num arquivo só** — `app/lib/copy.ts`; nada de texto no JSX
5. **Contrato não se mexe** — `lib/diagnostic.ts` e `lib/meta-pixel.ts` são
   cópias literais do site atual
