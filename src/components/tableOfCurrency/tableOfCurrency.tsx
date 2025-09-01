import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';
import { type currencyExchange } from '../../types/interfaces';
import styles from './tableOfCurrency.module.css';

function formatTableRow(row: currencyExchange) {
  const keys = Object.keys(row) as (keyof typeof row)[];
  return (
    <>
      {keys.map((val, i) => (
        <TableCell key={i}>{row[val]}</TableCell>
      ))}
    </>
  );
}

function capitalizeFirstLetter(val: string) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

function formatTableHead(rows: currencyExchange[]) {
  return (
    <TableHead>
      <TableRow>
        {Object.keys(rows[0]).map((val, index) => (
          <TableCell key={index}>{capitalizeFirstLetter(val)}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function formatTable(rows: currencyExchange[]) {
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table size="small">
        {formatTableHead(rows)}
        <TableBody>
          {rows.map((val, index) => (
            <TableRow key={index}>{formatTableRow(val)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function TableOfCurrency({ data }: { data: currencyExchange[] }) {
  if (data.length === 0) {
    return <div>No data to display table</div>;
  }
  return <>{formatTable(data)}</>;
}
