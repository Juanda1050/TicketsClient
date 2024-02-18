export interface Currency {
  code: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "MXN", name: "Peso mexicano (MXN)" },
  { code: "USD", name: "Dólar estadounidense (USD)" },
  { code: "EUR", name: "Euro (EUR)" },
  { code: "JPY", name: "Yen japonés (JPY)" },
  { code: "GBP", name: "Libra esterlina británica (GBP)" },
  { code: "CAD", name: "Dólar canadiense (CAD)" },
  { code: "CNY", name: "Yuan chino (CNY)" },
];

export default currencies;
