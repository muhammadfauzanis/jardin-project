import { GoArrowLeft } from 'react-icons/go';
import { Link, Navigate } from 'react-router-dom';
import ButtonOrder from '../components/ButtonOrder';
import { useEffect, useState } from 'react';
import { Helper } from '../Helper/Helper';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import useUserId from '../utils/useUserId';
import Skeleton from 'react-loading-skeleton';

const CheckoutPage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [cartData, setCartData] = useState(null);
  const [cartId, setCartId] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [redirect, setRedirect] = useState('');
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { baseURLAPI, formatPrice } = Helper();
  const userId = useUserId();

  const getCartData = async () => {
    try {
      const response = await axios.get(baseURLAPI(`carts/${userId}`));
      setTotalPrice(response.data[0].data.totalPrice);
      setCartId(response.data[0].data._id);
      setCartData(response.data[0].data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error getting data', error);
    }
  };

  const addOrders = async (ev) => {
    ev.preventDefault();

    if (!tableNumber) {
      return setWarning(true);
    }

    try {
      const orderData = {
        tableNumber,
        cart: cartData,
        status: 'pending',
      };
      const response = await axios.post(baseURLAPI('orders'), orderData);
      setRedirect(response.status);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCartData();
  }, [userId, getCartData]); // masalah render terus gara gara ini

  return (
    <div className="min-h-screen pb-32">
      <div className="flex items-center p-4 shadow-lg border-b-2 border-secondary border-opacity-70 ">
        <Link to={'/'}>
          <GoArrowLeft size={30} className="text-primary cursor-pointer" />
        </Link>
        <h3 className="mx-auto font-bold text-lg ">Checkout</h3>
      </div>

      <form className="flex flex-col p-5 mt-5">
        <label htmlFor="" className="px-2 font-bold">
          Table Number
        </label>

        <input
          type="text"
          placeholder="Insert your table number"
          className="p-3 rounded-lg border-2 border-secondary active:border-primary"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        />

        {warning ? (
          <p className="text-red-500 text-sm px-3">*Table number is invalid</p>
        ) : null}
      </form>

      <hr className="h-2 bg-white" />

      <OrderCard
        cartData={cartData}
        getCartData={getCartData}
        cartId={cartId}
        isLoading={isLoading}
      />

      <hr className="h-2 bg-white" />

      {totalPrice ? (
        <div className="flex justify-between items-center p-6 font-semibold">
          {isLoading ? (
            <div className="flex justify-between w-full">
              <Skeleton width={100} height={20} />
              <Skeleton width={80} height={20} />
            </div>
          ) : (
            <>
              <h3>Total Price</h3>
              <p>{formatPrice(totalPrice)}</p>
            </>
          )}
        </div>
      ) : null}

      <ButtonOrder onSubmit={addOrders} />

      {redirect === 201 ? <Navigate to={'/order-confirmed'} /> : null}
    </div>
  );
};

export default CheckoutPage;
