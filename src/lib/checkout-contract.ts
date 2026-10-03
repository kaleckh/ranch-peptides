import { z } from "zod";

export const checkoutRequest = z.object({
  items: z.array(z.object({ slug: z.string().max(80), quantity: z.number().int().min(1).max(100) })).min(1).max(8),
  method: z.enum(["card", "venmo"]),
  customer: z.object({
    name: z.string().trim().min(2).max(120), email: z.email().max(254),
    organization: z.string().trim().min(2).max(200),
    researchPurpose: z.string().trim().min(20).max(2000),
    address: z.string().trim().min(3).max(200), address2: z.string().trim().max(200),
    city: z.string().trim().min(2).max(100), state: z.string().regex(/^[A-Z]{2}$/),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  researchOnly: z.literal(true),
});
export type CheckoutRequest = z.infer<typeof checkoutRequest>;
export interface CheckoutConfig {
  enabled: boolean; methods: ("card" | "venmo")[]; shippingCents: number;
  states: string[]; supportEmail: string;
}
export interface OrderView {
  id: string; status: "awaiting_review" | "approved" | "rejected" | "paid";
  method: "card" | "venmo"; subtotalCents: number; shippingCents: number;
  totalCents: number; items: { slug: string; name: string; quantity: number; unitCents: number }[];
  venmoHandle?: string;
}
