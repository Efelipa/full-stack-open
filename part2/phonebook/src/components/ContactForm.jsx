export const ContactForm = ({addPerson, handleChange, newName, newNumber, setNewName, setNewNumber}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input onChange={handleChange(setNewName)} value={newName}/>
            </div>
            <div>
                number: <input onChange={handleChange(setNewNumber)} value={newNumber}/>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
};