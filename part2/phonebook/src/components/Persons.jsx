export const Persons = ({filteredPersons}) => {
    return (
        <div>debug: 
            <ul>
                {(typeof filteredPersons === 'undefined' || filteredPersons.length === 0) 
                    ? <>There's no contacts</>
                    : filteredPersons.map((person, index) => <li key={index}>{person.name} <b>{person.number}</b></li>)
                }
            </ul>
        </div>
    )
}
