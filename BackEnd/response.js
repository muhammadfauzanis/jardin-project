const response = (statusCode, data, message, res) => {
  res.json(statusCode, [
    {
      data: data,
      message,
    },
  ]);
};

module.exports = response;
