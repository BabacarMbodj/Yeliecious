require('dotenv').config();
const ProductRepository = require("../../../application/contracts/ProductRepository");
const models = require("../models");
const Product = models.ProductModel;

module.exports = class mongoProductRepository extends ProductRepository {

    constructor() {
        super();
    };


    async getAllProducts() {
        return await Product.find({});
    }

    async getProduct(id) {
        try {
            return await Product.findById(id);
        }
        catch (err) {
            console.log(err);
            return "error";
        }

    }

    async getProductByType(productType) {
        try {
            return await Product.find({ type: productType });
        }
        catch (err) {
            console.log(err);
            return "error";
        }
    }


    async addProduct(newProduct) {
        const productToCreate = new Product({
            type: newProduct.type,
            size: newProduct.size,
            sizeDescriptor: newProduct.sizeDescriptor,
            flavours: newProduct.flavours,
            shape: newProduct.shape
        });

        try {
            return await productToCreate.save();
        }
        catch (err) {
            console.log(err);
            return "error";
        }
    }

}
