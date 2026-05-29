import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top right, rgba(56,189,248,0.26), transparent 32%), linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 372,
            height: 372,
            borderRadius: 92,
            alignItems: "center",
            justifyContent: "center",
            border: "18px solid #d6e8ff",
            background: "#ffffff",
            boxShadow: "0 28px 90px rgba(11,31,77,0.16)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 78,
              bottom: 70,
              width: 128,
              height: 128,
              borderRadius: "0 0 0 128px",
              background: "#ff6b00",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B1F4D",
              fontSize: 168,
              fontWeight: 800,
              letterSpacing: "-0.08em",
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              zIndex: 1,
            }}
          >
            MP
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
