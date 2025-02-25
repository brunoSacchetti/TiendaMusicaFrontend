import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export const BarChart2 = () => {
  const [chartData, setChartData] = useState([['Mes y Año', 'Cantidad de Pedidos']]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/pedidos/por-mes')
      .then(response => {
        const data = response.data;
        const formattedData = data.map((d: any) => [`${d.year}-${d.month}`, d.count]);
        setChartData([['Mes y Año', 'Cantidad de Pedidos por Mes y Año'], ...formattedData]);
      });
  }, []);

  return (
    <div>
      {chartData.length > 1 && (
        <Chart
          chartType="Bar"
          data={chartData}
          options={{
            chart: {
              title: 'Pedidos por Mes y Año',
            },
            
          }}
          width="100%"
          height="400px"
        />
      )}
    </div>
  );
}

