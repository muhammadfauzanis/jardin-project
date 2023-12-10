import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Helper } from '../Helper/Helper';

const CategoryBar = () => {
  const { baseURLAPI } = Helper();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchDataProduct = async () => {
    try {
      const response = await axios.get(baseURLAPI('category'));
      // console.log(response.data.categorys);
      setAllProducts(response.data.categorys);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  // allProducts.map((item) => {
  //   console.log(item.category.name);
  // });

  return (
    <div className="w-[85%] flex gap-x-6 mx-auto overflow-x-auto scroll-smooth scrollbar-hide transition duration-300">
      {allProducts.map((item) => (
        <Link
          key={item._id}
          to={item.name}
          smooth={true}
          duration={500}
          offset={-120}
          onClick={() => setSelectedCategory(item._id)}
        >
          <button
            className={`font-semibold cursor-pointer transition duration-500 ease-linear ${
              selectedCategory === item._id
                ? 'border-b-4 border-primary text-primary'
                : 'text-secondary'
            } `}
            key={item.name}
          >
            <div className="">
              <p>{item.name}</p>
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CategoryBar;
