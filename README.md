# alwayson.ai — Landing Page 2

Landing page de tráfego para a alwayson.ai. O visitante chega do anúncio, passa
por um **diagnóstico guiado** dentro da própria página e sai pelo **WhatsApp**.

- **Formato, ritmo e transições** modelados em [botconversa.com.br](https://botconversa.com.br/)
- **Conteúdo, identidade, logo, provas e produto** vindos do site alwayson.ai atual
  (`D:\Estêvão\projetos_opencode`)

---

## Estrutura da página (15 seções, ~17.000px)

| # | Seção | Anchor |
|---|---|---|
| 1 | Nav fixo (logo, links, CTA) | `#top` |
| 2 | Hero — badges, headline, mockup do celular, segmentado | `#top` |
| 3 | Marquee de clientes | — |
| 4 | Recursos (4 cards) | `#recursos` |
| 5 | Números + print do painel | `#resultados` |
| 6 | Como funciona em 3 passos | `#como-funciona` |
| 7 | Nichos (odontologia, estética, clínica geral) | `#nichos` |
| 8 | Painel / kanban + tabela de contatos | `#painel` |
| 9 | Personalização (IA genérica vs. personalizada) | `#personalizacao` |
| 10 | Comparação "Hoje vs. Com a alwayson.ai" | `#comparacao` |
| 11 | Entregue pronto | `#pronto` |
| 12 | Vídeo de demonstração | `#demo` |
| 13 | **Diagnóstico** (7 perguntas → contato → WhatsApp) | `#diagnostico` |
| 14 | Provas sociais (4 conversas reais) | `#depoimentos` |
| 15 | Fechamento + FAQ + rodapé | `#faq` |

O bloco de **diagnóstico ocupa o slot onde o botconversa tem o Pricing**: mesma
posição na narrativa, mesmo peso visual.

---

## Diagnóstico (o núcleo da conversão)

- **7 perguntas** copiadas de `app/lib/diagnostic.ts` (que veio verbatim do site
  alwayson.ai atual), incluindo a pergunta condicional de canais de marketing.
- **Inline na página**, não em modal. Uma pergunta por vez, com barra de progresso.
- Salvamento progressivo a cada resposta (`status: "em_andamento"`, `save_seq`
  incremental) — o lead não se perde se a pessoa fechar a aba.
- Envio final bloqueante ao n8n (`status: "concluido"`) com nome, clínica e
  WhatsApp (com máscara).
- Destino: `wa.me/5564999877992` com a mensagem preenchida.
- Eventos no Meta Pixel: `StartDiagnostic`, `CompleteDiagnostic`,
  `CompleteRegistration`, `LeadCtaClick`, `ContactWhatsApp`.

> `app/lib/diagnostic.ts` e `app/lib/meta-pixel.ts` são **cópias literais** do site
> atual. Não edite o formato do payload — o n8n e o Ads Manager dependem dele.

---

## Identidade visual

Tokens em `app/globals.css` (copiados do site atual) + camada de componentes em
`app/ui.css`.

| Token | Valor |
|---|---|
| Fundo base / body / lift | `#08090c` · `#0b0e13` · `#12161d` |
| Texto | `#f5f6f7` · `#9ba1ac` · `#5c6370` |
| Gradiente da marca | `#0050c8` → `#00a8ff` (135deg) |
| Card | raio 20px, `#11151c`, borda `rgba(255,255,255,.1)` |
| Botão primário | gradiente sólido, raio pill, uppercase, glow |
| Tipografia | Geist Sans |

O logo alwayson tem wordmark **branco** em fundo transparente — por isso a LP é
dark-first. Não existe versão clara do logo.

---

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export estático em out/
npm run lint
```

---

## Variáveis de ambiente

| Variável | Padrão (fallback no código) |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | `1651770943216322` |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | webhook de produção do alwaysonai-diagnostico-v2 |

Ambas têm fallback hardcoded, então a página funciona sem configuração. Na Vercel
configure as duas em **Settings → Environment Variables**.

---

## Deploy

- **GitHub**: `https://github.com/estevaodpa/alwaysonai-landingpage-2`
- **Vercel**: `https://landingpagealwaysonai2.vercel.app` · projeto `landingpage_alwaysonai_2`
- O site atual (`alwaysonai-landingpage`, o repo do alwayson.ai) **não é afetado**
  — continua no ar, intocado.

### Redeploy

```bash
git push                # a Vercel faz o build automático
# ou, manualmente:
vercel --prod --yes
```

> **Deployment Protection** está desativado neste projeto (`ssoProtection: null`).
> Se for reativado, a LP fica atrás de senha e o tráfego para de funcionar.
