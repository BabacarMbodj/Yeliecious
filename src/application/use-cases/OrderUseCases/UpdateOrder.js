const Order = require("../../../entities/Order");

module.exports = (OrderRepository) => {

    async function Execute(id, products, activityDate, dueDate, orderStatus, history) {

        let newOrder = new Order(products, activityDate, dueDate, orderStatus, history);
        return OrderRepository.updateOrder(id, newOrder);

    }

    return { Execute };

};