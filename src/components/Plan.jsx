import React from 'react';
import {useNavigate} from 'react-router-dom';

const Plan = ({gptResponse, setGptResponse}) => {
  const navigate = useNavigate();
  const planner = gptResponse.split(/Day [1-9]:/g).map((el, i) => {
    return i === 0 ? (<div>{el}<br/></div>) : (<div><b>Day {i}</b>: {el}<br/></div>)
  })

  return (
    <div id='plan'>
      {console.log('gptResponse', gptResponse)}
      <header id='plan-title'>
        <h1>Custom Plan</h1>
        <button onClick={() => {setGptResponse(null); navigate('/main/gameplan')}}>Get New Plan</button>
      </header>
      <div>{planner}</div>
    </div>
  )
}

export default Plan
