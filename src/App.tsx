import { useQuery } from '@tanstack/react-query';
import styles from './App.module.css';
import ConvertorCurrency from './components/convertorCurrency/convertorCurrency';
import TableOfCurrency from './components/tableOfCurrency/tableOfCurrency';
import { type currencyExchange } from './types/interfaces';

export default function App() {
  const { data, isLoading, error } = useQuery<currencyExchange[]>({
    queryKey: ['backendQuery'],
    queryFn: () => {
      return fetch('/api/data/today').then((res) => res.json());
    },
  });

  return (
    <>
      <h1>CNB Exchange Rates</h1>
      <div className={styles.container}>
        <div className={styles.column}>
          {error && <p>Error while loading data from CNB, {error.message}</p>}
          {isLoading && <p>Loading data</p>}
          {data && <TableOfCurrency data={data} />}
        </div>
        <div className={styles.column}>{data && <ConvertorCurrency data={data} />}</div>
      </div>
    </>
  );
}
