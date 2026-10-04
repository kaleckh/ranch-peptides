import { isCheckoutPreview, previewBuild, previewRequest } from "./checkout-preview";
export { isCheckoutPreview } from "./checkout-preview";
export const apiOrigin = process.env.NEXT_PUBLIC_CHECKOUT_API_URL || "";
export async function checkoutApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (isCheckoutPreview()) return previewRequest<T>(path, init);
  if (!apiOrigin) throw new Error("Checkout is not open yet. Please check back soon.");
  const response = await fetch(`${apiOrigin}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init.headers }, signal: AbortSignal.timeout(15000) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Checkout request failed.");
  return data as T;
}
const prefix = previewBuild ? "snp-demo" : "snp-checkout";
export const orderStorageKey = `${prefix}-order`;
export const attemptStorageKey = `${prefix}-attempt`;
export const historyStorageKey = `${prefix}-history`;
