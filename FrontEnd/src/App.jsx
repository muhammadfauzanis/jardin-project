import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductDetail from './pages/productDetail';
import CheckoutPage from './pages/checkoutPage';
import OrderConfirmedPage from './pages/orderConfirmedPage';

function App() {
  return (
    <div className="max-w-lg mx-auto bg-bgColorPrimary min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/check-out" element={<CheckoutPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
