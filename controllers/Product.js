const Product = require("../models/Product");
const ProductService = require("../services/productService")

/* ==================
            Products CRUD
======================*/


//Added by me
//This API is working perfectly and fetching the data from data (if exists)
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    console.log("In Fetch All Products Controlller")
    res.json({ data: products, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// // create product  -- create -- post
const createProduct = async (req, res) => {
  // TODO: response 200 but displaying null 
  //u need to create a servide for post , patch and delete operations
  
  try {
    console.log("In Create Products Controlller")
    const product = new Product(req.body); // get data from body or used to post data
    debugger;
    const createProduct = await product.save();
    res.status(201).json(createProduct);   // status(201) to post data
  } catch (e) {
    res.status(400).send(e);
  }
};

//            User base
// fetch all products -- get -- read 
const fetchAllProducts = async (req, res) => {
   // TODO: response 200 but displaying null
  console.log("In Fetch All Products Controlller")
  let condition = {};
  if(!req.query.admin){
    condition.deleted = true;
  }
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  // category filter
  if(req.query.category){
    query = query.find({category:req.query.category});
    totalProductsQuery = totalProductsQuery.find({category:req.query.category});
  }

  // // brand filter
  if(req.query.brand){
    query =  query.find({brand:req.query.brand});
    totalProductsQuery = totalProductsQuery.find({brand:req.query.brand});
  }

  //  // for sorting filter
   if(req.query._sort && req.query._order){
    // TODO: Sorting through discounted price
    query = query.sort({[req.query._sort]:req.query._order});
    totalProductsQuery = totalProductsQuery.sort({[req.query._sort]:req.query._order});
  }

  // // pagination filter
   const totalDocs = await totalProductsQuery.count().exec(); // no. of documents
  if(req.query._page && req.query._limit){
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
    totalProductsQuery = totalProductsQuery.skip(pageSize * (page - 1)).limit(pageSize);
  }

 

  try {
    // we need all query strings
    const product = await query.exec();
    res.set("X-Total-Count", totalDocs); // set header 
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
};

// fetch product by id -- get -- read
const fetchProductById = async (req, res) => {
  console.log("In fetchProductById Products Controlller")
  const {id}= req.params;
  try {
    const product = await Product.findById(id).exec();
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
};

// update product -- update -- PATCH
const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = createProduct;
module.exports = fetchAllProducts;
module.exports = fetchProductById;
module.exports = updateProduct;
module.exports = getAllProducts;
