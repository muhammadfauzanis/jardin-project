import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Helper } from '../Helper/Helper';

const OrderNote = () => {
  const { baseURLAPI } = Helper();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const productId = params.get('productID');
  const [orderNote, setOrderNote] = useState('');

  useEffect(() => {
    const updateOrderNote = async () => {
      try {
        await axios.put(baseURLAPI(`/products/${productId}`), { orderNote });
      } catch (error) {
        console.error('Error updating order note:', error.message);
      }
    };

    if (orderNote) {
      updateOrderNote();
    }
  }, [orderNote, productId]);

  const handleNoteChange = (e) => {
    setOrderNote(e.target.value);
  };

  return (
    <form className="py-4">
      <h3 className="text-xl font-bold mb-3">Note</h3>
      <textarea
        name="order-note"
        id="order-note"
        cols="30"
        rows="4"
        placeholder="Customize your order..."
        className="w-full p-2 bg-bgColorPrimary border-2 border-primary rounded-xl shadow-lg focus:border-secondary caret-primary"
        value={orderNote}
        onChange={handleNoteChange}
      ></textarea>
    </form>
  );
};

export default OrderNote;
