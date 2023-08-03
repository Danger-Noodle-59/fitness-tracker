import React from 'react';


const CalcContainer = ({fieldsFilled,
    animate,
    displayCalculate,
    calculate,
    minutes,
    gainWeight,
    negativeCalories}) => {    
      // caluclate is a string, need to convert it to a number; however, if you don't remove the comma all the attempts to convert it to a number will fail giving NAN .
      const gainWeightCalories = parseInt(calculate.replace(/,/g, ''))
  return (
    <div className='calc-container'>
          {fieldsFilled ? <div className='conditional-container-1'>
            <div className='burn-box'>
              {gainWeight && !negativeCalories ? <p>You need to eat</p> : !negativeCalories ? <p>You need to burn</p> : <p>You can eat</p>}
              {<p id='number' className={animate ? 'tracking-in-expand burn-calories' : ''} >{displayCalculate ? calculate : <br />}</p>}
              {gainWeight && !negativeCalories ? <p>additional</p> : gainWeight ? <p>less</p> : negativeCalories ? <p>more</p> : null}
              <p>calories per day {negativeCalories ? <span>and still</span> : <span>to</span>} reach your target weight</p>
            </div>
            <div className='exercise-box'>
              
              {gainWeight ? <p>That's roughly {<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? Math.ceil(gainWeightCalories/146) : <br />}</p>} McDonalds IceCreams, or</p> : <p>That's roughly {<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[0] : <br />}</p>} minutes of daily running</p> }
              {gainWeight ? <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? Math.ceil(gainWeightCalories/215) : <br />}</p>} servings of Chicken Adobo, or</p> :  <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[1] : <br />}</p>} minutes of walking, or</p> }
              {gainWeight ? <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? Math.ceil(gainWeightCalories/400): <br />}</p>} servings of Costco Hot Dogs</p> : <p>{<p id='number' className={animate ? 'tracking-in-expand' : ''}>{displayCalculate ? minutes[2] : <br />}</p>} minutes of bicycling!</p>}
            </div> 
              
          </div> :
            <div>Please input your data!</div>}
    </div>
  )
}

export default CalcContainer