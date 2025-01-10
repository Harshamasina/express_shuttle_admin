const SearchBar = () => {
    return (
        <>
           <form className="search_form">
                <label for="search" className="search_label">Search</label>
                <input 
                    className="search_input" 
                    id="search" 
                    type="text" 
                    placeholder="Enter Ticket No or Payment Ref No or Account Email Phone and ID" 
                    required
                />
                <button className="search_btn" type="submit">Search</button>
           </form>
        </>
    );
};

export default SearchBar;