import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  IndianRupee, 
  Clock, 
  Users, 
  MapPin, 
  ArrowLeft, 
  Star, 
  Calendar,
  Shield,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check
} from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { destinationService } from '../services/destinationService';
import { bookingService } from '../services/bookingService';

const getImageUrl = (imageObj) => {
  if (!imageObj) return 'https://via.placeholder.com/800x500?text=No+Image+Available';
  const imageUrl = imageObj.url || imageObj;

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  } else if (imageUrl.startsWith('/uploads/')) {
    return `http://localhost:5000${imageUrl}`;
  }
  return imageUrl;
};

const DetailsPage = () => {
  const { activity } = useParams();
  const navigate = useNavigate();
  const { clearSearch } = useSearch();
  
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [participants, setParticipants] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  // FIXED: useCallback to prevent infinite loops
  const fetchDestination = useCallback(async () => {
    if (!activity) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await destinationService.getDestinationBySlug(activity);
      
      if (response.success) {
        setSelectedDestination(response.data);
      } else {
        setError('Destination not found');
      }
    } catch (err) {
      console.error('Error fetching destination:', err);
      setError('Error loading destination. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [activity]);

  // FIXED: Proper useEffect with cleanup
  useEffect(() => {
    let isMounted = true;
    
    if (activity && isMounted) {
      fetchDestination();
      clearSearch();
    }

    return () => {
      isMounted = false;
    };
  }, [activity, fetchDestination]);

  // Reset states when activity changes
  useEffect(() => {
    setSelectedImage(0);
    setSelectedDate('');
    setParticipants(1);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      specialRequests: ''
    });
    setIsBookingModalOpen(false);
  }, [activity]);

  const nextImage = () => {
    if (!selectedDestination?.images) return;
    setSelectedImage((prev) => 
      prev === selectedDestination.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedDestination?.images) return;
    setSelectedImage((prev) => 
      prev === 0 ? selectedDestination.images.length - 1 : prev - 1
    );
  };

  const maxParticipants = selectedDestination ? 
    parseInt(selectedDestination.groupSize?.split('-')[1] || selectedDestination.groupSize?.split('-')[0] || '8') : 8;

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    setIsProcessing(true);

    try {
      const bookingPayload = {
        destinationId: selectedDestination._id,
        date: selectedDate,
        participants: participants,
        user: {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone
        },
        paymentMethod: 'credit_card',
        specialRequests: bookingData.specialRequests,
        totalPrice: selectedDestination.price * participants
      };

      const response = await bookingService.createBooking(bookingPayload);
      
      if (response.success) {
        navigate('/checkout', {
          state: {
            bookingData: {
              ...selectedDestination,
              date: selectedDate,
              participants,
              totalPrice: selectedDestination.price * participants,
              image: selectedDestination.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'
            },
            customerInfo: bookingData,
            bookingId: response.data._id
          }
        });
      } else {
        alert('Booking failed: ' + response.message);
      }
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking error: ' + (err.message || 'Something went wrong'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading adventure details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !selectedDestination) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'Destination not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            The adventure you're looking for doesn't exist or may have been removed.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/destinations')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Browse Destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = selectedDestination.price * participants;
  const mainImage = selectedDestination.images?.[selectedImage]?.url || selectedDestination.images?.[0]?.url || 'https://via.placeholder.com/800x500?text=No+Image+Available';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-blue-500 hover:text-blue-700 transition duration-200 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Previous Page
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 md:h-[500px] bg-gray-200">
            <img
  src={getImageUrl(selectedDestination.images?.[selectedImage] || selectedDestination.images?.[0])}
  alt={selectedDestination.title}
  className="w-full h-full object-cover"
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/800x500?text=No+Image+Available';
  }}
/>

            
            {/* Image Navigation */}
            {selectedDestination.images && selectedDestination.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Indicators */}
            {selectedDestination.images && selectedDestination.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedDestination.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-3 h-3 rounded-full transition duration-200 ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition duration-200 shadow-lg">
                <Heart className="h-5 w-5 text-gray-700" />
              </button>
              <button className="bg-white/90 p-2 rounded-full hover:bg-white transition duration-200 shadow-lg">
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Discount Badge */}
            {selectedDestination.discount && selectedDestination.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                {selectedDestination.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {selectedDestination.images && selectedDestination.images.length > 1 && (
            <div className="flex space-x-2 p-4 bg-gray-50 overflow-x-auto">
              {selectedDestination.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition duration-200 ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${selectedDestination.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=Image';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {selectedDestination.category}
                  </span>
                  <div className="flex items-center text-orange-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-semibold">{selectedDestination.rating || 0}</span>
                    <span className="text-gray-500 ml-1">({selectedDestination.reviews || 0} reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {selectedDestination.title}
                </h1>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedDestination.location}</span>
                </div>
              </div>
              
              {/* Price Box */}
              <div className="bg-gray-50 rounded-xl p-6 mt-4 lg:mt-0 lg:ml-6 min-w-80">
                <div className="flex items-baseline gap-2 mb-2">
                  {selectedDestination.originalPrice && selectedDestination.originalPrice > selectedDestination.price && (
                    <span className="text-lg text-gray-500 line-through">
                      <IndianRupee className="inline h-4 w-4" />
                      {selectedDestination.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    <IndianRupee className="inline h-6 w-6" />
                    {selectedDestination.price}
                  </span>
                  <span className="text-sm text-gray-600">/ person</span>
                </div>
                
                {selectedDestination.originalPrice && selectedDestination.originalPrice > selectedDestination.price && (
                  <div className="text-green-600 font-semibold mb-4">
                    Save <IndianRupee className="inline h-4 w-4" />
                    {selectedDestination.originalPrice - selectedDestination.price} per person
                  </div>
                )}

                {/* Booking Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  {/* Participants Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Participants
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                        disabled={participants <= 1}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="font-semibold">{participants}</span>
                      <button
                        type="button"
                        onClick={() => setParticipants(Math.min(maxParticipants, participants + 1))}
                        disabled={participants >= maxParticipants}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-600 ml-2">
                        (Max: {maxParticipants})
                      </span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Total Price:</span>
                      <span className="text-2xl font-bold text-gray-900">
                        <IndianRupee className="inline h-5 w-5" />
                        {totalPrice}
                      </span>
                    </div>
                    <button
                      onClick={handleBookNow}
                      disabled={!selectedDate}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-200 ${
                        selectedDate 
                          ? 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center p-4 bg-blue-50 rounded-xl">
                <Clock className="h-6 w-6 text-blue-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="font-semibold">{selectedDestination.duration || 'Not specified'}</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-xl">
                <Users className="h-6 w-6 text-green-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Group Size</div>
                  <div className="font-semibold">{selectedDestination.groupSize || 'Not specified'}</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                <Calendar className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold">{selectedDestination.difficulty || 'Not specified'}</div>
                </div>
              </div>
              <div className="flex items-center p-4 bg-purple-50 rounded-xl">
                <Shield className="h-6 w-6 text-purple-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Age Limit</div>
                  <div className="font-semibold">{selectedDestination.ageLimit || 'Not specified'}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About this adventure</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {selectedDestination.longDescription ? (
                  selectedDestination.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No detailed description available.</p>
                )}
              </div>
            </div>

            {/* Rest of the component remains the same as your working version */}
            {/* ... Include all the other sections like Highlights, Includes, Itinerary, etc. ... */}
            
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Complete Your Booking</h3>
              <p className="text-gray-600 mt-1">{selectedDestination.title}</p>
            </div>
            
            <form onSubmit={handleBookingSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={bookingData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requirements or requests..."
                  />
                </div>
                
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Activity:</span>
                      <span>{selectedDestination.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Participants:</span>
                      <span>{participants}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total Amount:</span>
                      <span>
                        <IndianRupee className="inline h-4 w-4" />
                        {totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`flex-1 py-3 px-4 rounded-lg transition duration-200 font-semibold ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Continue to Payment'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;