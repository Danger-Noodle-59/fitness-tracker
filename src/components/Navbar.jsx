import React, {useState} from 'react';

const getDate = () => {
  let today = new Date();
  let options = {year: 'numeric', month: 'long', day: 'numeric'};
  let formattedDate = today.toLocaleDateString('en-US', options);
  return formattedDate;
};

const Navbar = ({setUpdateWeight, updateWeight, handleEnterPress, setWeightInput, setUpdateWeightGoal, updateWeightGoal, handleEnterPressGoal, setGoalInput, firstName, lastName, logout }) => {


    return (
        <div className='nav-bar'>
        <div className='nav-bar-component'>{getDate()}</div>
        <button className='nav-bar-component' id='update-weight-button' onClick={() => setUpdateWeight(!updateWeight)}>UPDATE WEIGHT</button>
        {updateWeight && <input id='weight-input' className='nav-bar-component' type="text" onKeyDown={handleEnterPress} onChange={(e) => { setWeightInput(e.target.value); }} placeholder='Current Weight... '></input>}


        <button className='nav-bar-component' id='update-goal-button' onClick={() => setUpdateWeightGoal(!updateWeightGoal)}>UPDATE GOAL</button>
        {updateWeightGoal && <input id='goal-input' className='nav-bar-component' type="text" onKeyDown={handleEnterPressGoal} onChange={(e) => { setGoalInput(e.target.value); }} placeholder='Current Goal... '></input>}
        <div className='nav-bar-component'>{`${firstName} ${lastName}`}</div>
        <button className='nav-bar-component' id='log-out-button' onClick={logout}>Log Out</button>
      </div>
    )
}







export default Navbar;