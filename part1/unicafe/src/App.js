import { useState } from 'react';
import './App.css';


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const Statics = (props) => {
  let allFeedback = props.feedback.good + props.feedback.neutral + props.feedback.bad;
  let average = allFeedback / Object.keys(props.feedback).length;
  let positiveFeedback = Math.floor((props.feedback.good / allFeedback) * 100);

  if (allFeedback > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StaticLine text={'good'} value={props.feedback.good} />
            <StaticLine text={'neutral'} value={props.feedback.neutral} />
            <StaticLine text={'bad'} value={props.feedback.bad} />
            <StaticLine text={'all feedbacks'} value={allFeedback} />
            <StaticLine text={'average'} value={average} />
            <StaticLine text={'positive'} value={`${positiveFeedback}%`} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <p>
        No feedback given
      </p>
    </div>
  )
}
const StaticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

function App() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0, 
  })

  // Buttons
  const goodFeedback = () => {
    const newFeedback = {
      ...feedback,
      good: feedback.good + 1,
    }
    setFeedback(newFeedback);
  }
  const neutralFeedback = () => {
    const newFeedback = {
      ...feedback,
      neutral: feedback.neutral + 1,
    }
    setFeedback(newFeedback);
  }
  const badFeedback = () => {
    const newFeedback = {
      ...feedback,
      bad: feedback.bad + 1,
    }
    setFeedback(newFeedback);
  }

  return (
    <div className='margin'>
      <h2>Give feedback</h2>
      <div>
        <Button onClick={goodFeedback} text={'good'}/>
        <Button onClick={neutralFeedback} text={'neutral'}/>
        <Button onClick={badFeedback} text={'bad'}/>
      </div>
      <h2>Statics</h2>
      <div>
        <Statics feedback={feedback}/>
      </div>
    </div>
  );
}

export default App;
