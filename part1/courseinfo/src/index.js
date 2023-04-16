import React from 'react'
import ReactDOM from 'react-dom'
// Const-definitions
const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

const Header = (prop) => {
  return (
    <div>
      <h1>{prop.title}</h1>
    </div>
  )
}
const Part = (parts) => {
  return (
    <div>
      <p>{parts.title} {parts.exercise}</p>
    </div>
  )
}
const Content = () => {
  return (
    <div>
      <Part title={part1} exercise={exercises1}/>
      <Part title={part2} exercise={exercises2}/>
      <Part title={part3} exercise={exercises3}/>
    </div>
  )
}
const Total = (prop) => {
  return (
    <div>
      <p>Total: {prop.total}</p>
    </div>
  )
}
const App = () => {
  

  return (
    <>
      <Header title={course}/>
      <Content />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))