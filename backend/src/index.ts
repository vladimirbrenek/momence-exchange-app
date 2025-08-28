import cors from 'cors';
import express from 'express';
import { convertDataFromCnb } from './utils';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend!' });
});
app.get('/api/data/today', async (_req, res) => {
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

export default app;

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
