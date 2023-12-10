export const Helper = () => {
  const formatPrice = (price) => {
    // Check if the price is a valid number
    if (isNaN(price)) {
      return 'Invalid Price';
    }

    // Convert the price to a number
    const numericPrice = Number(price);

    // Check if the number is greater than or equal to 1000
    if (numericPrice >= 1000) {
      // Divide the price by 1000 and round to two decimal places
      const formattedPrice = numericPrice / 1000;

      // Add 'k' to indicate thousands and return the formatted price
      return `${formattedPrice} K`;
    }

    // If the price is less than 1000, return it as is
    return price.toString();
  };

  const baseURLAPI = (url = '') => {
    url = url.replace(/^[/]/g, '');
    const baseURL = 'http://localhost:9000/';
    return baseURL + url;
  };

  //   const descriptionShort = (description = '') => {
  //     if (description.length > 80) {
  //       description = description.slice(0, 80) + '...';
  //     }
  //     return description;
  //   };

  return {
    formatPrice,
    baseURLAPI,
    // descriptionShort,
  };
};
