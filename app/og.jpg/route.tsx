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
const PHOTO_SIZE = 200;

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
  // A square around the face (upper-middle of the 3:4 portrait), so head and shoulders fill the circle.
  const { width = 900, height = 1200 } = await sharp(source).metadata();
  const size = Math.round(width * 0.72);
  const resized = await sharp(source)
    .extract({ left: Math.round((width - size) / 2), top: Math.round(height * 0.12), width: size, height: size })
    .resize(PHOTO_SIZE * 2, PHOTO_SIZE * 2)
    .jpeg()
    .toBuffer();
  return `data:image/jpeg;base64,${resized.toString("base64")}`;
}

export async function GET() {
  const [regular, semibold, photo] = await Promise.all([plexSans(400), plexSans(600), photoDataUrl()]);
  const fonts = [regular, semibold].filter((font) => font !== undefined);

  const png = await new ImageResponse(
    (
      // Everything is centred: WhatsApp and some other apps show a small square cropped from the
      // middle (x 285–915), so the photo, name and role must sit inside that square.
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "48px 60px 40px",
          background: colors.background,
          fontFamily: fonts.length ? "IBM Plex Sans" : undefined,
        }}
      >
        <img
          src={photo}
          width={PHOTO_SIZE}
          height={PHOTO_SIZE}
          style={{ borderRadius: 999, border: `4px solid ${colors.border}`, objectFit: "cover" }}
          alt=""
        />
        <div
          style={{
            marginTop: 26,
            fontSize: 64,
            fontWeight: 600,
            color: colors.foreground,
            letterSpacing: -1.5,
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
        <div style={{ marginTop: 14, fontSize: 30, color: colors.muted }}>{site.role}</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 30 }}>
          {site.skills.map((skill) => (
            <div
              key={skill}
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 999,
                border: `1px solid ${colors.border}`,
                color: colors.chip,
                fontSize: 19,
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
          <div style={{ width: 28, height: 3, background: colors.link }} />
          <div style={{ fontSize: 24, color: colors.link, fontWeight: 600 }}>
            {new URL(site.url).hostname.replace(/^www\./, "")}
          </div>
          <div style={{ width: 28, height: 3, background: colors.link }} />
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
