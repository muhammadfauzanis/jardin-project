import { GoArrowLeft } from 'react-icons/go';
import { Link, useLocation, useParams } from 'react-router-dom';
import ButtonAddToCart from '../components/ButtonAddToCart';
import { useEffect, useState } from 'react';
import { Helper } from '../Helper/Helper';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const ProductDetail = () => {
  const { baseURLAPI, formatPrice } = Helper();
  const [product, setProduct] = useState([]);
  const [option, setOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productID');

  const fetchProductDetail = async () => {
    try {
      console.log(params);
      const response = await axios.get(baseURLAPI(`products/${productId}`));
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setProduct(response.data[0].data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNoteChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    fetchProductDetail();
  }, []);

  return (
    <div className="pb-32">
      <Link to="/">
        <div className="fixed z-10 text-primary rounded-full bg-bgColorPrimary p-2 m-3 cursor-pointer">
          <GoArrowLeft size={25} />
        </div>
      </Link>
      {isLoading ? (
        <Skeleton className="w-full h-[350px] mb-4" />
      ) : (
        <img
          src={product.image}
          alt={product.productName}
          className="rounded-b-2xl w-full h-[350px] object-cover mb-4 shadow-md"
        />
      )}

      <div className="px-4 pb-3 border-b-[6px] border-secondary border-opacity-70 ">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton width={200} height={24} />
          ) : (
            <h3 className="text-xl font-bold uppercase ">
              {product.productName}
            </h3>
          )}
          {isLoading ? (
            <Skeleton width={80} />
          ) : (
            <p className="text-primary font-semibold text-lg">
              {formatPrice(product.price)}
            </p>
          )}
        </div>
        {isLoading ? (
          <Skeleton count={3} />
        ) : (
          <p className="text-sm text-justify line-clamp-3 text-gray-500 opacity-70">
            {product.description}
          </p>
        )}
      </div>

      <div className="px-4">
        <form className="py-4">
          <h3 className="text-xl font-bold mb-3">Note</h3>
          <textarea
            name="order-note"
            id="order-note"
            cols="30"
            rows="4"
            placeholder="Customize your order..."
            className="w-full p-2 bg-bgColorPrimary border-2 border-primary rounded-xl shadow-lg focus:border-secondary caret-primary"
            value={option}
            onChange={handleNoteChange}
          ></textarea>
        </form>
      </div>

      <ButtonAddToCart
        productId={productId}
        productPrice={product.price}
        option={option}
      />
    </div>
  );
};

export default ProductDetail;
