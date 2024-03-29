import { RiPencilFill } from 'react-icons/ri';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { IoPauseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Helper } from '../Helper/Helper';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const OrderCard = ({ cartData, getCartData, cartId, isLoading }) => {
  // const [cartData, setCartData] = useState(null);
  const { formatPrice, baseURLAPI } = Helper();
  // const userId = useUserId();

  // const getCartData = async () => {
  //   try {
  //     const response = await axios.get(baseURLAPI(`carts/${userId}`));
  //     //   console.log(response.data[0].data._id);
  //     setCartId(response.data[0].data._id);
  //     setCartData(response.data[0].data);
  //   } catch (error) {
  //     console.error('Error getting data', error);
  //   }
  // };

  // useEffect(() => {
  //   getCartData();
  // }, [userId, getCartData]);

  // handle plus button
  const increment = async (productId) => {
    const cartItem = cartData.items.find(
      (item) => item.productId._id === productId
    );

    const newQuantity = cartItem.quantity + 1;

    const price = cartItem.productId.price;

    const newTotalPrice = cartData.totalPrice + price;

    await updateCartItem(productId, newQuantity, newTotalPrice);
    await getCartData();
  };

  // // handle minus button
  const decrement = async (productId) => {
    const cartItem = cartData.items.find(
      (item) => item.productId._id === productId
    );

    const price = cartItem.productId.price;
    const newQuantity = cartItem.quantity - 1;

    const newTotalPrice = cartData.totalPrice - price;

    if (newQuantity === 0) {
      return removeCartItem(productId, newTotalPrice);
    }

    await updateCartItem(productId, newQuantity, newTotalPrice);
    await getCartData();
  };

  const updateCartItem = async (productId, quantity, totalPrice) => {
    try {
      await axios.put(baseURLAPI(`carts/${cartId}/${productId}`), {
        quantity,
        totalPrice,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeCartItem = async (productId) => {
    try {
      await axios.delete(baseURLAPI(`carts/${cartId}/${productId}`));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="px-7 mt-3">
      <h2 className="font-bold">Order</h2>

      {cartData ? (
        <>
          {cartData.items
            .filter((item) => item.quantity > 0) // Saring item yang masih ada dalam keranjang
            .map((item) => (
              <div key={item.productId._id}>
                {isLoading ? (
                  <div className="flex items-center justify-between mt-5">
                    <div className="">
                      <Skeleton width={100} height={20} />
                      <Skeleton width={80} height={16} />
                    </div>
                    <Skeleton
                      className="rounded-xl mb-2"
                      width={48}
                      height={48}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mt-5">
                      <div className="">
                        <h3 className="font-semibold">
                          {item.productId.productName}
                        </h3>
                        <p className="text-xs">Note: {item.option}</p>
                      </div>
                      <img
                        src={item.productId.image}
                        alt={item.productId.productName}
                        className="rounded-xl w-24 h-24 object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between py-5">
                      <p>Rp {formatPrice(item.productId.price)}</p>
                      <div className="flex items-center gap-x-3">
                        <button className="text-primary border-2 border-primary rounded-full p-1">
                          <RiPencilFill size={15} />
                        </button>
                        <IoPauseOutline size={20} className="opacity-30" />

                        {/* Button */}
                        <div className="flex items-center gap-x-5 w-[25%] justify-between">
                          <button
                            onClick={() => decrement(item.productId._id)}
                            className="text-primary border-2 border-primary rounded-full p-1"
                          >
                            <AiOutlineMinus size={15} />
                          </button>
                          <span className={``}>{item.quantity}</span>

                          <button
                            onClick={() => increment(item.productId._id)}
                            className="text-white border-2 border-primary bg-primary rounded-full p-1 "
                          >
                            <AiOutlinePlus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
};

export default OrderCard;
