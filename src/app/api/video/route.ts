import { NextRequest, NextResponse } from "next/server";

const ARTIFACT_URL =
  "https://app.linkworld.ai/artifacts/b70a865c-c969-4399-9f88-2b81cdcf802c/file";
const TENANT_ID = "3bb74e66-0b1d-44ad-93d9-5572a3f3c1ea";

export async function GET(request: NextRequest) {
  const token =
    process.env.LINKWORLD_API_TOKEN ||
    process.env.LINKWORLD_TOKEN ||
    process.env.LW_API_KEY;

  const headers: Record<string, string> = {
    "X-Tenant-ID": TENANT_ID,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Forward Range header so video seeking works
  const range = request.headers.get("Range");
  if (range) headers["Range"] = range;

  try {
    const upstream = await fetch(ARTIFACT_URL, {
      headers,
      // Don't follow redirects — a redirect to /os?gate= means no auth available
      redirect: "manual",
    });

    // If we get a redirect to the auth gate or CDN, handle accordingly
    if (upstream.status === 307 || upstream.status === 302 || upstream.status === 301) {
      const location = upstream.headers.get("location") || "";
      // Auth gate redirect — video not available without valid session
      if (location.includes("/os?gate=")) {
        return NextResponse.json({ error: "Video unavailable" }, { status: 503 });
      }
      // CDN redirect (signed URL) — tell the client to go there directly
      return NextResponse.redirect(
        location.startsWith("http") ? location : `https://app.linkworld.ai${location}`,
        { status: 307 }
      );
    }

    if (!upstream.ok) {
      return NextResponse.json({ error: "Video not found" }, { status: upstream.status });
    }

    const resHeaders = new Headers();
    resHeaders.set("Content-Type", upstream.headers.get("Content-Type") || "video/mp4");
    resHeaders.set("Accept-Ranges", "bytes");
    resHeaders.set("Cache-Control", "public, max-age=3600");

    const contentLength = upstream.headers.get("Content-Length");
    if (contentLength) resHeaders.set("Content-Length", contentLength);

    const contentRange = upstream.headers.get("Content-Range");
    if (contentRange) resHeaders.set("Content-Range", contentRange);

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: resHeaders,
    });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
