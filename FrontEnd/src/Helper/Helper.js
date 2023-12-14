export const Helper = () => {
  const formatPrice = (price) => {
    if (isNaN(price)) {
      return 'Invalid Price';
    }

    const numericPrice = Number(price);

    if (numericPrice >= 1000) {
      const formattedPrice = numericPrice / 1000;

      return `${formattedPrice} K`;
    }

    return price.toString();
  };

  const baseURLAPI = (url = '') => {
    url = url.replace(/^[/]/g, '');
    const baseURL = 'https://jardin-api.vercel.app/';
    // const baseURL = 'http://localhost:9000/';
    return baseURL + url;
  };

  return {
    formatPrice,
    baseURLAPI,
  };
};
