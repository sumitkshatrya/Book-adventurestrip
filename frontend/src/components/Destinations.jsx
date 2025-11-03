import { useState, useEffect } from 'react';
import { IndianRupee, MapPin, Star, Filter, X, Search, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  // Fetch all destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Apply filters and search when they change
  useEffect(() => {
    applyFiltersAndSearch();
  }, [destinations, searchQuery, filters]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await destinationService.getAllDestinations();
      
      if (response.success) {
        setDestinations(response.data);
      } else {
        setError('Failed to load destinations');
        console.error('API Error:', response.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error loading destinations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...destinations];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(destination =>
        destination.title?.toLowerCase().includes(query) ||
        destination.location?.toLowerCase().includes(query) ||
        destination.description?.toLowerCase().includes(query) ||
        (destination.highlights && destination.highlights.some(highlight => 
          (highlight.text || highlight).toLowerCase().includes(query)
        ))
      );
    }

    // Apply other filters...
    if (filters.category) {
      filtered = filtered.filter(destination => 
        destination.category === filters.category
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter(destination => 
        destination.difficulty === filters.difficulty
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(destination => 
        destination.price >= parseInt(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(destination => 
        destination.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.minRating) {
      filtered = filtered.filter(destination => 
        destination.rating >= parseFloat(filters.minRating)
      );
    }

    setFilteredDestinations(filtered);
  };

  // Helper function to get image URL - FIXED VERSION
  const getImageUrl = (destination) => {
    if (destination.images && destination.images.length > 0) {
      const imageUrl = destination.images[0].url;
      
      // Handle both local and Cloudinary URLs
      if (imageUrl.startsWith('http')) {
        return imageUrl; // Cloudinary URL
      } else if (imageUrl.startsWith('/uploads/')) {
        // For production - use your render.com URL
        if (import.meta.env.VITE_NODE_ENV === 'production') {
          return `https://book-adventurestrip.onrender.com${imageUrl}`;
        } else {
          // For local development
          return `http://localhost:5000${imageUrl}`;
        }
      }
      
      return imageUrl;
    }
    
    // Fallback image
    return 'https://via.placeholder.com/400x300?text=No+Image+Available';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled in the useEffect
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      difficulty: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading amazing adventures...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={fetchDestinations}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="container mx-auto px-4 py-8">
        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDestinations.map(destination => (
              <div 
                key={destination._id} 
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getImageUrl(destination)}
                    alt={destination.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
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

                {/* Content Section */}
                <div className="p-5">
                  {/* Title and Location */}
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition duration-200">
                      {destination.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{destination.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
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

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-baseline gap-2">
                      {destination.originalPrice && destination.originalPrice > destination.price ? (
                        <>
                          <span className="text-sm text-gray-500 line-through">
                            <IndianRupee className="inline h-3 w-3" />
                            {destination.originalPrice}
                          </span>
                          <span className="text-xl font-bold text-gray-900">
                            <IndianRupee className="inline h-4 w-4" />
                            {destination.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold text-gray-900">
                          <IndianRupee className="inline h-4 w-4" />
                          {destination.price}
                        </span>
                      )}
                    </div>
                    
                    <Link
                      to={`/details/${destination.slug}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm font-semibold flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Results State */
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No adventures found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery || filters.category || filters.difficulty || filters.minPrice || filters.maxPrice || filters.minRating
                ? "Try adjusting your search terms or filters to find more adventures."
                : "No adventures are currently available. Please check back later."
              }
            </p>
            {(searchQuery || Object.values(filters).some(Boolean)) && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-semibold"
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;