import {FaSearch} from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "./listitem";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Components/Spinner';

export default function Search() {
    const navigate = useNavigate();
    const { id } = useParams();
    const API = 'https://openlibrary.org/search.json'
    const [searchValue, setSearchValue] = useState(id ?? "");
    const [searching, setSearching] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const setSearchParams = () => {
      if (searchValue) {
        navigate(`/search/${searchValue}`)
      } else {
        navigate(`/search`)
      }
    }

    const handleSearch = async () => {
      let decodeId = decodeURIComponent(id).replace(/\+/g, ' ');
      setSearchValue(decodeId)
      if (!decodeId) {
        setSearchResults([])
        return
      }
      setSearching(true)
      const results = await axios.get(`${API}?q=${id}&language=eng&limit=20`)
      setSearchResults(results.data.docs)
      setSearching(false)
    }

    useEffect(() => {
      if (id) {
        handleSearch()
      } else {
        setSearchResults([])
        setSearchValue("")
      }
    }, [id])

    return (
      <div>
        <div className="input-group input-group-lg mt-4">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for books" 
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="input-group-append p-3 input-group-text" role="button" onClick={setSearchParams}>
            <FaSearch size="14" />
          </div>
        </div>
       <h2 className="mt-3">Results</h2>
       {id ? 
          <>
            {searchResults.length === 0 && !searching ? 
              <p className="lead w-100 text-center">No results found</p>
              :
              <>
                {searching ? 
                  <p className="lead w-100 text-center"><Spinner /></p>
                  :
                  <>
                    <p className="lead">Showing results for "{decodeURIComponent(id).replace(/\+/g, ' ')}"</p>
                    <div className="row gap-3 m-auto justify-content-center">
                      {searchResults.map((book) => (
                        <ListItem key={book.key} {...book} />
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