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

import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }

  try {
    const fromCnb = await fetch(
      `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`,
    );
    const textFromCnb = await fromCnb.text();
    const convertedData = convertDataFromCnb(textFromCnb);
    res.status(200).json(convertedData);
  } catch {
    res.status(500).send('Cannot fetch data from CNB');
  }
}
