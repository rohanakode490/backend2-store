const getALLProductsStatic = async (req, res) => {
//   throw new Error("testing async errors");
  res.status(200).json({ msg: `products testing routes` });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: `products route` });
};

module.exports = { getALLProductsStatic, getAllProducts };
