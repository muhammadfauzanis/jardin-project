import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const OrderConfirmedPage = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-3">
      <FaRegCircleCheck size={60} className="text-primary" />
      <h1 className="font-bold text-xl">Order Confirmed !</h1>
      <p className="text-sm font-semibold">Your order has been successfully</p>
      <p className="text-sm ">We prepare your food, please wait</p>

      <Link to={'/'} className="max-w-lg w-[70%] bg-bgColorPrimary p-5">
        <button className="flex justify-center items-center bg-primary p-4 rounded-lg text-white w-full">
          <p>Back to Menu</p>
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmedPage;
