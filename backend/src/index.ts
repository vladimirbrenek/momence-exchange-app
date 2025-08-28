import cors from 'cors';
import express from 'express';
import { convertDataFromCnb } from './utils';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.json({ message: 'Hello from backend!' });
});
app.get('/data/today', async (_req, res) => {
  console.log('running api/data/today');
  try {
    const fromCnb = await fetch(
      `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`,
    );
    const textFromCnb = await fromCnb.text();
    const convertedData = convertDataFromCnb(textFromCnb);
    res.json(convertedData);
  } catch {
    res.status(500).send('Cannot fetch data from CNB');
  }
  res.json();
});

app.listen(5000, () => console.log(`Backend running on port 5000`));
export default app;
