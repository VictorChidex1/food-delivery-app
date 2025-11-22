import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Placeholders for now
const Home = () => <div className="p-10 text-2xl">Home Page - Restaurant Feed</div>;
const Restaurant = () => <div className="p-10 text-2xl">Restaurant Details & Menu</div>;
const Checkout = () => <div className="p-10 text-2xl">Checkout & Map</div>;
const OrderTracking = () => <div className="p-10 text-2xl">Live Order Tracking</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* We will add a Navbar component here later */}
        <nav className="p-4 bg-white shadow-sm flex justify-between items-center sticky top-0 z-50">
           <h1 className="text-xl font-bold text-primary">FoodFlow</h1>
           <div className="flex gap-4 text-sm font-medium">
             <span>Cart (0)</span>
           </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tracking" element={<OrderTracking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;