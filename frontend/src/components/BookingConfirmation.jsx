import { useLocation, Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Download, 
  Calendar, 
  Users, 
  MapPin, 
  IndianRupee,
  Share2,
  Mail
} from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const { bookingId, bookingData, paymentMethod, customerInfo } = location.state || {};

  // Safe default values
  const safeBookingData = bookingData || {
    title: 'Adventure Activity',
    location: 'Unknown Location',
    price: 0,
    totalPrice: 0,
    participants: 1,
    date: new Date().toISOString().split('T')[0],
    image: '../assets/default.jpg'
  };

  const safeCustomerInfo = customerInfo || {
    name: 'Not Provided',
    email: 'Not Provided',
    phone: 'Not Provided'
  };

  const safePaymentMethod = paymentMethod || 'Unknown';
  const safeBookingId = bookingId || 'Not Available';

  if (!bookingId && !bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Found</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Simulate download functionality
    const confirmationData = {
      bookingId: safeBookingId,
      activity: safeBookingData.title,
      date: safeBookingData.date,
      participants: safeBookingData.participants,
      totalAmount: safeBookingData.totalPrice + Math.round(safeBookingData.price * 0.1),
      customer: safeCustomerInfo.name
    };
    
    const blob = new Blob([JSON.stringify(confirmationData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${safeBookingId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Adventure Booking Confirmation',
        text: `I've booked ${safeBookingData.title} for ${safeBookingData.date} for ${safeBookingData.participants} person${safeBookingData.participants > 1 ? 's' : ''}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I've booked ${safeBookingData.title} for ${safeBookingData.date}. Booking ID: ${safeBookingId}`);
      alert('Booking details copied to clipboard!');
    }
  };

  const totalWithFees = safeBookingData.totalPrice + Math.round(safeBookingData.price * 0.1);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your booking. Your adventure awaits!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 inline-block">
              <p className="text-blue-800 font-semibold">
                Booking ID: {safeBookingId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Booking Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
                <div className="flex items-start space-x-4">
                  <img
                    src={safeBookingData.image}
                    alt={safeBookingData.title}
                    className="w-24 h-24 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{safeBookingData.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {safeBookingData.location}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">Date</div>
                          <div className="font-semibold">{safeBookingData.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <div className="text-sm text-gray-600">Participants</div>
                          <div className="font-semibold">{safeBookingData.participants} person{safeBookingData.participants > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <p className="font-semibold">{safeCustomerInfo.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <p className="font-semibold">{safeCustomerInfo.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <p className="font-semibold">{safeCustomerInfo.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Method
                    </label>
                    <p className="font-semibold capitalize">{safePaymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-900">What's Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Confirmation Email</p>
                      <p className="text-blue-800">You'll receive a confirmation email within 5 minutes with all the details.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Host Contact</p>
                      <p className="text-blue-800">The adventure host will contact you 24 hours before the activity.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-blue-900">Prepare for Adventure</p>
                      <p className="text-blue-800">Check the "What to Bring" list and get ready for your experience!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Payment Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Activity Cost</span>
                    <span>
                      <IndianRupee className="inline h-3 w-3" />
                      {safeBookingData.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee</span>
                    <span>
                      <IndianRupee className="inline h-3 w-3" />
                      {Math.round(safeBookingData.price * 0.1)}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total Paid</span>
                      <span>
                        <IndianRupee className="inline h-4 w-4" />
                        {totalWithFees}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center py-3 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition duration-200"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Booking
                  </button>
                  
                  <Link
                    to="/"
                    className="w-full flex items-center justify-center py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Browse More Adventures
                  </Link>
                </div>

                {/* Support Info */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Contact our support team for any questions about your booking.
                  </p>
                  <div className="flex items-center text-sm text-blue-500">
                    <Mail className="h-4 w-4 mr-2" />
                    support@adventurebook.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;