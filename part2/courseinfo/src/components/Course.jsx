const Header = ({ course }) => <h3>{course.name}</h3>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} part={part}/>
          )
      })}
    </>
    )

}

const Total = ({ sum }) => {
    const total = sum.reduce((acumulator, current) => acumulator + current.exercises, 0)
    return (
        <b>
            Total: {total}
        </b>
    )
}
const Course = ({course}) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map(section => {
        return (
          <div key={section.id}>
            <Header course={section}/>
            <Content parts={section.parts}/>
            <Total sum={section.parts}/>
          </div>
        )
      })}
    </>
  )
}

export default Course;
