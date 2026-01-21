/**
 * Generates a unique order ID in the format ORDER-YYMMDD-XXXX
 * @returns A unique order ID string
 */
export function generateOrderId(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10_000)
    .toString()
    .padStart(4, "0");
  return `ORDER-${yy}${mm}${dd}-${random}`;
}
