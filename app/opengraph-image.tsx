import { ImageResponse } from "next/og";

export const alt = "VELNARO — Software, AI Automation & AI Search Visibility";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background: "#F4F2EC",
          color: "#171B1F",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -180,
            width: 650,
            height: 650,
            borderRadius: 325,
            background: "linear-gradient(135deg, rgba(23,107,101,0.20), rgba(217,231,226,0.12))",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 18,
              background: "#171B1F",
              color: "#F4F2EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 31,
              fontWeight: 800,
              letterSpacing: -3,
            }}
          >
            VN
          </div>
          <div style={{ fontSize: 29, fontWeight: 800, letterSpacing: 5 }}>VELNARO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900, zIndex: 1 }}>
          <div style={{ color: "#176B65", fontSize: 18, fontWeight: 700, letterSpacing: 5 }}>
            SOFTWARE · AI AUTOMATION · AI SEARCH VISIBILITY
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>
            Build with purpose.
            <br />
            Engineer for what&apos;s next.
          </div>
          <div style={{ fontSize: 25, lineHeight: 1.4, color: "#5D666C", maxWidth: 800 }}>
            Digital products and intelligent systems built around real business problems.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 17, color: "#5D666C", letterSpacing: 2 }}>VELNARO.AGENCY</div>
          <div style={{ width: 150, height: 4, borderRadius: 2, background: "#176B65", display: "flex" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
