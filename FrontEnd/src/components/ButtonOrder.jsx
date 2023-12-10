const ButtonOrder = ({ onSubmit }) => {
  return (
    <div className="max-w-lg w-full bg-bgColorPrimary p-5 fixed bottom-0 left-0 md:left-1/2 md:-translate-x-1/2">
      <button
        className="flex justify-center items-center bg-primary p-4 rounded-lg text-white w-full"
        onClick={onSubmit}
        type="submit"
      >
        <p>Order Now</p>
      </button>
    </div>
  );
};

export default ButtonOrder;
