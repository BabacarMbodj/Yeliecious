const express = require('express');
const OrderController = require('../../../controllers/OrderController');

// orders - api/YelieCious
// load dependencies
const ordersRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = OrderController(dependencies);
    router.route('/').get(controller.getAllOrders);

    router.route('/:id')
        .get(controller.getOrder)
        .put(controller.updateOrder)
        .delete(controller.deleteOrder);

    router.route('/deadline/:dateToFind')
        .get(controller.getOrderByDueDate);

    router.route('/:id/status')
        .put(controller.updateOrderStatus);

    /*   .delete(controller.deleteOrder);
       */
    return router;
};


module.exports = ordersRouter;