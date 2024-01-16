import { useState, useEffect } from 'react'
import './App.css'
/* Components imports */ 
import { Filter } from './components/Filter';
import { ContactForm } from './components/ContactForm';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';
/* Utilities to get, create and delete contacts */
import util from './services/contact';


const App = () => {
    // Setting the hooks
        // Array of persons
        const [ persons, setPersons ] = useState([])
        // useState with a initial string value, used to search for persons by his names
        const [ newName, setNewName ] = useState('');
        // useState with a initial string value, used to search for persons by phone number
        const [newNumber, setNewNumber ] = useState('');
        // string used to filter persons by name or number
        const [filter, setFilter] = useState('');
        // message
        const [message, setMessage] = useState('');
        const [loading, setLoading] = useState();
        const [messageStyle, setMessageStyle] = useState('')
    
    // State Effects
    useEffect(() => {
        util.getContacts()
            .then(initialContacts => {
                setPersons(initialContacts);
            })
    }, []);


    // Handle Clicks
    const handleChange = (handler) => (e) => {
        handler(e.target.value);
    }

    /* Manipulate objects functions */
        const addPerson = (e) => {
            e.preventDefault();
            const createPerson = {
                name: newName,
                number: newNumber,
        }
        const personExists = persons.find(person => person.name === createPerson.name);

        if(createPerson.name === '' || createPerson.number === '') {
            alert ('You must specify a name and a number to create a contact.')
        } else if(personExists) {
            window.confirm(`**${newName}** is already added to the phone book, replace the old number with a new one?`)
            util.updateContact(personExists.id, createPerson)
            .then(returnedNote => {
                setPersons(persons.map(person => person.id !== personExists.id ? person : returnedNote));
                setNewName('');
                setNewNumber('');
                setLoading(true);
                setMessage(`${returnedNote.name} updated`);
                setMessageStyle('success');
                setInterval(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(err => {
                setLoading(true);
                setMessageStyle(`error`);
                setMessage(`${newName} was already deleted from the server.`);
                setInterval(() => {
                    setLoading(false);
                }, 3000);
                setPersons(persons.filter(person => person.id !== personExists.id));
            });
        } else {
            let personsCopy = [...persons];
            util
            .createContact(createPerson)
            .then(returnedNote => {
                setPersons(personsCopy.concat(returnedNote));
                setNewName('');
                setNewNumber('');
                setLoading(true);
                setMessage(`Added ${returnedNote.name}`);
                setMessageStyle('success');
                setInterval(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(err => {
                setLoading(true);
                setMessageStyle('error');
                setMessageStyle(err);
                setInterval(() => {
                    setLoading(false);
                }, 2000);
            });
        }
    }

    const filterPerson = (handler) => (e) => {
        handler(e.target.value);
    }

    // Filter methods
    let results = [];
    if(!filter) {
        results = persons;
    } else {
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    results = filterPersons;
    }

    const deletePerson = (id, name) => {
        if(window.confirm(`Are you sure you want to delete ${name} contact?`)) {
            util.deleteContact(id)
            .then(returnedNote => {
                setPersons(persons.filter(person => person.id !== id));
            })
        }
    }



    return (
        <main>
            <h2>Phonebook</h2>
            {(loading && <Notification message={message} style={messageStyle}/>)}
            <Filter filterPerson={filterPerson} setFilter={setFilter} filter={filter}/>
            <h3>Add a new contact</h3>
            <ContactForm addPerson={addPerson} handleChange={handleChange} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
            <h3>Numbers</h3>
            <Persons results={results} handleClick={deletePerson}/>
        </main>
    )
}

export default App
