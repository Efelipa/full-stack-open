export const SearchCountry = ({search, setSearch, handleChange}) => {
    return (
        <div className="search">
            Find countries: 
            <input type="text" value={search} onChange={handleChange(setSearch)}/>
        </div>
    )
}