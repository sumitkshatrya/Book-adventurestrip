// components/HomePage.jsx - Updated
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Search } from "lucide-react"; 
import IceClimbing from "../assets/IceClimbing.jpg"; 
import Destinations from './Destinations';

const HomePage = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { performSearch } = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      await performSearch(localSearch.trim());
      navigate('/search-results');
    }
  };

  return (
    <> 
      <div className='relative h-screen'> 
        <img 
          src={IceClimbing} 
          alt='Background Tour Image' 
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-4'>
          <h1 className='font-extrabold text-5xl md:text-6xl text-white text-center mb-12'>
            Adventures Tour Packages
          </h1>
          <form onSubmit={handleSearch} className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 px-4"> 
            <div className="flex items-center bg-white rounded-lg shadow-2xl p-4">
              <span className="text-gray-500 mr-3">
                <Search className="h-6 w-6" /> 
              </span>
              <input
                className="flex-grow text-lg border-none focus:outline-none focus:ring-0 placeholder-gray-500"
                type="search"
                placeholder="Search 'Packages in Adventures...'"
                aria-label="Search Packages"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <Destinations />
    </>
  );
}

export default HomePage;