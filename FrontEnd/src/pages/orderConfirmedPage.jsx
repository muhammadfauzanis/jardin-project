import { FaRegCircleCheck } from 'react-icons/fa6';
import ButtonBackToMenu from '../components/ButtonBackToMenu';

const OrderConfirmedPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3">
      <FaRegCircleCheck size={60} className="text-primary" />
      <h1 className="font-bold text-xl">Order Confirmed !</h1>
      <p className="text-sm font-semibold">Your order has been successfully</p>
      <p className="text-sm ">We prepare your food, please wait</p>

      <ButtonBackToMenu />
    </div>
  );
};

export default OrderConfirmedPage;
