export default function skuGenerator() {
  const rawNumber = Math.floor(Math.random() * 90000000) + 10000000;
  const rawString = rawNumber.toString();
  const formattedSku = rawString.slice(0, 3) + "-" + rawString.slice(3, 5) + "-" + rawString.slice(5, 8);
  
  return formattedSku;
}
