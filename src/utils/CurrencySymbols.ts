import currencies, { Currency } from "./Currency";

export const getCurrencySymbol = (currencyCode: string): string => {
  const selectedCurrency = currencies.find(
    (currency: Currency) => currency.code === currencyCode
  );
  if (selectedCurrency) {
    switch (selectedCurrency.code) {
      case "USD":
        return "$";
      case "EUR":
        return "€";
      case "JPY":
        return "¥";
      case "GBP":
        return "£";
      default:
        return "$";
    }
  }
  return "";
};
