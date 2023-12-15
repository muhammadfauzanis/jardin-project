import CounterButton from './CounterButton';
import { Helper } from '../Helper/Helper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUserId from '../utils/useUserId';
import Swal from 'sweetalert2';

const ButtonAddToCart = ({ productId, productPrice, option = '' }) => {
  const { baseURLAPI } = Helper();
  // const [userId, setUserId] = useState('');
  const userId = useUserId();
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const addToCart = async () => {
    try {
      const totalPrice = productPrice * quantity;

      await axios.post(baseURLAPI('/carts'), {
        userId,
        productId,
        quantity,
        totalPrice,
        option,
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Item added to cart!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // useEffect(() => {
  //   let existingUserId = localStorage.getItem('userId');

  //   if (!existingUserId) {
  //     existingUserId = generateUserId();
  //     localStorage.setItem('userId', existingUserId);
  //   }

  //   setUserId(existingUserId);
  // }, []);

  return (
    <div className="fixed bottom-0 bg-bgColorPrimary w-full flex justify-between p-4 gap-x-20 z-10 max-w-lg">
      <CounterButton onQuantityChange={handleQuantity} />

      <button
        className="bg-primary rounded-full px-5 py-2 w-[70%] text-white text-lg"
        onClick={addToCart}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ButtonAddToCart;
