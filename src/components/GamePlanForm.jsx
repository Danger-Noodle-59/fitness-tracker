import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const GamePlanForm = ({planType, setGptResponse, age, sex, weight, goal, days, activityLevel}) => {
  const [formValues, setFormValues] = useState({
    run: false,
    walk: false,
    bike: false,
    swim: false,
    hike: false,
    yoga: false,
    weight_training: false,
    calisthenics: false,
    range: 5,
  })

  const [dietValues, setDietValues] = useState({
    Moluscs: false,
    Eggs: false,
    Fish: false,
    Nut: false,
    Gluten: false,
    Lupin: false,
    Milk: false
  })
  
  console.log('formValues', formValues)
  const navigate = useNavigate();

  const fetchFitnessPlan = async () => {
    const message = `Act as a fitness instructor. I am a ${age} years old ${sex} who weighs ${weight} pounds and want to weigh ${goal} pounds in ${days ? days : 90} days. My current activity level on a scale of  1 to 5 is ${activityLevel}. My preferred forms of exercise are: ${Object.keys(formValues).map(key => key === 'range' ? '' : ` ${key}`)} and my level of fitness expertise is ${formValues.range} on a scale of 1 to 10. Recommend me a weekly fitness routine to reach my weight goal.`
    console.log('message', message)

    const response = await fetch('/gpt', {
      method: 'POST',
      headers: {
                'Content-Type': 'application/json',
      },
      body: JSON.stringify({"message": message})
    })
    const data = await response.json();
    console.log('data', data);
    setGptResponse(data);
    setGptResponse('LSKJDF:LDKSFJDS:KLF')
    navigate('/main/gameplan/plan');

  }

  const fetchDietPlan = async () => {
    const message = `Act as a professional fitness instructor.
I am ${age} year old ${sex}. I weight ${weight} pounds and want to weight ${goal}. give me a sample dietary plan for one day and the calories and macronutrients associated with each plan.
 Combine the calories and micronutrients and put it in as the last bullet point, but don't indent the bullet points, for each meal. 
Make sure I'm eating enough to have energy, but also burn fat.`;
    const response = await fetch (`/gpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"message": message})
    })
    const data = await response.json();
    console.log('data', data);
    setGptResponse(data);
    navigate('/main/gameplan/plan');
  }

  const handleChangeLevel = (e) => {
    setFormValues((prev) => ({...prev, range: e.target.value}))
  }

  const handleInputChangeDiet = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setDietValues((prev) => ({...prev, [name]: value}))
  }

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormValues((prev) => ({...prev, [name]: value}))
  }

  return (
    <>
      {planType === 'exercise' ?
      <div>
        {Object.keys(formValues).filter(el => el !== 'range').map((key, i) => (
            (<div key={i}>
              <label>
                {`${key}`}
                <input 
                  type="checkbox"
                  name={`${key}`}
                  checked={formValues[`key`]}
                  onChange={handleInputChange}
                />
              </label>
            </div>)
        ))
      }
        <div id='fitness-expertise'>
          <h2>Rate your fitness expertise on a scale of 1 to 10.</h2>
          <label for="expertise">Expertise</label>
          <input type="range" id="expertise" name="expertise" min="1" max="10" value={formValues.range} onChange={handleChangeLevel}></input><span>{formValues.range}</span>
        </div>
        <button className='fetch-plan' onClick={fetchFitnessPlan}>SUBMIT</button>
      </div> : planType === 'diet' ? 
      <div>
        <h1>Do you have any Allergies?</h1>
        {Object.keys(dietValues).map((key, i) => (
        (<div key={i}>
          <label>
            {`${key}`}
            <input
              type="checkbox"
              name ={`${key}`}
              checked = {dietValues[`key`]}
              onChange={handleInputChangeDiet}
            />
          </label>
          </div>)
        ))}
        <button className='fetch-plan' onClick={fetchDietPlan}>SUBMIT</button>
      </div> : null}
      {console.log(planType, 'planType')}
    </>
  )
}

//types of exercise: run, walk, swim, bike, hike, yoga, weight training, calisthenics

//Act as a fitness instructor. I am a __ year old *gender* who weighs *pounds* pounds and want to lose *pounds* pounds in *days* days. My current activity level on a scale of  1 to 5 is *activityLevel*. I *strongly or null* prefer *cardio or weight training* over *cardio or weight training* and my level of fitness expertise is *expertise* on a scale of 1 to 10. Recommend me a weekly fitness routine to reach my weight goal.

// Act as a professional fitness instructor. I am *age* year old *gender* and weight *pounds* and want to weigh *pounds*. give me a fitness plan for PPL

/* 
Act as a professional fitness instructor.
I am 20 year old male. I weight 200 pounds and want to weight 160. give me a sample dietary plan for one day and the calories and macronutrients associated with each plan. 
Combine the calories and micronutrients and put it in as the last bullet point, but don't indent the bullet points, for each meal. My activity level is 3/5. Make sure I'm eating enough to have energy, but also burn fat.
*/