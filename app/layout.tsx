import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "alwayson.ai — Atendimento inteligente para clínicas",
  description:
    "A alwayson.ai transforma o atendimento da sua clínica em uma operação inteligente que atende, qualifica, acompanha e agenda cada oportunidade — 24 horas por dia.",
  keywords: [
    "IA para clínicas",
    "atendimento automático WhatsApp",
    "agendamento automático",
    "secretária de IA",
    "alwayson.ai",
  ],
  openGraph: {
    title: "alwayson.ai — Atendimento inteligente para clínicas",
    description:
      "Atende, qualifica, acompanha e agenda cada oportunidade no WhatsApp da sua clínica — 24 horas por dia.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
