const Product = require("../models/product");

const getALLProductsStatic = async (req, res) => {
  const search = "z";
  // const products = await Product.find({
  //   name: {$regex:search, $options:'i'}, //i is for case insensitive
  // });

  // SORT property
  // const products = await Product.find({}).sort("-name price");
  
  // SELECT property 
  const products = await Product.find({}).select("name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // names are given by programmer 
  const { featured, company, name, sort, fields } = req.query;

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // console.log(queryObject);
  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(" ");
    result = result.sort(sortList)
  }
  else{
    result = result.sort('createdAt')
  }

  if(fields){
    const fieldsList = fields.split(',').join(" ");
    result = result.select(fieldsList)
  }

  const products = await result

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getALLProductsStatic, getAllProducts };
