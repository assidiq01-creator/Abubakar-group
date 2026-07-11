import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abubakar Group Ltd — Global Holdings Gateway";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#081522",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Gold border accent */}
        <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(212,175,55,0.3)", margin: "20px", borderRadius: "12px" }} />

        {/* EST tag */}
        <div style={{ fontSize: 14, letterSpacing: "0.3em", color: "rgba(212,175,55,0.6)", marginBottom: 24, textTransform: "uppercase" }}>
          EST. 2018
        </div>

        {/* Name */}
        <div style={{ fontSize: 80, fontWeight: 900, color: "#D4AF37", letterSpacing: "0.06em", lineHeight: 1 }}>
          ABUBAKAR
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.35em", marginTop: 8 }}>
          GROUP · LTD.
        </div>

        {/* Divider */}
        <div style={{ width: 80, height: 1, background: "rgba(212,175,55,0.4)", margin: "32px 0" }} />

        {/* Tagline */}
        <div style={{ fontSize: 20, color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em", textAlign: "center", maxWidth: 600 }}>
          One Vision. Multiple Solutions. Endless Possibilities.
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48, marginTop: 48 }}>
          {[["8+", "Subsidiaries"], ["5+", "Countries"], ["100+", "Partners"]].map(([n, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: 32, fontWeight: 700, color: "#D4AF37" }}>{n}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: "absolute", bottom: 40, fontSize: 14, color: "rgba(212,175,55,0.4)", letterSpacing: "0.1em" }}>
          abubakar-group.com
        </div>
      </div>
    ),
    { ...size }
  );
}
