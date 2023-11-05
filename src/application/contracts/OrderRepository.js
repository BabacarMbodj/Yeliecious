module.exports = class OrderRepository {
    constructor() { }


    getOrder(id) {
        return Promise.reject(new Error('not implemented'));
    }

    getOrderByDueDate(dateToFind) {
        return Promise.reject(new Error('not implemented'));
    }

    getAllOrders() {
        return Promise.reject(new Error('not implemented'));
    }

    updateOrder(id, newOrder) {
        return Promise.reject(new Error('not implemented'));
    }

    updateOrderStatus(id, orderStatus, activityDate) {
        return Promise.reject(new Error('not implemented'));
    }

    deleteOrder(id) {
        return Promise.reject(new Error('not implemented'));
    }
}