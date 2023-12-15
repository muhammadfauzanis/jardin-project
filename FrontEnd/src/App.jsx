import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProductDetail from './pages/productDetail';
import CheckoutPage from './pages/checkoutPage';
import OrderConfirmedPage from './pages/orderConfirmedPage';
import { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  return (
    <div className="max-w-lg mx-auto bg-bgColorPrimary min-h-screen">
      <SkeletonTheme baseColor="#D0E7D2" highlightColor="#F6F4EB">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product-detail" element={<ProductDetail />} />
            <Route path="/check-out" element={<CheckoutPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
          </Routes>
        </Router>
      </SkeletonTheme>
    </div>
  );
}

export default App;
