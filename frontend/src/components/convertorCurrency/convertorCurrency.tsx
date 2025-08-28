import { FormControl, InputAdornment, NativeSelect, OutlinedInput, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './convertorCurrency.module.css';
import { type currencyExchange } from '../../types/interfaces';

function changeAmount(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFunc: (val: string) => void,
) {
  if (e.target.value === '') {
    setFunc('0');
    return;
  }
  const amount = /^0*(\d+(?:\.|,)?\d*)$/.exec(e.target.value); // removing left 0, the array just to remove
  if (amount !== null) {
    setFunc(amount[1]);
  }
}

function getAllCurrencyList(data: currencyExchange[]) {
  return data.map((val) => val.code);
}

function calculateCurrency(
  data: currencyExchange[],
  amountSelected: number,
  selectedCurrency: string,
) {
  const curr = data.find((val) => val.code === selectedCurrency);
  if (curr === undefined || amountSelected === 0) {
    return 0 + ` ${selectedCurrency}`;
  }
  return ((curr.amount / curr.rate) * amountSelected).toFixed(6) + ` ${selectedCurrency}`;
}

export default function ConvertorCurrency({ data }: { data: currencyExchange[] }) {
  const [amoutCzk, setAmmountCzk] = useState('0'); // needs to pass as string. As value 234. is still valid value. Because user didn't finish typing
  const [valueOpt, setValueOpt] = useState(data[0].code);

  return (
    <>
      <div className={styles.form}>
        <FormControl>
          <OutlinedInput
            onChange={(e) => changeAmount(e, setAmmountCzk)}
            value={amoutCzk}
            startAdornment={<InputAdornment position="start">CZK</InputAdornment>}
          />
        </FormControl>
        <FormControl>
          <NativeSelect
            defaultValue={valueOpt}
            onChange={(e) => {
              setValueOpt(e.target.value);
            }}
          >
            {getAllCurrencyList(data).map((val) => (
              <option key={val}>{val}</option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
      <TextField
        variant="standard"
        disabled={true}
        value={calculateCurrency(data, Number.parseFloat(amoutCzk), valueOpt)}
      />
    </>
  );
}
