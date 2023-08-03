import React from 'react';

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