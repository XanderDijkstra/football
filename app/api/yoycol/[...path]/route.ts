// Server-side passthrough to the Yoycol REST API.
// Credentials live in process.env and never reach the client bundle.
// In stub mode (no YOYCOL_API_KEY), every call returns a stubbed JSON response
// so the rest of the app can still develop against this surface.

import { NextResponse } from "next/server";

const BASE_URL = process.env.YOYCOL_API_BASE_URL ?? "https://api.yoycol.com/v1";
const API_KEY = process.env.YOYCOL_API_KEY;

async function proxy(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const search = new URL(req.url).search;
  const target = `${BASE_URL}/${path.join("/")}${search}`;

  if (!API_KEY) {
    return NextResponse.json(
      {
        stub: true,
        message:
          "YOYCOL_API_KEY is not configured. This route is acting as a stub.",
        targetUrl: target,
        method: req.method,
      },
      { status: 200 }
    );
  }

  const body = ["GET", "HEAD"].includes(req.method) ? undefined : await req.text();

  const res = await fetch(target, {
    method: req.method,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": req.headers.get("content-type") ?? "application/json",
    },
    body,
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
