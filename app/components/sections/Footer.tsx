"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, footer } from "../../lib/copy";

export function Footer() {
  return (
    <footer
      className="relative border-t px-6 py-14 lg:py-16"
      style={{
        borderColor: "var(--border-subtle)",
        background: "var(--bg-base)",
      }}
    >
      <div className="lp-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-10 lg:gap-16">
          {/* Marca */}
          <div>
            <Image
              src="/logos/alwayson-logo-text-transparent-crop.png"
              alt="alwayson.ai"
              width={1094}
              height={158}
              style={{ height: "34px", width: "auto" }}
            />
            <div
              className="mt-6 w-16 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(77,195,255,0.25), transparent)",
              }}
            />
            <p
              className="mt-5 text-sm"
              style={{ color: "var(--text-tertiary)", maxWidth: 320 }}
            >
              {footer.description}
            </p>
          </div>

          {/* Colunas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {col.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
