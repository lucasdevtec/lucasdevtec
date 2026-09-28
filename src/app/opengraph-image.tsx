import { ImageResponse } from "next/og";

export const alt = "Portfólio de Lucas Oliveira, desenvolvedor full stack";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#0c111d",
        color: "#f8fafc",
        padding: "56px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(251,191,36,0.18), transparent 28%)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 32,
          padding: "44px",
          background: "rgba(15,23,42,0.72)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #67e8f9, #fcd34d)",
              color: "#0c111d",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            LO
          </div>
          <div>PORTFÓLIO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 900 }}>
            Lucas Oliveira
          </div>
          <div style={{ fontSize: 34, color: "#cbd5e1", maxWidth: 920 }}>
            Desenvolvedor full stack com foco em Next.js, TypeScript,
            arquitetura de software e produtos web escaláveis.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 26,
            color: "#a5f3fc",
          }}
        >
          <div>Next.js</div>
          <div>•</div>
          <div>TypeScript</div>
          <div>•</div>
          <div>React</div>
          <div>•</div>
          <div>Node.js</div>
        </div>
      </div>
    </div>,
    size,
  );
}
