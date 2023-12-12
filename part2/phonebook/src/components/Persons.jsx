export const Persons = ({results, handleClick}) => {
    return (
        <>
            {(results.length !== 0)
            ? <ul>
                {results.map((person) => {
                    return (
                        <div key={person.id} className="contact-list">
                        <li>{person.name}: <strong>{person.number}</strong></li>
                        <button onClick={() => handleClick(person.id)} className="delete-btn">Delete contact</button>
                        </div>
                    )
                })}
                </ul>
            : <h3>Contact not found.</h3>}
        </>
    )
};
