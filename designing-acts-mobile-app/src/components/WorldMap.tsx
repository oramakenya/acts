import type { ReactNode } from "react";

/**
 * Equirectangular projection constants.
 * viewBox is 360x180 (width x height) where:
 * - x: 0..360 maps to longitude -180..+180
 * - y: 0..180 maps to latitude +90..-90 (inverted for SVG)
 */
export const PROJECTION = {
  width: 360,
  height: 180,
  lonMin: -180,
  lonMax: 180,
  latMin: -90,
  latMax: 90,
} as const;

/**
 * Convert longitude/latitude to SVG coordinates (0..360, 0..180).
 * @param lon Longitude in degrees [-180, 180]
 * @param lat Latitude in degrees [-90, 90]
 */
export function lonLatToXY(lon: number, lat: number): { x: number; y: number } {
  const x = ((lon - PROJECTION.lonMin) / (PROJECTION.lonMax - PROJECTION.lonMin)) * PROJECTION.width;
  const y = ((PROJECTION.latMax - lat) / (PROJECTION.latMax - PROJECTION.latMin)) * PROJECTION.height;
  return { x, y };
}

/** Pin rendered on the map. */
export interface MapPin {
  id: string;
  lat: number;
  lon: number;
  label?: string;          // optional tooltip label
  tone?: "gold" | "rust" | "cream" | "blood";
  size?: number;           // base radius (default 1.8)
  pulse?: boolean;         // pulsing animation for unread/new
}

/** Tone → fill color mapping. */
const TONE_FILL: Record<NonNullable<MapPin["tone"]>, string> = {
  gold: "#f5d97a",
  rust: "#b85c2c",
  cream: "#f5e6c4",
  blood: "#8b1e1e",
};

/** Continents as SVG path data (equirectangular projection, 360x180 viewBox). */
const CONTINENTS = [
  "M 50,30 L 95,28 L 110,40 L 100,55 L 95,68 L 75,80 L 60,78 L 50,68 L 42,55 L 40,42 Z",
  "M 95,80 L 110,82 L 115,95 L 105,98 L 95,90 Z",
  "M 110,95 L 130,92 L 138,108 L 132,135 L 118,150 L 108,140 L 105,118 Z",
  "M 130,18 L 150,16 L 155,30 L 142,38 L 128,30 Z",
  "M 168,40 L 200,38 L 210,52 L 200,62 L 178,60 L 168,52 Z",
  "M 175,72 L 215,70 L 225,95 L 218,120 L 200,138 L 188,128 L 178,105 Z",
  "M 215,78 L 235,78 L 240,98 L 225,100 L 218,90 Z",
  "M 200,32 L 290,28 L 320,40 L 310,55 L 260,58 L 220,55 L 200,45 Z",
  "M 240,72 L 280,72 L 295,90 L 285,108 L 268,112 L 252,98 L 240,88 Z",
  "M 268,55 L 308,55 L 318,72 L 305,82 L 278,80 L 268,70 Z",
  "M 290,108 L 320,105 L 322,118 L 305,122 L 290,118 Z",
  "M 318,62 L 328,60 L 330,72 L 322,76 L 318,70 Z",
  "M 295,128 L 330,125 L 338,142 L 322,150 L 300,148 L 292,138 Z",
  "M 340,150 L 348,148 L 350,158 L 343,160 Z",
  "M 20,170 L 340,170 L 340,180 L 20,180 Z",
] as const;

interface WorldMapProps {
  /** Pins to render */
  pins: MapPin[];
  /** Called when a pin is clicked */
  onPinClick?: (id: string) => void;
  /** Currently selected pin ID */
  selectedId?: string | null;
  /** Map height in pixels (width is 2x height for 360x180 aspect) */
  height?: number;
  /** Show lat/lon grid lines */
  showGrid?: boolean;
  /** Optional overlay content (rendered in absolutely positioned div over map) */
  children?: ReactNode;
  /** Optional custom className for the wrapper */
  className?: string;
  /** Optional callback when map is ready (for external interactions) */
  onReady?: () => void;
}

