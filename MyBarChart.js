import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const MyBarChart = ({ data }) => {

  // Cleanup the chart when the component is unmounted
  useEffect(() => {
    return () => {
      // Cleanup if necessary, e.g. clearing timers or chart instances
      // This step is not required for react-chartjs-2 but is good practice
      if (data?.chartInstance) {
        data.chartInstance.destroy(); // If you manage the chart instance manually
      }
    };
  }, [data]);

  return (
    <div style={{ position: 'relative', height: '400px' }}>
      <Bar
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default MyBarChart;
