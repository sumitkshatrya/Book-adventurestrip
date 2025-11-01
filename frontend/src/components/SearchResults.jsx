// components/SearchResults.jsx - Fix the image URL access
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { IndianRupee, MapPin, Star, Filter, X, Search, Clock, Users } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    searchResults, 
    searchQuery, 
    isSearching, 
    performSearch,
    searchFilters,
    updateFilters 
  } = useSearch();

  const [localFilters, setLocalFilters] = useState({
    category: searchFilters.category || '',
    difficulty: searchFilters.difficulty || '',
    minPrice: searchFilters.minPrice || '',
    maxPrice: searchFilters.maxPrice || '',
    minRating: searchFilters.minRating || ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Helper function to get image URL (ADD THIS FUNCTION)
  const getImageUrl = (destination) => {
    if (destination.images && destination.images.length > 0) {
      const imageUrl = destination.images[0].url || destination.images[0];
      
      // Handle both local and Cloudinary URLs
      if (imageUrl.startsWith('http')) {
        return imageUrl; // Cloudinary URL
      } else if (imageUrl.startsWith('/uploads/')) {
        // For local development - adjust the base URL as needed
        return `http://localhost:5000${imageUrl}`;
      }
      
      return imageUrl;
    }
    
    // Fallback image
    return 'https://via.placeholder.com/400x300?text=No+Image+Available';
  };

  // Extract unique values for filter options
  const categories = [...new Set(searchResults.map(d => d.category))].filter(Boolean);
  const difficulties = [...new Set(searchResults.map(d => d.difficulty))].filter(Boolean);

  // Apply filters
  const filteredDestinations = searchResults.filter(destination => {
    if (localFilters.category && destination.category !== localFilters.category) return false;
    if (localFilters.difficulty && destination.difficulty !== localFilters.difficulty) return false;
    if (localFilters.minRating && destination.rating < parseFloat(localFilters.minRating)) return false;
    if (localFilters.minPrice && destination.price < parseInt(localFilters.minPrice)) return false;
    if (localFilters.maxPrice && destination.price > parseInt(localFilters.maxPrice)) return false;
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    updateFilters(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    };
    setLocalFilters(clearedFilters);
    updateFilters(clearedFilters);
  };

  const handleSearchAgain = () => {
    navigate('/');
  };

  if (isSearching) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for adventures...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
    onClick={() => navigate('/')}
    className="mb-4 sm:mb-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-200"
  >
    ← Back to Home
  </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Adventures'}
          </h1>
          <p className="text-gray-600">
            Found {filteredDestinations.length} adventure{filteredDestinations.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Category */}
              {categories.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Category</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                        !localFilters.category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange('category', category)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                          localFilters.category === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Difficulty */}
              {difficulties.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleFilterChange('difficulty', '')}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                        !localFilters.difficulty ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      All Levels
                    </button>
                    {difficulties.map(difficulty => (
                      <button
                        key={difficulty}
                        onClick={() => handleFilterChange('difficulty', difficulty)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                          localFilters.difficulty === difficulty ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                      >
                        {difficulty}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min price"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max price"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('minRating', rating.toString())}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition duration-200 ${
                        localFilters.minRating === rating.toString() ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <Star className="h-4 w-4 fill-current text-yellow-400 mr-2" />
                      {rating}+ Stars
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearAllFilters}
                className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>

            {/* Results Grid */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDestinations.map(destination => (
                  <div key={destination._id || destination.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition duration-300">
                    {/* FIXED: Image section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(destination)}
                        alt={destination.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available';
                        }}
                      />
                      
                      {/* Discount Badge */}
                      {destination.discount && destination.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {destination.discount}% OFF
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                        {destination.category}
                      </div>

                      {/* Rating Badge */}
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Star className="h-3 w-3 text-orange-500 fill-current mr-1" />
                        {destination.rating || 'New'}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{destination.title}</h3>
                        <span className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                          {destination.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {destination.location}
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center text-orange-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 font-semibold">{destination.rating || 0}</span>
                        </div>
                        <span className="text-gray-500 ml-2">({destination.reviews || 0} reviews)</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {destination.description}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {destination.duration}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {destination.groupSize}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          destination.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          destination.difficulty === 'Easy' ? 'bg-blue-100 text-blue-800' :
                          destination.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                          destination.difficulty === 'Difficult' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {destination.difficulty}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {destination.originalPrice && destination.originalPrice > destination.price && (
                            <span className="text-sm text-gray-500 line-through mr-2">
                              <IndianRupee className="inline h-3 w-3" />
                              {destination.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-bold text-gray-900">
                            <IndianRupee className="inline h-4 w-4" />
                            {destination.price}
                          </span>
                        </div>
                        <Link
                          to={`/details/${destination.slug || destination.id}`}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchResults.length === 0 ? 'No adventures found' : 'No matching adventures'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchResults.length === 0 
                    ? 'Try a different search term or browse all destinations.'
                    : 'Try adjusting your filters to find more adventures.'
                  }
                </p>
                <div className="space-x-4">
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={handleSearchAgain}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Search Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;