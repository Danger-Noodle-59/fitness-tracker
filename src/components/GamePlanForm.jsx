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

  const [loading, setLoading] = useState(false);
  
  console.log('formValues', formValues)
  const navigate = useNavigate();

  const fetchFitnessPlan = async () => {
    setLoading(true);
    const message = `Act as a fitness instructor. I am a ${age} years old ${sex} who weighs ${weight} pounds and want to weigh ${goal} pounds in ${days ? days : 90} days. My current activity level on a scale of  1 to 5 is ${activityLevel}. My preferred forms of exercise are: ${Object.keys(formValues).map(key => key === 'range' ? '' : ` ${key}`)} and my level of fitness expertise is ${formValues.range} on a scale of 1 to 10. Recommend me a weekly fitness routine to reach my weight goal. Format your response in the format: "Day 1:", "Day 2:", etc.`
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
    setGptResponse(data.message.content);
    setLoading(false);
    navigate('/main/gameplan');

  }

  const fetchDietPlan = async () => {
    setLoading(true);
    const message = `Act as a professional fitness instructor.
I am ${age} year old ${sex}. I weight ${weight} pounds and want to weight ${goal}. give me a sample dietary plan for 2 days that I can follow long term without having nutritional deficiencies. Show me the calories and macronutrients associated with each plan. I am allergic to: ${Object.keys(dietValues).map(key => ` ${key}`)}
 Combine the calories and micronutrients and put it in as the last bullet point, but don't indent the bullet points, for each meal. 
Make sure I'm eating enough to have energy, but also burn fat. Format your response in the format: "Day 1:", "Day 2:", etc.`;
    const response = await fetch (`/gpt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"message": message})
    })
    const data = await response.json();
    console.log('data', data);
    setGptResponse(data.message.content);
    setLoading(false);
    navigate('/main/gameplan');
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
    <div id ='gameplan-container'> 
      {planType === 'exercise' ? <h1 className='gameplan-title'> Please Check the Exercises that you Enjoy! </h1> :  <h1 className='gameplan-title'> Please let us know about your dietary issues! </h1> } 
      {planType === 'exercise' ?
      <div> 
        <div class = 'gameplan-form'> 
        {Object.keys(formValues).filter(el => el !== 'range').map((key, i) => (
            (<div key={i} className="checkbox-container">
              
                <input 
                  type="checkbox"
                  name={`${key}`}
                  checked={formValues[`key`]}
                  onChange={handleInputChange}
                />
              <label> {key}</label>
            </div>)
        ))
      }
      </div>
        <div id='fitness-expertise'>
          <h2>Rate your fitness expertise on a scale of 1 to 10.</h2>
          <label id="expertise-title" htmlFor="expertise">Expertise</label>
          <input type="range" id="expertise" name="expertise" min="1" max="10" value={formValues.range} onChange={handleChangeLevel}></input><span>{formValues.range}</span>
        </div>
        <button className='fetch-plan' onClick={fetchFitnessPlan}>SUBMIT</button>
        {loading && <div>loading......</div>}
      </div> : planType === 'diet' ? 
      <div>
        <h1>Do you have any Allergies?</h1>
        <div class = 'gameplan-form'> 
        {Object.keys(dietValues).map((key, i) => (
        (<div key={i} className="checkbox-container">
            <input
              type="checkbox"
              name ={`${key}`}
              checked = {dietValues[`key`]}
              onChange={handleInputChangeDiet}
            />
          <label>{key}</label>
          </div>)
        ))}
        </div>
        <button className='fetch-plan' onClick={fetchDietPlan}>SUBMIT</button>
        {loading && <div>loading......</div>}
      </div> : null}
      {console.log(planType, 'planType')}
    </div>
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