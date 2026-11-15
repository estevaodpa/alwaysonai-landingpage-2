import Link from "next/link";
import { Logo } from "../ui/Logo";
import { brand, footer } from "../../lib/copy";

export function Footer() {
  return (
    <footer className="relative bg-[var(--bg-white)] px-5 md:px-8 pt-12 pb-10">
      <div className="lp-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-10 lg:gap-16">
          {/* Marca */}
          <div>
            <Logo variant="dark" height={32} />
            <div
              className="mt-6 w-16 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,80,200,0.3), transparent)",
              }}
            />
            <p
              className="mt-5 text-sm leading-relaxed"
              style={{ color: "var(--ink-3)", maxWidth: 320 }}
            >
              {footer.description}
            </p>
          </div>

          {/* Colunas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3
                  className="lp-label"
                  style={{ color: "var(--ink-3)" }}
                >
                  {col.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm transition-opacity duration-150 hover:opacity-60"
                        style={{ color: "var(--ink-2)" }}
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
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(24,25,28,0.08)" }}
        >
          <p className="text-xs" style={{ color: "var(--ink-3)" }}>
            © {new Date().getFullYear()} {brand.name}
          </p>
          <p className="text-xs" style={{ color: "var(--ink-3)" }}>
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
