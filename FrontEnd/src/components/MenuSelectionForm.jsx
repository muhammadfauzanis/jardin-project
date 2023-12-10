const MenuSelectionForm = ({ name, type1, type2, type3 }) => {
  return (
    <form className="pt-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="flex flex-col text-md mt-5">
        <div className="flex items-center justify-between mb-2">
          <label className="mr-2" htmlFor="normalIce1">
            {type1}
          </label>
          <input type="radio" name="iceType" id="normalIce1" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="mr-2" htmlFor="normalIce2">
            {type2}
          </label>
          <input type="radio" name="iceType" id="normalIce2" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <label className="mr-2" htmlFor="normalIce3">
            {type3}
          </label>
          <input type="radio" name="iceType" id="normalIce3" />
        </div>
      </div>
    </form>
  );
};

export default MenuSelectionForm;
