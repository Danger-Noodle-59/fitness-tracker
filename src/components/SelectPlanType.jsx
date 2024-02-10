import React from 'react';
import {useNavigate} from 'react-router-dom';


const SelectPlanType = ({setPlanType}) => {
    const navigate = useNavigate();

    return (
        <div id='select-plan-type'>
            <h1 id='plan-header'>Choose A Plan</h1>
            <div id='plan-images-container'>
                <img className = 'plan-images' src="https://i2-prod.dailystar.co.uk/incoming/article15591240.ece/ALTERNATES/s1200b/2_RONNIE-COLEMAN-BODYBUILDER-839493.jpg"/>
                <img  className = 'plan-images' src="https://www.usatoday.com/gcdn/presto/2023/01/03/USAT/dba26ab9-095c-4e83-8962-150ae33e479c-GettyImages-1390699821.jpg"/>
            </div>
            <div id='choose-plan'>
                <button className='planBtns' onClick={() => {setPlanType('exercise'); navigate('/main/gameplan/planForm')}}>EXERCISE PLAN</button>
                <button className='planBtns' onClick={() => {setPlanType('diet'); navigate('/main/gameplan/planForm')}}>DIET PLAN</button>
            </div>
        </div>
    )

}

export default SelectPlanType;