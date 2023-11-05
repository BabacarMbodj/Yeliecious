const express = require('express');
const availabilities = require('./availabilities');
const products = require("./products");
const orders = require("./orders");
const apiRouter = (dependencies) => {
    const routes = express.Router();

    const availabilitiesRouter = availabilities(dependencies);
    const productsRouter = products(dependencies);
    const ordersRouter = orders(dependencies);

    routes.get('/', function (req, res) {
        res.send('Welcome to Yeliecious');
    });

    routes.use('/api/availabilities', availabilitiesRouter);
    routes.use('/api/products', productsRouter);
    routes.use('/api/orders', ordersRouter);

    return routes;

};


module.exports = apiRouter;