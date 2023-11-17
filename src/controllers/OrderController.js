const { application } = require("express");
const Order = require('../entities/Order');
const GetAllOrders = require("../application/use-cases/OrderUseCases/GetAllOrders");
const GetOrderByDueDate = require("../application/use-cases/OrderUseCases/GetOrderByDueDate");
const GetOrder = require("../application/use-cases/OrderUseCases/GetOrder");
const UpdateOrder = require("../application/use-cases/OrderUseCases/UpdateOrder");
const UpdateOrderStatus = require("../application/use-cases/OrderUseCases/UpdateOrderStatus");
const DeleteOrder = require("../application/use-cases/OrderUseCases/DeleteOrder");
const errorController = require("./errorController");
const successController = require("./successController");
module.exports = (dependencies) => {

    const OrderRepository = dependencies.DatabaseService.orderRepository;

    const getAllOrders = async (req, res) => {

        const GetAllOrdersQuery = GetAllOrders(OrderRepository);
        let result = await GetAllOrdersQuery.Execute();

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else if (result.body != '' && result.body != null) {
            res.status(200).send(result.body);
        }
        else
            res.send("No orders yet :-) ...");

    }

    const getOrderByDueDate = async (req, res) => {

        const GetOrderByDueDateQuery = GetOrderByDueDate(OrderRepository);
        let result = await GetOrderByDueDateQuery.Execute(req.params.dateToFind);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else if (result.body != '' && result.body != null) {
            res.status(200).send(result.body);
        }
        else
            res.send("No orders yet :-) ...");

    }


    const getOrder = async (req, res) => {

        const GetOrderQuery = GetOrder(OrderRepository);
        let result = await GetOrderQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else {
            successController("Order", result.body, res);
        }

    }

    const updateOrder = async (req, res) => {

        const UpdateOrderQuery = UpdateOrder(OrderRepository);
        let result = await UpdateOrderQuery.Execute(req.params.id, req.body.products, req.body.dueDate, req.body.orderStatus, req.body.history);

        if (result.type == 'error') {
            // errorController(result.body, res);
            res.status(400).send(result);
        }
        else
            res.status(204).send("Order successfully updated");

    }

    const updateOrderStatus = async (req, res) => {

        let activityDate = new Date().toISOString();
        const UpdateOrderStatusQuery = UpdateOrderStatus(OrderRepository);
        let result = await UpdateOrderStatusQuery.Execute(req.params.id, req.body.orderStatus, activityDate);

        if (result.type == 'error') {
            // errorController(result.body, res);
            res.status(400).send(result);
        }
        else
            res.status(204).send("Order status successfully updated");

    }

    const deleteOrder = async (req, res) => {

        const DeleteOrderQuery = DeleteOrder(OrderRepository);
        let result = await DeleteOrderQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(204).send("Order successfully deleted");
    };

    return {
        getAllOrders,
        getOrderByDueDate,
        getOrder,
        updateOrder,
        updateOrderStatus,
        deleteOrder
    }
}