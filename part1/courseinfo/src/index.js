import ReactDOM from 'react-dom'

// Components
const Title = (props) => {
  const {course} = props;
  return <h1>{course}</h1>
}
const Content = (props) => {
  return (
    <div>
      <part>
        {props.part1}
        <p>{props.exercises1}</p>
      </part>
      <part>
        {props.part2}
        <p>{props.exercises2}</p>
      </part>
      <part>
        {props.part3}
        <p>{props.exercises3}</p>
      </part>
    </div>
  )
}
const Footer = (props) => {
  const result = props.exercises1 +  props.exercises2 + props.exercises3;
  return <div>Number of exercises {result}</div>
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Title course={course}/>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Footer exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))