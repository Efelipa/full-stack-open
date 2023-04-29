import React from 'react'
import ReactDOM from 'react-dom'
// Const-definitions
const Header = (prop) => {
  let titleHeader = prop.title.name
  return (
    <div>
      <h1>{titleHeader}</h1>
    </div>
  )
}
const Part = (prop) => {
  return (
    <div>
      <p>{prop.title}: {prop.exercises}</p>
    </div>
  )
}
const Content = (prop) => {
  const myProp = prop.parts;
  return (
    <div>
      <Part title={myProp[0].name} exercises={myProp[0].exercises}/>
      <Part title={myProp[1].name} exercises={myProp[1].exercises}/>
      <Part title={myProp[2].name} exercises={myProp[2].exercises}/>
    </div>
)};
const Total = (prop) => {
  const myParts = prop.parts;
  let counter = 0;
  myParts.forEach(e => {
    counter += e.exercises;
    return counter;
  });
  return (
    <div>
      <p>Total: {counter}</p>
    </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <>
      <Header title={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))