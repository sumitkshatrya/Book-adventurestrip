import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { SearchProvider } from './context/SearchContext'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Destinations from './components/Destinations'
import DetailsPage from './components/DetailsPage'
import CheckoutPage from './components/CheckoutPage'
import BookingConfirmation from './components/BookingConfirmation'
import SearchResults from './components/SearchResults'

const App = () => {
  return (
    <SearchProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/details/:activity" element={<DetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/search-results" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  )
}

export default App