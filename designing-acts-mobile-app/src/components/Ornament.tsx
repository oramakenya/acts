// African + Arabic decorative motifs for ACTS by ALIVE
// All shapes use currentColor so they pick up the text-gold/cream context.

import type { SVGProps } from "react";

// ─── Arabic-style 8-point star ──────────────────────────────
export function StarOctagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <polygon points="12,2 14,8 20,8 16,12 20,16 14,16 12,22 10,16 4,16 8,12 4,8 10,8" />
      <polygon
        points="12,5 13.2,9 17,9 14,12 17,15 13.2,15 12,19 10.8,15 7,15 10,12 7,9 10.8,9"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  );
}

// ─── Adinkrahene (concentric circles) ──────────────────────
export function Adinkrahene(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} {...props}>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

// ─── Adinkra-style "Gye Nyame" simplified glyph ─────────────
export function Diya(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} {...props}>
      <path d="M12 3c0 4-4 5-4 9a4 4 0 0 0 8 0c0-4-4-5-4-9Z" />
      <path d="M9 18h6" />
    </svg>
  );
}

// ─── Lozenge (Kente diamond) ────────────────────────────────
export function Lozenge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <polygon points="12,3 21,12 12,21 3,12" />
      <polygon points="12,7 17,12 12,17 7,12" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

// ─── Arabesque divider — used as section break ──────────────
export function ArabesqueDivider({
  className = "",
  width = 240,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-[var(--color-gold-3)] ${className}`}
      style={{ width }}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--color-gold-3)] to-[var(--color-gold-3)]" />
      <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90">
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
      <StarOctagram width={16} height={16} className="opacity-90" />
      <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90">
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--color-gold-3)] to-[var(--color-gold-3)]" />
    </div>
  );
}

// ─── Mud-cloth zigzag border row (use as top/bottom edge) ───
export function MudClothBorder({
  className = "",
  height = 10,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 240 12"
      preserveAspectRatio="none"
      className={className}
      style={{ height, width: "100%" }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7">
        {/* triangles */}
        {Array.from({ length: 24 }).map((_, i) => (
          <polygon
            key={i}
            points={`${i * 10 + 1},10 ${i * 10 + 5},2 ${i * 10 + 9},10`}
            fill="currentColor"
            opacity={i % 2 === 0 ? 0.9 : 0.4}
          />
        ))}
      </g>
    </svg>
  );
}

// ─── Kente strip (vertical-friendly horizontal band) ────────
export function KenteStrip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 18"
      preserveAspectRatio="none"
      className={className}
      style={{ width: "100%", height: 18 }}
    >
      <rect width="240" height="18" fill="var(--color-charcoal)" />
      {Array.from({ length: 20 }).map((_, i) => {
        const x = i * 12;
        const fills = ["#d4a017", "#7a5a14", "#f5d97a", "#8b1e1e", "#1a160f"];
        return (
          <g key={i}>
            <rect x={x} y="0" width="12" height="6" fill={fills[i % fills.length]} />
            <rect x={x + 2} y="6" width="8" height="6" fill={fills[(i + 2) % fills.length]} />
            <polygon
              points={`${x + 6},12 ${x + 11},18 ${x + 1},18`}
              fill={fills[(i + 1) % fills.length]}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Arabic mashrabiya geometric grid pattern (background) ──
export function MashrabiyaBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="mash" width="40" height="40" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="rgba(212,160,23,0.12)" strokeWidth="0.6">
            <polygon points="20,4 24,16 36,20 24,24 20,36 16,24 4,20 16,16" />
            <circle cx="20" cy="20" r="2.5" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mash)" />
    </svg>
  );
}

// ─── Adinkra dots scatter background ────────────────────────
export function AdinkraDotsBg({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="adots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1" fill="rgba(245,217,122,0.18)" />
          <circle cx="20" cy="20" r="1" fill="rgba(245,217,122,0.18)" />
          <circle cx="20" cy="6" r="0.6" fill="rgba(212,160,23,0.25)" />
          <circle cx="6" cy="20" r="0.6" fill="rgba(212,160,23,0.25)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adots)" />
    </svg>
  );
}

// ─── Corner flourish (Arabic-Mughal style) ──────────────────
export function CornerFlourish({
  className = "",
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
    >
      <path d="M2 2 C 14 2, 22 8, 22 22" />
      <path d="M2 8 C 10 8, 16 12, 18 22" />
      <circle cx="22" cy="22" r="3" />
      <circle cx="22" cy="22" r="6" opacity="0.5" />
      <path d="M22 16 L24 12 L22 8" opacity="0.7" />
    </svg>
  );
}

// ─── Geometric Islamic 12-point star tile (decorative card head) ──
export function IslamicTile({
  size = 80,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const pts: string[] = [];
  for (let i = 0; i < 24; i++) {
    const r = i % 2 === 0 ? 40 : 22;
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${50 + (r * Math.cos(a)) / 1}%,${50 + (r * Math.sin(a)) / 1}%`);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.9">
        <polygon points={pts.join(" ")} />
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.6" />
      </g>
    </svg>
  );
}

// ─── Section heading with decorative ornaments either side ──
export function OrnateHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-3)]">
          {eyebrow}
        </p>
      )}
      <div
        className={`mt-1 flex items-center gap-2 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <Lozenge width={10} height={10} className="text-[var(--color-gold-2)]" />
        <h2 className="font-display text-[18px] tracking-wide text-[var(--color-gold-1)]">
          {title}
        </h2>
        <Lozenge width={10} height={10} className="text-[var(--color-gold-2)]" />
      </div>
    </div>
  );
}
