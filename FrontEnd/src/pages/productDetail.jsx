import { GoArrowLeft } from 'react-icons/go';
import { Link, useLocation, useParams } from 'react-router-dom';
import ButtonAddToCart from '../components/ButtonAddToCart';
import MenuSelectionForm from '../components/MenuSelectionForm';
import { useEffect, useState } from 'react';
import { Helper } from '../Helper/Helper';
import axios from 'axios';

const ProductDetail = () => {
  const { baseURLAPI, formatPrice } = Helper();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productID');

  const fetchProductDetail = async () => {
    try {
      console.log(params);
      const response = await axios.get(baseURLAPI(`products/${productId}`));
      setProduct(response.data[0].data);
    } catch (err) {
      console.log(err);
    }
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
      <img
        src={product.image}
        alt={product.productName}
        className="rounded-b-2xl w-full h-[350px] object-cover mb-4 shadow-md"
      />

      <div className="px-4 pb-3 border-b-[6px] border-secondary border-opacity-70 ">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold uppercase ">
            {product.productName}
          </h3>
          <p className="text-primary font-semibold text-lg">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="text-sm text-justify line-clamp-3 text-gray-500 opacity-70">
          {product.description}
        </p>
      </div>

      <div className="px-4">
        <MenuSelectionForm
          name={'Ice Cube'}
          type1={'Normal Ice'}
          type2={'Less Ice'}
          type3={'No Ice'}
        />

        <hr className="h-[2px] w-full mx-auto bg-gray-600 opacity-50" />
        <MenuSelectionForm
          name={'Sweatness'}
          type1={'Normal Sugar'}
          type2={'Less Sugar'}
          type3={'No Sugar'}
        />
      </div>

      <ButtonAddToCart productId={productId} productPrice={product.price} />
    </div>
  );
};

export default ProductDetail;
