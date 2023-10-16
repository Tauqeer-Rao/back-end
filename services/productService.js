const ProductModal = require("../models/Product")


//getAllProducts service
exports.getAllProducts = async () => {
    return await ProductModal.find();
}

