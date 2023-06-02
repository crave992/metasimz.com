"use client"
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockValues {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

const stockValues: StockValues = {
  '1. open': 100.0.toString(),
  '2. high': 110.0.toString(),
  '3. low': 90.0.toString(),
  '4. close': 105.0.toString(),
  '5. volume': 1000000.0.toString(),
};

const Stocks: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=YOUR_API_KEY'
      );
      const stockData: StockData[] = Object.entries(result.data['Time Series (Daily)']).map(
        ([date, values]) => ({
          date,
          open: parseFloat((values as StockValues)['1. open']),
          high: parseFloat((values as StockValues)['2. high']),
          low: parseFloat((values as StockValues)['3. low']),
          close: parseFloat((values as StockValues)['4. close']),
          volume: parseFloat((values as StockValues)['5. volume']),
        })
      );
      setData(stockData);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Open',
        data: data.map((d) => d.open),
        fill: false,
        borderColor: '#05a0fa',
      },
      {
        label: 'High',
        data: data.map((d) => d.high),
        fill: false,
        borderColor: '#634b4b',
      },
      {
        label: 'Low',
        data: data.map((d) => d.low),
        fill: false,
        borderColor: '#fa0505',
      },
      {
        label: 'Close',
        data: data.map((d) => d.close),
        fill: false,
        borderColor: '#05a0fa',
      },
      {
        label: 'Volume',
        data: data.map((d) => d.volume),
        fill: false,
        borderColor: '#0dfa05',
      },
    ],
  };

  return (
    <Line data={chartData} />
  );
};

export default Stocks;