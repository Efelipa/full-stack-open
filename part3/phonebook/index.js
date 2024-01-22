const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const static = require('static');
const PORT = 3001;

// Morgan configuration token
morgan.token('post', (request, response) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body);
    } else if (request.method === 'GET') {
        return '';
    }
});
// Middleware
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())



let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
]

// Utilities
const maxId = () => {
    const id = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0;
    return Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - id) + id + 1);
}

// 3.1
app.get('/api/persons', (request, response) => {
    response.json(persons);
});
//3.2
app.get('/info', (request, response) => {
    let people = persons.length;
    let date = new Date();
    response.send(`
    <p>Phonebook has info for ${people} people</p>
    <p>${date}</p>
    `);
});
//3.3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const personToFind = persons.find(person => person.id === id);
    response.json(personToFind);
});
//3.4. 
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(404).end();
});
// 3.5
app.post('/api/persons', (request, response) => {
    const bodyRequest = request.body;
    if(bodyRequest.name === undefined || bodyRequest.number === undefined) {
        return response.status(400).json({error: 'name or number missing'});
    } else if (persons.find(person => person.name === bodyRequest.name)) {
        return response.status(400).json({error: 'name must be unique'});
    }

    const newPerson = {
        id: (maxId() === maxId()) ? maxId() : maxId(),
        name: bodyRequest.name,
        number: bodyRequest.number
    }
    persons = [...persons, newPerson];
    response.json(newPerson);
});

app.listen(PORT, () => {
    console.log(`
Server running on port ${PORT}
** Press CTRL + C to stop server **
`);
    
})