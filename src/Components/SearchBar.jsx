import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(searchTerm){
            navigate(`/search_ride/${searchTerm.replaceAll("/", "%2F")}`);
        }
        window.location.reload();
    };

    return (
        <>
           <form className="search_form" onSubmit={handleSubmit}>
                <label for="search" className="search_label">Search</label>
                <input 
                    className="search_input" 
                    id="search" 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter Ticket No or Payment Ref No or Account Email Phone and ID" 
                    required
                />
                <button className="search_btn" type="submit">Search</button>
           </form>
        </>
    );
};

export default SearchBar;