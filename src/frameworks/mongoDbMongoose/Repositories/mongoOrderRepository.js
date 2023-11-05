require('dotenv').config();
const OrderRepository = require("../../../application/contracts/OrderRepository");
const models = require("../models");
const Order = models.OrderModel;

module.exports = class mongoOrderRepository extends OrderRepository {


    constructor() {
        super();
    };

    async getOrder(id) {
        try {
            let order = await Order.findById(id);
            const result =
            {
                type: "success",
                body: order
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

        }

    }

    async getOrderByDueDate(dateToFind) {

    }

    async getOrderByDueDate(dateToFind) {
        try {
            let orders = await Order.find({ dueDate: dateToFind });
            const result =
            {
                type: "success",
                body: orders
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

        }

    }

    async getAllOrders() {
        try {
            let orders = await Order.find({});
            const result =
            {
                type: "success",
                body: orders
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

        }

    }

    async updateOrder(orderId, newOrder) {
        try {
            return await Order.findByIdAndUpdate(orderId, {
                $set: { products: newOrder.products, activityDate: newOrder.activityDate, dueDate: newOrder.dueDate, orderStatus: newOrder.orderStatus, history: newOrder.history }
            });
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }
            return error;
        }
    }

    async updateOrderStatus(orderId, orderStatus, activityDate) {
        try {
            return await Order.findByIdAndUpdate(orderId, {
                $set: { orderStatus: orderStatus, activityDate: activityDate }
            });
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }
            return error;
        }
    }

    async deleteOrder(id) {

        try {
            return await Order.findByIdAndDelete(id);
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }

            return error;
        }
    }

}