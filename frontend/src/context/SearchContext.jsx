// context/SearchContext.jsx - Updated with real API
import { createContext, useContext, useState } from 'react';
import { destinationService } from '../services/destinationService';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  // Perform search with real API
  const performSearch = async (query, filters = {}) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      const searchParams = {
        query: query,
        ...filters
      };

      // Remove empty filters
      Object.keys(searchParams).forEach(key => {
        if (!searchParams[key]) {
          delete searchParams[key];
        }
      });

      const response = await destinationService.searchDestinations(searchParams);
      
      if (response.success) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
        console.error('Search failed:', response.message);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setSearchFilters({
      category: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    });
  };

  const updateFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
  };

  const value = {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    performSearch,
    clearSearch,
    searchFilters,
    updateFilters
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};