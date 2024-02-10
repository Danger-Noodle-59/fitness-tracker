import React from 'react';
import CalcContainer from './CalcContainer.jsx';
import StatsOuterContainer from './StatsOuterContainer.jsx';




const MainContainer = ({ fieldsFilled,
    animate,
    displayCalculate,
    calculate,
    minutes, 
    setCalories, 
    setAnimate, 
    setDays, 
    setActivityLevel, 
    weight, 
    goal,
    gainWeight,
    activityLevel,
    dailyGainCalories, 
    negativeCalories }) => {
    return (
        <>
            <StatsOuterContainer setCalories={setCalories} 
                setAnimate={setAnimate}
                setDays={setDays}
                setActivityLevel={setActivityLevel}
                weight={weight}
                goal={goal}
                activityLevel={activityLevel}
                />
            <CalcContainer fieldsFilled={fieldsFilled}
                animate={animate}
                displayCalculate={displayCalculate}
                calculate={calculate}
                minutes={minutes}
                gainWeight={gainWeight}
                dailyGainCalories = {dailyGainCalories}
                negativeCalories={negativeCalories}
                />  
        </>
    )
}

export default MainContainer;