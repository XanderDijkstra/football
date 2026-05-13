import type { YoycolOrder, YoycolOrderInput } from "./types";

// Thin wrapper around the Yoycol API. The rest of the app talks to this client,
// never to Yoycol directly — so we can swap to Printful / Gelato / Prodigi
// without touching the builder or checkout.

const BASE_URL = process.env.YOYCOL_API_BASE_URL ?? "https://api.yoycol.com/v1";
const API_KEY = process.env.YOYCOL_API_KEY;

class YoycolError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "YoycolError";
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_KEY) {
    throw new YoycolError(
      "YOYCOL_API_KEY is not set. Operating in stub mode — set the env var to enable real fulfilment."
    );
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new YoycolError(
      `Yoycol ${init?.method ?? "GET"} ${path} → ${res.status} ${text.slice(0, 200)}`,
      res.status
    );
  }
  return (await res.json()) as T;
}

export const yoycol = {
  isConfigured(): boolean {
    return Boolean(API_KEY);
  },
  async createOrder(input: YoycolOrderInput): Promise<YoycolOrder> {
    if (!API_KEY) {
      return {
        id: `stub_${input.externalId}`,
        externalId: input.externalId,
        status: "pending",
      };
    }
    return call<YoycolOrder>("/orders", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  async getOrder(id: string): Promise<YoycolOrder> {
    if (!API_KEY) {
      return { id, externalId: id, status: "pending" };
    }
    return call<YoycolOrder>(`/orders/${encodeURIComponent(id)}`);
  },
};

export { YoycolError };
