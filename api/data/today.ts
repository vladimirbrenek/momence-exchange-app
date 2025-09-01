export interface currencyExchange {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export function convertDataFromCnb(data: string) {
  return data.split(/\n/).reduce<currencyExchange[]>((acc, val, index) => {
    if (val.length === 0 || index <= 1) {
      return acc;
    }
    const dV = val.match(/([^|]+)/g);
    if (dV === null) {
      return acc;
    }
    acc.push({
      country: dV[0],
      currency: dV[1],
      amount: Number.parseInt(dV[2]),
      code: dV[3],
      rate: Number.parseFloat(dV[4]),
    });
    return acc;
  }, []);
}

export default async function GET() {
  try {
    const fromCnb = await fetch(
      `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`,
    );
    const textFromCnb = await fromCnb.text();
    const convertedData = convertDataFromCnb(textFromCnb);
    return Response.json(convertedData);
  } catch {
    return new Response('Cannot fetch data from CNB', { status: 500 });
  }
}
