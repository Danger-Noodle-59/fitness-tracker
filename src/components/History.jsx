import React,  {useState,  useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';


const Test = () => {
  const canvasRef = useRef(null);
  const [weightAndDate, setWeightAndDate] = useState({ date: '', weight: '' });
  const [data, setData] = useState([]);
  const[logUpdate, setLogUpdate] = useState(false);
  

  const handleWeightInputChange = (e) => {
    setWeightAndDate((prevWeightAndDate) => ({
      ...prevWeightAndDate,
      weight: e.target.value,
    }));
  };

  const handleDateInputChange = (e) => {
    console.log('date', e.target.value)
    setWeightAndDate((prevWeightAndDate) => ({
      ...prevWeightAndDate,
      date: e.target.value,
    }));
  };

  useEffect(() => {
    // Create the Chart.js instance when the component mounts
    const myChart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Weight vs. Time',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        }],
      },
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, []); // Empty dependency array to ensure this runs only once during initial render


  // Displays historical data
  useEffect(() => {
    // Fetch data from the server and update the chart when weightAndDate changes
    fetch('/stats')
      .then(response => response.json())
      .then(response => {
        console.log(response.data);
        const chartLabels = response.data.map(x => {
          const date = new Date(x.date);
          // console.log(date);
          // console.log(date instanceof Date);
          const dateFromDB = Number(date.getDate()) + 1
          return 1 + date.getMonth() + '/' + dateFromDB;
        });
        console.log('chartLabels', chartLabels)
        const newData = []
        for(let i = 0; i < response.data.length; i++) {
          newData.push({date: new Date(response.data[i].date), weight: response.data[i].weight});
          console.log(newData[i]);
        }
        setData([...newData]);
        const chartData = response.data.map(x => x.weight);
        
        // Update chart data and labels
        const myChart = Chart.getChart(canvasRef.current);
        myChart.data.labels = chartLabels;
        myChart.data.datasets[0].data = chartData;
        myChart.update();
      });
  }, [logUpdate]);

  

  function someFunc () {
    // weightAndDate 
    const weight = weightAndDate.weight;
    const date = new Date(weightAndDate.date);
    console.log('v - ', date, new Date(date) )
    let replaced = false;
    const newArray = [];
    console.log('zzzzz', data, 'date2', date)
    for (let i = 0; i < data.length; i++) {
      //if we found a match
      let temp = new Date(data[i].date);
      console.log(temp);
      console.log('93', temp instanceof Date);
      if (temp.getTime()  === date.getTime() ) {
        replaced = true;
        newArray.push({date: temp, weight: weight}) 
      } else {
        newArray.push({date: temp, weight: data[i].weight})
      }
      setLogUpdate(!logUpdate);
    }
    if (!replaced) newArray.push({date: date, weight: weight});
    newArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setData([...newArray]);
    console.log('newArray', newArray)
    fetch('/logs', {
      method: 'PATCH',
      headers: {  'Content-Type': 'application/json' },
      body: JSON.stringify({data: newArray})
    })
    // .then(data => console.log('weightHistory input successfully processed', data ))
    .catch(err => console.log(err));
  };

  return (
    <div>
      <canvas id='canvas' ref={canvasRef} />
      <div className='weight-date-boxes'>
        <input
          id='weight-input'
          type='number'
          placeholder='Weight...'
          value={weightAndDate.weight}
          onChange={handleWeightInputChange}
        />
        <input
          id='date-input'
          type='date'
          placeholder='Date...'
          value={weightAndDate.date}
          onChange={handleDateInputChange}
        />
        <button className='weight-date-input' id='update-weight' onClick={someFunc}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default Test;

