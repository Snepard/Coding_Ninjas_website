import { ImageResponse } from "@vercel/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const subtitle =
    searchParams.get("subtitle") ??
    "Coding Ninjas Chitkara • Coding Ninjas for builders";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#FF6D00",
            }}
          />
          <span style={{ letterSpacing: "0.6em", fontSize: "20px" }}>
            Coding Ninjas
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h1
            style={{
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.1,
              fontFamily: "Sora",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#D6D6D6",
              maxWidth: "840px",
            }}
          >
            {subtitle}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#FF6D00",
            fontSize: "22px",
          }}
        >
          <span>codingninjaschitkara.com</span>
          <span>Build. Mentor. Scale.</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
