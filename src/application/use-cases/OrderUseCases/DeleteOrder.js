module.exports = (OrderRepository) => {

    async function Execute(id) {
        return OrderRepository.deleteOrder(id);
    }

    return { Execute };

};