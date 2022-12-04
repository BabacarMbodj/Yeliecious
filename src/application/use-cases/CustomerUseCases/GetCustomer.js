module.exports = (CustomerRepository) => {

    async function Execute(id) {

        return CustomerRepository.getCustomer(id);

    }

    return { Execute };

};