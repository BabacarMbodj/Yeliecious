module.exports = (OrderRepository) => {

    async function Execute(dateToFind) {

        return OrderRepository.getOrderByDueDate(dateToFind);

    }

    return { Execute };

};