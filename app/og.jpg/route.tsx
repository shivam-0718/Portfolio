import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

// The link-preview card (WhatsApp, LinkedIn, X, Slack…), rendered once at build time.
// Served as JPEG: the photo makes a PNG several times larger, and WhatsApp drops big previews.
export const dynamic = "force-static";

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_WIDTH = 420;

// Dark-theme tokens from globals.css, as hex (the image renderer doesn't read CSS variables).
const colors = {
  background: "#09090b",
  foreground: "#fafafa",
  muted: "#a1a1aa",
  chip: "#e4e4e7",
  border: "rgba(255,255,255,0.14)",
  link: "#3b82f6",
};

// IBM Plex Sans as TTF (the renderer can't read woff2). Falls back to the default font offline.
async function plexSans(weight: 400 | 600) {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@${weight}`).then((r) =>
      r.text(),
    );
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return undefined;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name: "IBM Plex Sans", data, weight, style: "normal" as const };
  } catch {
    return undefined;
  }
}

async function photoDataUrl() {
  const source = await readFile(join(process.cwd(), "public", site.photo));
  const resized = await sharp(source).resize(PHOTO_WIDTH, HEIGHT, { fit: "cover", position: "centre" }).jpeg().toBuffer();
  return `data:image/jpeg;base64,${resized.toString("base64")}`;
}

export async function GET() {
  const [regular, semibold, photo] = await Promise.all([plexSans(400), plexSans(600), photoDataUrl()]);
  const fonts = [regular, semibold].filter((font) => font !== undefined);

  const png = await new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: colors.background,
          fontFamily: fonts.length ? "IBM Plex Sans" : undefined,
        }}
      >
        <img src={photo} width={PHOTO_WIDTH} height={HEIGHT} style={{ objectFit: "cover" }} alt="" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "60px 64px",
            borderLeft: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: colors.foreground,
              color: colors.background,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            S.V.
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ fontSize: 68, fontWeight: 600, color: colors.foreground, letterSpacing: -1.5, lineHeight: 1.05 }}>
              {site.name}
            </div>
            <div style={{ marginTop: 14, fontSize: 30, color: colors.muted }}>{site.role}</div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 34 }}>
              {site.skills.map((skill) => (
                <div
                  key={skill}
                  style={{
                    display: "flex",
                    padding: "7px 14px",
                    border: `1px solid ${colors.border}`,
                    color: colors.chip,
                    fontSize: 21,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 44 }}>
            <div style={{ width: 28, height: 3, background: colors.link }} />
            <div style={{ fontSize: 24, color: colors.link, fontWeight: 600 }}>
              {new URL(site.url).hostname.replace(/^www\./, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT, fonts },
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png)).jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
