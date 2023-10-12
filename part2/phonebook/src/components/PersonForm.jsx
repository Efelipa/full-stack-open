export const PersonForm = ({createNewPerson, handleNumberChange, handleNoteChange, newName, newNumber}) => {
    return (
    <form onSubmit={createNewPerson}>
        <label className="gap">
            Name: 
            <input type="text" value={newName} onChange={handleNoteChange} />
        </label>
        <label className="gap">
            Number:
            <input type="number" value={newNumber} onChange={handleNumberChange} />
        </label>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
    )
}