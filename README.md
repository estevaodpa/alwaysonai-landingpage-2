# alwayson.ai — Landing Page 2

Landing page de tráfego para a alwayson.ai. O visitante chega do anúncio, passa
por um **diagnóstico guiado** dentro da própria página e sai pelo **WhatsApp**.

- **Formato, ritmo, geometria e mecanismos** modelados em
  [botconversa.com.br](https://botconversa.com.br/)
- **Conteúdo, identidade, logo, provas e produto** vindos do site alwayson.ai atual
  (`D:\Estêvão\projetos_opencode`)

---

## Estrutura da página (14 seções, ~14.400px em 1440px)

| # | Seção | Anchor |
|---|---|---|
| 1 | Nav em vidro flutuante | — |
| 2 | Hero — badges, headline, grade em perspectiva, pills, mockup do celular | `#top` |
| 3 | Marquee de clientes | — |
| 4 | Recursos — mosaico 4×2 com card de borda azul | `#recursos` |
| 5 | Como funciona em 3 passos | `#como-funciona` |
| 6 | Nichos (5 clínicas + print real) | `#nichos` |
| 7 | Painel / kanban + tabela de contatos | `#painel` |
| 8 | Integrações + fluxo de automação | `#integracoes` |
| 9 | Comparação "Hoje vs. Com a alwayson.ai" | `#comparacao` |
| 10 | Entregue pronto | `#pronto` |
| 11 | Vídeo de demonstração | `#demo` |
| 12 | **Diagnóstico** (7 perguntas → contato → WhatsApp) | `#diagnostico` |
| 13 | Para empresas (foto + CTA especialista) | — |
| 14 | Curva azul → Provas sociais → FAQ → Rodapé | `#depoimentos` · `#faq` |

O bloco de **diagnóstico ocupa o slot onde o botconversa tem o Pricing**: mesma
posição na narrativa, mesmo peso visual.

---

## Diagnóstico (o núcleo da conversão)

- **7 perguntas** copiadas de `app/lib/diagnostic.ts` (verbatim do site alwayson.ai
  atual), incluindo a pergunta condicional de canais de marketing.
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

Tokens em `app/globals.css` + camada de componentes em `app/ui.css`.
Detalhe completo da geometria e dos mecanismos em [`DESIGN.md`](./DESIGN.md).

| Token | Valor |
|---|---|
| Fundo claro / escuro | `#f7faff` · `#18191c` |
| Texto | `#18191c` · `#2f3238` · `#6d6f74` |
| Gradiente da marca | `#0050c8` → `#00a8ff` |
| Botão | `#1e9cff` → `#0050c8`, raio 8px |
| Card | raio 16px, `#18191c`, borda gradiente de 1px |
| Tipografia | Geist Sans |

O logo alwayson tem wordmark branco no arquivo oficial. O lockup da LP2 é
**símbolo PNG + wordmark em texto**, com duas variantes (`dark` para fundo claro,
`light` para fundo escuro) — assim o mesmo logo funciona nos dois temas.

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
