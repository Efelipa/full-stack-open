import React, { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0);
  // Creo un useState con un array con valor 0 para todas las anecdotas
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  //Functions
  const randomAnecdote = () => {
    let randomNum = Math.floor((Math.random()*anecdotes.length));
    setSelected(randomNum)
  };
  const voteAnecdote = () => {
      const voteCopy = [...vote]
      voteCopy[selected] += 1;
      setVote(voteCopy)
  };
  const winnigVotation = vote.indexOf(Math.max(...vote))
 
  return (
    <div className='margin'>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button onClick={randomAnecdote} text={'random anecdote'}/>
      <Button onClick={voteAnecdote} text={'vote'}/>
      <h2>Anecdote with most votes</h2>
      <p>
        {anecdotes[winnigVotation]}
      </p>
      <p>
        wins with {vote[winnigVotation]} votes.  
      </p>
    </div>
  )
}


export default App;