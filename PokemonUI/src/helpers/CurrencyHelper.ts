export function currencyHelper(isIrishUser: boolean, value: number) {
  const formatUK = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  const formatIreland = Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });

  return isIrishUser ? formatIreland.format(value) : formatUK.format(value);
}
