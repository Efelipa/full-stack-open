import React, { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [filteredPersons, setFilteredPersons] = useState([...persons]);

    const handleNoteChange = (e) => {
        setNewName(e.target.value);        
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    const createNewPerson = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };
        const existingPerson = persons.find(person => person.name === newPerson.name);
        const existingNumber = persons.find(person => person.number === newPerson.number);
        if (newPerson.name === '' || newPerson.number === '') {
            alert('You need a name and number to proceed');
        } else if (existingPerson) {
            alert(`${newPerson.name} is already added to the phonebook.`)
        } else if (existingNumber) {
            alert(`${newPerson.number} is already added to the phonebook.`)
        } else {
            setPersons([...persons, newPerson]);
            setNewName('');
            setNewNumber('');
            setFilteredPersons([...persons, newPerson]);
        }
    }

    const searchPerson = (e) => {
        const filterValue = e.target.value;
        setSearchValue(filterValue);
        if (filterValue === '') {
            setFilteredPersons([...persons]);
        } else {
            setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase())));
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchPerson={searchPerson} searchValue={searchValue}/>
            <h3>Add a new</h3>
            <PersonForm handleNumberChange={handleNumberChange} handleNoteChange={handleNoteChange} createNewPerson={createNewPerson} newName={newName} newNumber={newNumber}/>
            
            <h2>Numbers</h2>
            <Persons filteredPersons={filteredPersons}/>
        </div>
    )
}

export default App;
