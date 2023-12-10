import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helper } from '../Helper/Helper';
import ButtonCheckOut from './ButtonCheckOut';

const ProductCard = () => {
  const { baseURLAPI, formatPrice } = Helper();
  const [allProducts, setAllProducts] = useState([]);

  const fetchDataProduct = async () => {
    try {
      const response = await axios.get(baseURLAPI('products'));
      console.log(response.data[0].data);
      setAllProducts(response.data[0].data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  // Mengelompokkan produk berdasarkan kategori
  const groupedProducts = allProducts.reduce((acc, product) => {
    const categoryID = product.category._id;
    if (!acc[categoryID]) {
      acc[categoryID] = {
        category: product.category,
        items: [],
      };
    }
    acc[categoryID].items.push(product);
    return acc;
  }, {});

  return (
    <div className="pt-32 p-3 ">
      {Object.values(groupedProducts).map((group) => (
        <div key={group.category._id} className="">
          <h1
            className="text-lg text-primary px-5 font-semibold"
            id={group.category.name}
          >
            {group.category.name}
          </h1>
          <div className="grid grid-cols-2 gap-5 mb-5">
            {group.items.map((product) => (
              <Link
                to={{
                  pathname: `/product-detail`,
                  search: `?productID=${product._id}`,
                  state: { productId: product._id },
                }}
                key={product.productName}
              >
                <div className="p-4 rounded-xl shadow-lg min-h-full">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="rounded-xl w-full h-40 object-cover mb-4 shadow-md"
                  />
                  <div className="px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm md:text-md max-w-[70%] line-clamp-1 font-bold uppercase ">
                        {product.productName}
                      </h3>
                      <p className="text-xs md:text-sm text-primary font-semibold ">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                    <p className="text-xs text-justify line-clamp-3 text-gray-500 opacity-70">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <ButtonCheckOut />
    </div>
  );
};

export default ProductCard;
