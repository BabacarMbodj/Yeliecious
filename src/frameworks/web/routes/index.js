const express = require('express');
const availabilities = require('./availabilities');
const customers = require("./customers");
const products = require("./products");
const apiRouter = (dependencies) => {
    const routes = express.Router();

    const availabilitiesRouter = availabilities(dependencies);
    const customersRouter = customers(dependencies);
    const productsRouter = products(dependencies);

    routes.get('/', function (req, res) {
        res.send('Birds home page');
    });

    routes.use('/api/availabilities', availabilitiesRouter);
    routes.use('/api/customers', customersRouter);
    routes.use('/api/products', productsRouter);

    return routes;

};


module.exports = apiRouter;