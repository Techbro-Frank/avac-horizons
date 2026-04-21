/* ────────────────────────────────────────────────
   AvacLogo — uses the actual logo.png brand image.
   Renders the real logo without any text below it.
   The logo image itself contains the full brand mark.
──────────────────────────────────────────────── */
interface AvacLogoProps {
  iconSize?: number;   // controls logo image height (px)
  showText?: boolean;  // kept for API compatibility — ignored (logo has built-in text)
  dark?: boolean;      // kept for API compatibility
  className?: string;
}

export function AvacLogo({
  iconSize = 48,
  className = "",
}: AvacLogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="AVAC Horizons — General Trading FZCO"
        style={{ height: iconSize, width: "auto", display: "block", objectFit: "contain" }}
        draggable={false}
      />
    </span>
  );
}
