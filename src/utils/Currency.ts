export interface Currency {
  code: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "USD", name: "Dólar estadounidense" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Yen japonés" },
  { code: "GBP", name: "Libra esterlina británica" },
  { code: "AUD", name: "Dólar australiano" },
  { code: "CAD", name: "Dólar canadiense" },
  { code: "CHF", name: "Franco suizo" },
  { code: "CNY", name: "Yuan chino" },
  { code: "SEK", name: "Corona sueca" },
  { code: "NZD", name: "Dólar neozelandés" },
  { code: "KRW", name: "Won surcoreano" },
  { code: "SGD", name: "Dólar de Singapur" },
  { code: "NOK", name: "Corona noruega" },
  { code: "MXN", name: "Peso mexicano" },
  { code: "INR", name: "Rupia india" },
  { code: "BRL", name: "Real brasileño" },
  { code: "RUB", name: "Rublo ruso" },
  { code: "ZAR", name: "Rand sudafricano" },
  { code: "HKD", name: "Dólar de Hong Kong" },
  { code: "TRY", name: "Lira turca" },
];

export default currencies;
