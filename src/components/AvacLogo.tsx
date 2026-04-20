/* ────────────────────────────────────────────────
   AvacLogo — reusable brand logo component
   • iconSize controls the icon square size (px)
   • showText  shows/hides the wordmark
   • dark      switches text to white (for dark bgs)
──────────────────────────────────────────────── */
interface AvacLogoProps {
  iconSize?: number;
  showText?: boolean;
  dark?: boolean;      // true = white text (navbar/footer), false = navy text
  className?: string;
}

/* The geometric icon SVG — matches the brand emblem exactly */
function AvacIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect width="60" height="60" fill="#E1261C" />
      {/* Row 1 */}
      <polygon points="0,0 20,0 0,20"     fill="white" />
      <polygon points="20,0 40,0 30,20"   fill="white" />
      <polygon points="40,0 60,0 60,20"   fill="white" />
      {/* Row 2 */}
      <polygon points="0,20 20,30 0,40"   fill="white" />
      <polygon points="30,20 40,30 30,40 20,30" fill="white" />
      <polygon points="60,20 60,40 40,30" fill="white" />
      {/* Row 3 */}
      <polygon points="0,40 0,60 20,60"   fill="white" />
      <polygon points="20,60 40,60 30,40" fill="white" />
      <polygon points="40,60 60,60 60,40" fill="white" />
    </svg>
  );
}

export function AvacLogo({
  iconSize = 36,
  showText = true,
  dark = true,
  className = "",
}: AvacLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AvacIcon size={iconSize} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-tight"
            style={{
              color: dark ? "#FFFFFF" : "#0B1F2A",
              fontSize: Math.round(iconSize * 0.42),
              letterSpacing: "-0.01em",
            }}
          >
            AVAC Horizons
          </span>
          <span
            className="font-medium uppercase"
            style={{
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(11,31,42,0.45)",
              fontSize: Math.round(iconSize * 0.225),
              letterSpacing: "0.12em",
              marginTop: 1,
            }}
          >
            General Trading FZCO
          </span>
        </span>
      )}
    </span>
  );
}
