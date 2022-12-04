const express = require('express');
const CustomerController = require('../../../controllers/CustomerController');

const customersRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = CustomerController(dependencies);

    router.route('/')
        .get(controller.getAllCustomers)
        .post(controller.addCustomer);

    router.route('/byphone/:phoneToFind')
        .get(controller.getCustomerByPhone);

    router.route('/:id')
        .get(controller.getCustomer)
        .put(controller.updateCustomer)
        .delete(controller.deleteCustomer);

    return router;
};


module.exports = customersRouter;