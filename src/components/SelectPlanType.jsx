import React from 'react';
import {useNavigate} from 'react-router-dom';


const SelectPlanType = ({setPlanType}) => {
    const navigate = useNavigate();

    return (
        <div id='select-plan-type'>
            <h1>Choose A Plan</h1>
            <div id='choose-plan'>
                <button className='planBtns' onClick={() => {setPlanType('exercise'); navigate('/main/gameplan/planForm')}}>EXERCISE PLAN</button>
                <button className='planBtns' onClick={() => {setPlanType('diet'); navigate('/main/gameplan/planForm')}}>DIET PLAN</button>
            </div>
        </div>
    )

}

export default SelectPlanType;