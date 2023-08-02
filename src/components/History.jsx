import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

// const chartLabels = ['January', 'February', 'March', 'April', 'May'];
// const chartData = [10, 20, 15, 25, 30];

const data = {
  user: 'V', // userID
  sex: { type: String, required: true },
  targetWeight: { type: Number, required: true },
  height: Number,
  data: [ 
    { date: '7/20', weight: 150 },
    { date: '7/21', weight: 149 },
    { date: '7/22', weight: 152 },
    { date: '7/23', weight: 151 },
    { date: '7/24', weight: 154 },
    { date: '7/25', weight: 153 },
    { date: '7/26', weight: 156 },
    { date: '7/27', weight: 155 },
    { date: '7/28', weight: 158 },
    { date: '7/29', weight: 157 } 
  ]
};

const chartLabels = getData(data, 'date');
const chartData = getData(data, 'weight');

function getData(collectionName, stringForKeyName) {
  return collectionName.data.map( x => x[stringForKeyName])
};

// const lineChartConfig = {
//   type: 'line',
//   data: {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: 'Line Chart Example',
//         data: chartData,
//         borderColor: 'rgba(75, 192, 192, 1)', // Line color
//         borderWidth: 2, // Line width
//         fill: false, // To fill the area under the line, set to true
//       },
//     ],
//   },
//   options: {
//     // Optional chart configuration and styling options can be added here
//   },
// };

// const lineChartCanvas = document.getElementById('lineChart').getContext('2d');
// new Chart(lineChartCanvas, lineChartConfig);


const Test = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const myChart = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'Your Progress',
                    data: chartData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)' ,
                    borderWidth: 1
                }]
            },
        });
        // Cleanup function to destroy the chart to avoid memory leaks when component unmounts
        return () => {
            myChart.destroy();
        };
    }, []);
    return (
        <canvas ref={canvasRef} />
    );
}
export default Test;