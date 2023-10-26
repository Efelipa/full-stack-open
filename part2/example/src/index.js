import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import Note from './components/Note';
import './index.css'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

const Form = ({handleSubmit, newNote, handleNoteChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="note">
        New Note
        <input type="text" dealue={newNote} onChange={handleNoteChange}/>
      </label>
      <input type="submit" value="Send"/>
    </form>
  )
}

const App = (props) => {
  const [notes, setNote] = useState(props.notes);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  
  const addNotes = (e) => {
    e.preventDefault();
    const newObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
    setNote(notes.concat(newObject));
    setNewNote('')  
  }
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  }

  return (
    <div className='m-1'>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)} className={showAll ? 'skyblue' : 'green'}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note}/>)}
      </ul>
      <div>
        <Form handleSubmit={addNotes} newNote={newNote} handleNoteChange={handleNoteChange}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App notes={notes} />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
