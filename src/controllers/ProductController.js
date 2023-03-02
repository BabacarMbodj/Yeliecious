const { application } = require("express");
const Product = require('../entities/Product');
const GetAllProducts = require("../application/use-cases/ProductUseCases/GetAllProducts");
const GetProduct = require("../application/use-cases/ProductUseCases/GetProduct");
const AddProduct = require("../application/use-cases/ProductUseCases/AddProduct");
const errorController = require("./errorController");
const successController = require("./successController");
const UpdateProduct = require("../application/use-cases/ProductUseCases/UpdateProduct");
const DeleteProduct = require("../application/use-cases/ProductUseCases/DeleteProduct");

module.exports = (dependencies) => {

    const ProductRepository = dependencies.DatabaseService.productRepository;

    const getAllProducts = async (req, res) => {

        const GetAllProductsQuery = GetAllProducts(ProductRepository);
        let result = await GetAllProductsQuery.Execute();

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else if (result.body != '' && result.body != null) {
            res.status(200).send(result.body);
        }
        else
            res.send("No products yet :-) ...");

    }

    const getProduct = async (req, res) => {

        const GetProductQuery = GetProduct(ProductRepository);
        let result = await GetProductQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else {
            successController("Product", result.body, res);
        }

    }


    const addProduct = async (req, res) => {

        const AddProductQuery = AddProduct(ProductRepository);
        let result = await AddProductQuery.Execute(req.body.type, req.body.size, req.body.sizeDescriptor, req.body.flavours, req.body.shape);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(201).send("Product successfully created");
    }

    const updateProduct = async (req, res) => {

        const UpdateProductQuery = UpdateProduct(ProductRepository);
        let result = await UpdateProductQuery.Execute(req.params.id, req.body.type, req.body.size, req.body.sizeDescriptor, req.body.flavours, req.body.shape);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(200).send("Product successfully updated");

    }

    const deleteProduct = async (req, res) => {
        const DeleteProductQuery = DeleteProduct(ProductRepository);
        let result = await DeleteProductQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(200).send("Product successfully deleted");

    }



    return {
        getAllProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct
    }

}