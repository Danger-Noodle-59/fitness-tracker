import React,  {useState,  useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';


const Test = () => {
  const canvasRef = useRef(null);
  const [weightAndDate, setWeightAndDate] = useState({ date: '', weight: '' });

  const handleWeightInputChange = (e) => {
    setWeightAndDate((prevWeightAndDate) => ({
      ...prevWeightAndDate,
      weight: e.target.value,
    }));
  };

  const handleDateInputChange = (e) => {
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
          label: 'Your Progress',
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

  useEffect(() => {
    // Fetch data from the server and update the chart when weightAndDate changes
    fetch('/stats')
      .then(response => response.json())
      .then(response => {
        const chartLabels = response.data.map(x => {
          const date = new Date(x.date);
          return date.getMonth() + '/' + date.getDate();
        });
        const chartData = response.data.map(x => x.weight);

        // Update chart data and labels
        const myChart = Chart.getChart(canvasRef.current);
        myChart.data.labels = chartLabels;
        myChart.data.datasets[0].data = chartData;
        myChart.update();
      });
  }, []);

  useEffect(() => {
    // Add event listener for the "ADD" button and cleanup function to remove the event listener when the component unmounts
    const addButton = document.querySelector("#update-weight");
    addButton.addEventListener('click', () => {
      // create post request to DB
      fetch('/stats', {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify({data: weightAndDate})
      })
      .then(data => console.log('weightHistory input successfully processed', data ))
      .catch(err => console.log(err))
      // console.log('Weight:', weightAndDate.weight);
      // console.log('Date:', weightAndDate.date);
    });

    return () => {
      addButton.removeEventListener('click', () => {
        console.log('Weight:', weightAndDate.weight);
        console.log('Date:', weightAndDate.date);
      });
      // setWeightAndDate({ date: '', weight: '' });
    };
  }, [weightAndDate]);

  return (
    <div>
      <canvas ref={canvasRef} />
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
        <button className='weight-date-input' id='update-weight' >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Test;


//----------


  // useEffect(() => {
  //   // Your data submission logic here...
  //   const handleSubmit = () => {
  //     // Perform data submission, for example, an API call
  //     console.log('Submitted Data:', weightAndDate);

  //     // After submission, clear the input fields by setting state variables to empty strings
  //     setWeightAndDate({ date: '', weight: '' });
  //   };


// let chartLabels = [];
// let chartData = [];

// const Test = () => {
//     const canvasRef = useRef(null);
//     useEffect(() => {
//       fetch('/stats')
//         .then(response => response.json())
//         .then(response => {
//           chartLabels = response.data.map(x => {
//             const date = new Date(x.date);
//             return date.getMonth() + '/' + date.getDate()
//           });
//           chartData = response.data.map(x => x.weight);

//           console.log(response.data);

//           const myChart = new Chart(canvasRef.current, {
//             type: 'line',
//             data: {
//                 labels: chartLabels,
//                 datasets: [{
//                     label: 'Your Progress',
//                     data: chartData,
//                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                     borderColor: 'rgba(255, 159, 64, 1)' ,
//                     borderWidth: 1
//                 }]
//             },
//         });
//         // Cleanup function to destroy the chart to avoid memory leaks when component unmounts
//         return () => {
//             myChart.destroy();
//         };
//       }, []);
//     })

//     const [weightAndDate, setWeightAndDate] = useState({ date: '', weight: '' });

//     const handleWeightInputChange = (e) => {
//       setWeightAndDate((prevWeightAndDate) => ({
//         ...prevWeightAndDate,
//         weight: e.target.value,
//       }));
//     };
  
//     const handleDateInputChange = (e) => {
//       setWeightAndDate((prevWeightAndDate) => ({
//         ...prevWeightAndDate,
//         date: e.target.value,
//       }));
//     };
  
//     useEffect(() => {
//       const addButton = document.querySelector("#update-weight");
//       addButton.addEventListener('click', () => {
//         console.log('Weight:', weightAndDate.weight);
//         console.log('Date:', weightAndDate.date);
//       });
//     }, [weightAndDate]);


//     return (
//       <div>

//         <canvas ref={canvasRef} />
//         {/* <div className='weight-date-boxes'> */}
//         {/* <input  id='weight-input' type="number" placeholder='Weight... '></input>
//         <input  id='date-input' type="date" placeholder='Date... '></input>
//         <button className='weight-date-input' id='update-weight' >ADD</button> */}
//         <div className='weight-date-boxes'>
//         <input
//           id='weight-input'
//           type='number'
//           placeholder='Weight...'
//           value={weightAndDate.weight}
//           onChange={handleWeightInputChange}
//         />
//         <input
//           id='date-input'
//           type='date'
//           placeholder='Date...'
//           value={weightAndDate.date}
//           onChange={handleDateInputChange}
//         />
//         <button className='weight-date-input' id='update-weight'>
//           ADD
//         </button>

//         </div>
        
//       </div>
       
//     );
// }
// export default Test;
//------------




      // function updateValue(e) {
      //   // return e.target.value;
      // }
      // return () => {
      //   if (weightInput) {
      //     weightInput.removeEventListener("input", updateValue);
      //   }
  
      //   if (dateInput) {
      //     dateInput.removeEventListener("input", updateValue);
      //   }
      // };
 
    // document.addEventListener('click', displayData)    

    //---------------
    // useEffect(() => {
      
    //   const weightInput = document.querySelector("#weight-input");
    //   const dateInput = document.querySelector("#date-input");
    //   const addButton = document.querySelector("#update-weight");

    //   weightInput.addEventListener("input", updateValue)
    //   // dateInput.addEventListener("input", updateValue)
    //   addButton.addEventListener('click', () => {
    //     const weightAndDate = {};
    //     dateInput.addEventListener("input", (e) => weightAndDate.date = e.target.value);
    //     weightInput.addEventListener("input", (e) => weightAndDate.weight = e.target.value);
    //     console.log(weightAndDate.weight)
    //     // window.alert('data added - ', weightAndDate.date)
    //   });
    // }, []);
    //----------------
