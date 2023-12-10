// CounterButton.js
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';

const CounterButton = ({ onQuantityChange }) => {
  const [count, setCount] = useState(1);

  // handle plus button
  const increment = () => {
    setCount(count + 1);
    onQuantityChange(count + 1);
  };

  // handle minus button
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onQuantityChange(count - 1);
    }
  };

  return (
    <div className="flex items-center gap-x-5 w-[25%] justify-between">
      <button
        onClick={decrement}
        className="text-primary border-2 border-primary rounded-full p-1"
      >
        <AiOutlineMinus size={15} />
      </button>
      <span className={``}>{count}</span>

      <button
        onClick={increment}
        className="text-white border-2 border-primary bg-primary rounded-full p-1 "
      >
        <AiOutlinePlus size={15} />
      </button>
    </div>
  );
};

export default CounterButton;
