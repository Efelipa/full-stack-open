export const Filter = ({searchPerson, searchValue}) => {
    return (
        <div className="mb-3">
            <label className="gap">
                filter shown with:   
                <input type="text" onChange={searchPerson} value={searchValue} />
            </label>
        </div>
    )
}