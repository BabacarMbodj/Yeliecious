module.exports = (CustomerRepository) => {

    async function Execute(id) {

        return CustomerRepository.deleteCustomer(id);

    }

    return { Execute };

};