import { Link } from 'react-router-dom';

const ButtonBackToMenu = () => {
  return (
    <Link to={'/'} className="max-w-lg w-[70%] p-5">
      <button className="flex justify-center items-center bg-primary p-4 rounded-lg text-white w-full">
        <p>Back to Menu</p>
      </button>
    </Link>
  );
};

export default ButtonBackToMenu;
