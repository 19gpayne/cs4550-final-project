import {FaSearch} from 'react-icons/fa';
import { useState } from "react";
import axios from "axios";
import ListItem from "./listitem";

export default function Search() {
    const API = 'https://openlibrary.org/search.json'
    const [searchValue, setSearchValue] = useState("");
    const [resultsValue, setResultsValue] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
      setResultsValue(searchValue)
      setSearching(true)
      const results = await axios.get(`${API}?q=${searchValue}&language=eng&limit=20`)
      setSearchResults(results.data.docs)
      setSearching(false)
    }

    return (
      <div className="container">
        <div className="input-group input-group-lg mt-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for books" 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="input-group-append p-3 input-group-text" role="button" onClick={handleSearch}>
            <FaSearch size="14" />
          </div>
        </div>
       <h2 className="mt-3">Results</h2>
       {resultsValue ? 
          <>
            {searchResults.length === 0 && !searching ? 
              <p className="lead w-100 text-center">No results found</p>
              :
              <>
                {searching ? 
                  <p className="lead w-100 text-center">Searching...</p>
                  :
                  <>
                    <p className="lead">Showing results for "{resultsValue}"</p>
                    <div className="row gap-5 m-auto justify-content-center">
                      {searchResults.map((book) => (
                        <ListItem key={book.key} book={book} />
                      ))}
                    </div>
                  </>
                }
              </>
            }
          </>
          :
          <p className="lead w-100 text-center">Search to explore new titles</p>
       }
      </div>
    );
}