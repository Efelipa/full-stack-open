export const Filter = ({filterPerson, setFilter, filter}) => {
    return (
        <div className="filter">
            Filter shown with: <input onChange={filterPerson(setFilter)} value={filter} placeholder='Search the contact'/>
        </div>
    )
};