/**
 * WorldMap — a lightweight SVG world map for rendering pins at lat/lon coordinates.
 *
 * Usage notes:
 * - The `children` prop renders in an absolutely positioned overlay DIV (not inside SVG).
 *   Position children with CSS (e.g., `absolute top-3 left-3`).
 * - Projection is equirectangular (360x180 viewBox).
 * - Pin tones map to: gold, rust, cream, blood.
 * - Pulse animation uses SMIL (widely supported in modern browsers).
 */
export function WorldMap({
  pins,
  onPinClick,
  selectedId,
  height = 220,
  showGrid = false,
  children,
  className = "",
  onReady,
}: WorldMapProps) {
  // Defer onReady to after mount
  if (onReady) {
    setTimeout(onReady, 0);
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-[#0a0807] ring-1 ring-[var(--color-line-strong)] ${className}`}
      style={{ height }}
      role="img"
      aria-label={`World map with ${pins.length} location${pins.length === 1 ? "" : "s"}`}
    >
      {/* Warm radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,160,23,0.18),transparent_55%)]"
        aria-hidden="true"
      />

      <svg
        viewBox={`0 0 ${PROJECTION.width} ${PROJECTION.height}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Arabic-style 8-point star pattern overlaid faintly */}
          <pattern id="mashOverlay" width="20" height="20" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(212,160,23,0.08)" strokeWidth="0.25">
              <polygon points="10,2 12,8 18,10 12,12 10,18 8,12 2,10 8,8" />
            </g>
          </pattern>
        </defs>

        {/* Base pattern */}
        <rect width={PROJECTION.width} height={PROJECTION.height} fill="url(#mashOverlay)" />

        {/* Lat/Lon grid */}
        {showGrid && (
          <g stroke="rgba(212,160,23,0.10)" strokeWidth="0.3">
            {[30, 60, 90, 120, 150].map((y) => (
              <line key={`h-${y}`} x1="0" y1={y} x2={PROJECTION.width} y2={y} />
            ))}
            {[60, 120, 180, 240, 300].map((x) => (
              <line key={`v-${x}`} x1={x} y1="0" x2={x} y2={PROJECTION.height} />
            ))}
            <line
              x1="0"
              y1={PROJECTION.height / 2}
              x2={PROJECTION.width}
              y2={PROJECTION.height / 2}
              stroke="rgba(212,160,23,0.22)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
          </g>
        )}

        {/* Continents */}
        <g
          fill="rgba(212,160,23,0.22)"
          stroke="rgba(245,217,122,0.55)"
          strokeWidth="0.5"
          strokeLinejoin="round"
        >
          {CONTINENTS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Pins */}
        <g>
          {pins.map((p) => {
            const { x, y } = lonLatToXY(p.lon, p.lat);
            const fill = TONE_FILL[p.tone ?? "gold"];
            const r = p.size ?? 1.8;
            const isSelected = p.id === selectedId;
            const cursor = onPinClick ? "pointer" : "default";

            return (
              <g
                key={p.id}
                style={{ cursor }}
                onClick={() => onPinClick?.(p.id)}
                transform={`translate(${x}, ${y})`}
              >
                {/* Pulse ring (SMIL animation - widely supported in modern browsers) */}
                {p.pulse && (
                  <circle r={r * 3} fill={fill} opacity={0.22}>
                    <animate
                      attributeName="r"
                      values={`${r};${r * 4};${r}`}
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0;0.4"
                      dur="2.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Pin dot */}
                <circle
                  r={isSelected ? r * 1.7 : r}
                  fill={fill}
                  stroke="#0a0807"
                  strokeWidth={isSelected ? 0.6 : 0.3}
                />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Overlay children (positioned absolutely over the map) */}
      {children && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative h-full w-full pointer-events-auto">{children}</div>
        </div>
      )}
    </div>
  );
}