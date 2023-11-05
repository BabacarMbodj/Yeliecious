module.exports = (OrderRepository) => {

    async function Execute(id, orderStatus, activityDate) {

        return OrderRepository.updateOrderStatus(id, orderStatus, activityDate);

    }

    return { Execute };

};