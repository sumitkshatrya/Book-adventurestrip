// components/Navbar.jsx - Updated
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState("");
  const { performSearch, searchQuery, clearSearch } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      await performSearch(localSearch.trim());
      
      // Navigate to search results page if not already there
      if (location.pathname !== "/search-results") {
        navigate("/search-results");
      }
    }
  };

  const handleLogoClick = () => {
    setLocalSearch("");
    clearSearch();
    navigate("/");
  };

  const handleDestinationsClick = () => {
    navigate("/destinations");
  };

  return (
    <div>
      <nav className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <img 
                src={logo} 
                alt="BookIt Logo" 
                className="h-12 w-auto cursor-pointer transition-transform hover:scale-105" 
                onClick={handleLogoClick}
              />
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="w-full sm:w-auto flex flex-grow max-w-lg space-x-2">
              <div className="relative flex-grow">
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                  type="search"
                  placeholder="Search adventures, destinations, activities..."
                  aria-label="Search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
                {localSearch && (
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setLocalSearch("")}
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 shadow-sm"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 mt-2 sm:mt-0">
              <button 
                onClick={handleLogoClick}
                className="text-gray-700 hover:text-blue-500 transition duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={handleDestinationsClick}
                className="text-gray-700 hover:text-blue-500 transition duration-200 font-medium"
              >
                Destinations
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;