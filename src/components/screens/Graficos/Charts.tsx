import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Chart from 'react-google-charts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
  }[];
}

export const Charts = () => {
  
  //#region BAR CHART
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: '',
      borderWidth: 1
    }]
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/pedidos/por-mes')
      .then(response => {
        const data = response.data;
        const labels = data.map((d: any) => `${d.year}-${d.month}`);
        const counts = data.map((d: any) => d.count);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Pedidos por Mes y Año',
            data: counts,
            backgroundColor: 'rgba(100, 145, 212, 0.6)',
            borderWidth: 1
          }]
        });
      });
  }, []);

  //#region PIE CHART
  const [chartDataPie, setChartDataPie] = useState<Array<[string, number]>>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/pedido_detalle/cantidad-pedido')
      .then(response => {
        const data = response.data.map((item:any) => [item.nombreInstrumento, item.cantidadPedidos] as [string, number]);
        setChartDataPie([['Instrumento', 'Cantidad de Pedidos'], ...data]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const optionsPie = {
    title: 'Cantidad de Pedidos por Instrumento',
    is3D: true,
  };

  return (
    <div>

      <h1 style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: '50px'}}>Grafico de Barra</h1>

      {chartData.labels.length > 0 && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }}
        />
      )}
      <h1 style={{justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: '50px', marginTop: '50px'}}>Grafico de Torta</h1>
      <Chart
      chartType="PieChart"
      data={chartDataPie}
      options={optionsPie}
      width={'100%'}
      height={'400px'}
    />
    </div>
  );
}

