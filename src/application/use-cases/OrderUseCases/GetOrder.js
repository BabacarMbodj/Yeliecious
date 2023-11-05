module.exports = (OrderRepository) => {

    async function Execute(id) {

        return OrderRepository.getOrder(id);

    }

    return { Execute };

};