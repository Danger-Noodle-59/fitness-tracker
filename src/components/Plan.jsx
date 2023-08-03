import React from 'react'

const Plan = ({gptResponse}) => {
  return (
    <>
      {console.log('gptResponse', gptResponse)}
      <div>{gptResponse}</div>
    </>
  )
}

export default Plan
