export const apiOrigin = process.env.NEXT_PUBLIC_CHECKOUT_API_URL || "";
export async function checkoutApi<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!apiOrigin) throw new Error("Checkout is not open yet. Please check back soon.");
  const response = await fetch(`${apiOrigin}${path}`, { ...init, headers: { "Content-Type": "application/json", ...init.headers }, signal: AbortSignal.timeout(15000) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Checkout request failed.");
  return data as T;
}
export const orderStorageKey = "snp-checkout-order";
export const attemptStorageKey = "snp-checkout-attempt";
export const historyStorageKey = "snp-checkout-history";
