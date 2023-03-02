const express = require('express');
const ProductController = require('../../../controllers/ProductController');

// products - api/YelieCious
// load dependencies
const productsRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = ProductController(dependencies);

    router.route('/')
        .get(controller.getAllProducts)
        .post(controller.addProduct);

    router.route('/:id')
        .get(controller.getProduct)
        .put(controller.updateProduct)
        .delete(controller.deleteProduct);
    return router;
};


module.exports = productsRouter;