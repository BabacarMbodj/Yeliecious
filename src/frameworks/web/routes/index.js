const express = require('express');
const availabilities = require('./availabilities');
const customers = require("./customers");
const apiRouter = (dependencies) => {
    const routes = express.Router();

    const availabilitiesRouter = availabilities(dependencies);
    const customersRouter = customers(dependencies);

    routes.get('/', function (req, res) {
        res.send('Birds home page');
    });
    routes.use('/availabilities', availabilitiesRouter);
    routes.use('/customers', customersRouter);


    return routes;

};


module.exports = apiRouter;