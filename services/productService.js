const ProductModal = require("../models/Product")


//getAllProducts service
exports.getAllProducts = async () => {
    return await ProductModal.find();
}



//createProduct service
exports.createProduct = async (product) => {
    return await ProductModal.create(product);
}