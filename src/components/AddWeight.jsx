import React,  {useState,  useEffect, useRef} from 'react';

const addWieght = () => {
 
      

  return (
    <div>
      <div className='weight-date-boxes'>
      <input  className='weight-input' type="text" placeholder='Weight... '></input>
      <input  className='date-input' type="text" placeholder='Date... '></input>
      <button className='weight-date-input' id='update-weight' >ADD</button>
      </div>
      
    </div>
     
  );
}
export default addWieght;