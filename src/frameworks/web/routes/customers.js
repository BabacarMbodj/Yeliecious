const express = require('express');
const CustomerController = require('../../../controllers/CustomerController');

const customersRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = CustomerController(dependencies);

    router.route('/')
        .get(controller.getAllCustomers);


    return router;
};


module.exports = customersRouter;