import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


export const BarChart = ({ users = 0, jobs = 0, applications = 0 }) => {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    const ctx = canvas.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Jobs', 'Applications'],
        datasets: [
          {
            label: 'Dashboard Stats',
            data: [users, jobs, applications],
            backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [users, jobs, applications]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};


// export const BarChart = ({users=1,jobs,applications}) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (!chartRef.current) return;

//     const ctx = chartRef.current.getContext('2d');

//     new Chart(ctx, {
//       type: 'doughnut', 
//       data: {
//         labels: ['Users', 'Jobs', 'Applications'],
//         datasets: [
//           {
//             label: 'Data',
//             data: [users, jobs, applications], // Replace with actual data
//             backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'], // Customize colors if needed
//           },
//         ],
//       },
//       options: {
        
//       },
//     });
//   }, []);

//   return <canvas ref={chartRef} ></canvas>;
// };
