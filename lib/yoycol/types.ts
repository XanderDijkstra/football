export interface YoycolAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface YoycolLineItem {
  productSku: string;
  quantity: number;
  designUrl: string;
  personalisation?: string;
}

export interface YoycolOrderInput {
  externalId: string;
  customer: { email: string; name?: string };
  shipping: YoycolAddress;
  items: YoycolLineItem[];
}

export type YoycolOrderStatus =
  | "pending"
  | "in_production"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface YoycolOrder {
  id: string;
  externalId: string;
  status: YoycolOrderStatus;
  trackingUrl?: string;
}
