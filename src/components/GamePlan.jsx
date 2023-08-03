import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { GamePlanForm } from './GamePlanForm';
import Plan from './Plan';
import SelectPlanType from './SelectPlanType';

const GamePlan = ({age, sex, weight, goal, days, activityLevel}) => {
    const [planType, setPlanType] = useState('');
    const [gptResponse, setGptResponse] = useState(null);

    return (
        <Routes>
            <Route path={'/'} element={<SelectPlanType setPlanType={setPlanType}/>} />
            <Route path={'/planForm'} element={<GamePlanForm
                planType={planType} 
                setGptResponse={setGptResponse}
                age={age}
                sex={sex}
                weight={weight}
                goal={goal}
                days={days}
                activityLevel={activityLevel} />} />
            <Route path={'/plan'} element={<Plan gptResponse={gptResponse} />} />
            {/* <Route path={'/diet-plan'} element={<DietPlan />} /> */}
        </Routes>
        
    )

}


export default GamePlan;