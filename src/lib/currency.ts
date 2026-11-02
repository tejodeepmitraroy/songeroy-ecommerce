/**
 * Formats a numeric price into INR currency (e.g. ₹1,499.00 or ₹1,499)
 */
export function formatCurrency(
  amount: number,
  options?: { hideDecimalsIfZero?: boolean }
): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    amount = 0;
  }

  const hasDecimals = amount % 1 !== 0;
  const minimumFractionDigits = options?.hideDecimalsIfZero && !hasDecimals ? 0 : 2;
  const maximumFractionDigits = 2;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

