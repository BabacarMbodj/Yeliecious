const { application } = require("express");
const Product = require('../entities/Product');
const GetAllProducts = require("../application/use-cases/ProductUseCases/GetAllProducts");
const GetProduct = require("../application/use-cases/ProductUseCases/GetProduct");
const GetProductByType = require("../application/use-cases/ProductUseCases/GetProductByType");
const AddProduct = require("../application/use-cases/ProductUseCases/AddProduct");
/*const UpdateProduct = require("../application/use-cases/ProductUseCases/UpdateProduct");
const DeleteProduct = require("../application/use-cases/ProductUseCases/DeleteProduct");
*/
module.exports = (dependencies) => {

    const ProductRepository = dependencies.DatabaseService.productRepository;

    const getAllProducts = async (req, res) => {

        const GetAllProductsQuery = GetAllProducts(ProductRepository);
        let products = await GetAllProductsQuery.Execute();

        if (products == 'error')
            res.status(400).send('Bad Request');

        else if (products != '' && products != null) {
            //  res.status(200).send(products);
            res.status(200).send(products);
        }
        else
            res.send("No products yet :-) ...");

    }

    const getProduct = async (req, res) => {

        const GetProductQuery = GetProduct(ProductRepository);
        let product = await GetProductQuery.Execute(req.params.id);

        if (product == 'error')
            res.status(400).send('Bad Request');

        else if (product != '' && product != null)
            res.status(200).send(product);
        else
            res.send("Product does not exist yet");

    }

    const getProductByType = async (req, res) => {
        const GetProductByTypeQuery = GetProductByType(ProductRepository);
        let product = await GetProductByTypeQuery.Execute(req.params.productType);

        if (product == 'error')
            res.status(400).send('Bad Request');

        else if (product != '' && product != null)
            res.status(200).send(product);
        else
            res.send("Product does not exist yet");
    }


    const addProduct = async (req, res) => {
        const GetProductByTypeQuery = GetProductByType(ProductRepository);
        let product = await GetProductByTypeQuery.Execute(req.body.type);

        if (product == 'error')
            res.status(400).send('Bad Request');

        else {
            if (product == '' || product == null) {

                const AddProductQuery = AddProduct(ProductRepository);
                let result = await AddProductQuery.Execute(req.body.type, req.body.size, req.body.sizeDescriptor, req.body.flavours, req.body.shape);

                if (result == 'error')
                    res.status(500).send('An error happened, try again later');
                else res.status(201).send(result);
            }
            else
                res.send("Product already exists");
        }
    }

    return {
        getAllProducts,
        getProduct,
        getProductByType,
        addProduct
    }

}