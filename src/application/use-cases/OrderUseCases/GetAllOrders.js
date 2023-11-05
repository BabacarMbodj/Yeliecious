module.exports = (OrderRepository) => {

    async function Execute() {

        return OrderRepository.getAllOrders();

    }

    return { Execute };

};