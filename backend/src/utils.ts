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
