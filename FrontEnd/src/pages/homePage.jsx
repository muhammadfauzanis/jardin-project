import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

const HomePage = () => {
  const [isFixed, setIsFixed] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener('scroll', handleScroll);

  return (
    <div className="pb-20 ">
      <div
        className={`fixed w-full max-w-lg top-0 left-0  md:left-1/2 md:-translate-x-1/2 z-10 pb-3 transition-all duration-500 ease-linear ${
          isFixed ? 'bg-white  shadow-md' : 'bg-bgColorPrimary'
        }`}
      >
        <h1 className="font-bold text-primary text-center p-5 text-2xl">
          Jardin
        </h1>

        <CategoryBar />
      </div>

      <ProductCard />
    </div>
  );
};

export default HomePage;
