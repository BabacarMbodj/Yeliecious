module.exports = class Order {
    constructor(products, dueDate, orderStatus, history) {
        this.id = null;
        this.products = products;
        this.activityDate = new Date().toISOString();
        this.dueDate = dueDate;
        this.orderStatus = orderStatus;
        this.history = history;
    }
};