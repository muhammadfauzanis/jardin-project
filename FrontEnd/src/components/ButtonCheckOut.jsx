import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Helper } from '../Helper/Helper';
import useUserId from '../utils/useUserId';

const ButtonCheckOut = () => {
  const [cartData, setCartData] = useState(null);
  const { baseURLAPI, formatPrice } = Helper();
  const userId = useUserId();

  const getCartData = async () => {
    try {
      const response = await axios.get(baseURLAPI(`carts/${userId}`));
      setCartData(response.data);
    } catch (error) {
      console.error('Error getting data', error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [userId]);

  return (
    <>
      {cartData ? (
        <div className="max-w-lg w-full bg-bgColorPrimary p-5 fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2">
          <Link to={'/check-out'}>
            <button className="flex justify-between items-center bg-primary p-4 rounded-lg text-white w-full">
              <p>
                Order Now <span>({cartData[0].data.items.length} Product)</span>
              </p>
              <div className="flex items-center gap-x-3">
                <p>{formatPrice(cartData[0].data.totalPrice)}</p>
                <IoIosArrowDroprightCircle size={25} />
              </div>
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ButtonCheckOut;
