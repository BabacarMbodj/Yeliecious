require('dotenv').config();
const ProductRepository = require("../../../application/contracts/ProductRepository");
const models = require("../models");
const Product = models.ProductModel;

module.exports = class mongoProductRepository extends ProductRepository {

    constructor() {
        super();
    };


    async getAllProducts() {
        try {
            let products = await Product.find({});
            const result =
            {
                type: "success",
                body: products
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

        }

    }

    async getProduct(id) {
        try {
            let product = await Product.findById(id);
            const result =
            {
                type: "success",
                body: product
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

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
            let product = await productToCreate.save();

            const result =
            {
                type: "success",
                body: product
            }

            return result;
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }

            return error;
        }
    }


    async updateProduct(productId, newProduct) {
        try {
            let product = await Product.findByIdAndUpdate(productId, {
                $set: { type: newProduct.type, size: newProduct.size, sizeDescriptor: newProduct.sizeDescriptor, flavours: newProduct.flavours, shape: newProduct.shape }
            }, { new: true });

            const result =
            {
                type: "success",
                body: product
            }

            return result;

        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }
            return result;
        }
    }

    async deleteProduct(productId) {
        try {
            let product = await Product.findByIdAndDelete(productId);
            const result =
            {
                type: "success",
                body: product
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }
            return result;
        }
    }

}
