import Image from "next/image";

/**
 * Lockup do alwayson.ai.
 *
 * O arquivo de logo oficial tem wordmark branco (fundo transparente), então
 * não existe versão escura para usar sobre fundos claros. Aqui o símbolo
 * vem do PNG e o wordmark é texto — assim o mesmo lockup funciona nos dois
 * temas, sem precisar de arte nova.
 *
 * variant="dark"  → wordmark escuro, para fundo claro
 * variant="light" → wordmark claro, para fundo escuro
 */
export function Logo({
  variant = "dark",
  height = 30,
  className = "",
}: {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}) {
  const wordColor = variant === "dark" ? "#18191c" : "#f5f6f7";
  const aiColor = variant === "dark" ? "#0050c8" : "#00a8ff";

  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logos/alwayson-logo-symbol-crop.png"
        alt=""
        width={200}
        height={151}
        className="shrink-0"
        style={{ height: `${height}px`, width: "auto" }}
        priority
      />
      <span
        className="font-bold tracking-[-0.03em] leading-none whitespace-nowrap"
        style={{ fontSize: `${height * 0.82}px`, color: wordColor }}
      >
        alwayson<span style={{ color: aiColor }}>.ai</span>
      </span>
    </span>
  );
}
