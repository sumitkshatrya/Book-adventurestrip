import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  IndianRupee, 
  ArrowLeft, 
  Shield, 
  Check, 
  CreditCard,
  Lock,
  Calendar,
  Users,
  MapPin
} from 'lucide-react';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
    name: '',
    email: '',
    phone: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Data Found</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate form data
  if (!formData.name || !formData.email || !formData.phone) {
    alert('Please fill in all required fields');
    setIsProcessing(false);
    return;
  }

  // Simulate payment processing
  setTimeout(() => {
    setIsProcessing(false);
    navigate('/booking-confirmation', {
      state: {
        bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        bookingData: {
          ...bookingData,
          title: bookingData.title || 'Adventure Activity',
          location: bookingData.location || 'Unknown Location',
          price: bookingData.price || 0,
          totalPrice: bookingData.totalPrice || 0,
          participants: bookingData.participants || 1,
          date: bookingData.date || new Date().toISOString().split('T')[0],
          image: bookingData.image || '../assets/default.jpg' // Add default image
        },
        paymentMethod,
        customerInfo: formData
      }
    });
  }, 3000);
}; 

  const formatCardNumber = (value) => {
    return value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\//g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-500 hover:text-blue-700 transition duration-200 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600 mb-8">Review your details and make payment</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Booking Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
                <div className="flex items-start space-x-4">
                  <img
                    src={bookingData.image}
                    alt={bookingData.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{bookingData.title}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {bookingData.location}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{bookingData.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{bookingData.participants} participant{bookingData.participants > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg text-left transition duration-200 ${
                      paymentMethod === 'card' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3" />
                      <span className="font-semibold">Credit/Debit Card</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 border-2 rounded-lg text-left transition duration-200 ${
                      paymentMethod === 'upi' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-3" />
                      <span className="font-semibold">UPI Payment</span>
                    </div>
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          required
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter name as on card"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setFormData({...formData, cardNumber: formatted});
                          }}
                          maxLength="19"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            required
                            value={formData.expiryDate}
                            onChange={(e) => {
                              const formatted = formatExpiryDate(e.target.value);
                              setFormData({...formData, expiryDate: formatted});
                            }}
                            maxLength="5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            required
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID *
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      required
                      value={formData.upiId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="yourname@upi"
                    />
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-sm text-green-700">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>{bookingData.title} × {bookingData.participants}</span>
                    <span>
                      <IndianRupee className="inline h-3 w-3" />
                      {bookingData.price * bookingData.participants}
                    </span>
                  </div>
                  
                  {bookingData.originalPrice && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Discount</span>
                      <span className="text-green-600">
                        -<IndianRupee className="inline h-3 w-3" />
                        {(bookingData.originalPrice - bookingData.price) * bookingData.participants}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee</span>
                    <span>
                      <IndianRupee className="inline h-3 w-3" />
                      {Math.round(bookingData.price * 0.1)}
                    </span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">
                        <IndianRupee className="inline h-4 w-4" />
                        {bookingData.totalPrice + Math.round(bookingData.price * 0.1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="text-xs text-gray-500 mb-6">
                  <p className="mb-2">
                    By completing this booking, you agree to our Terms of Service and Privacy Policy.
                  </p>
                  <p>
                    Free cancellation up to 24 hours before the activity starts.
                  </p>
                </div>

                {/* Pay Now Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition duration-200 ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${bookingData.totalPrice + Math.round(bookingData.price * 0.1)}`
                  )}
                </button>

                {/* Security Badges */}
                <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <Shield className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Secure</span>
                  </div>
                  <div className="text-center">
                    <Lock className="h-6 w-6 text-green-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-600">Encrypted</span>
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

export default CheckoutPage;