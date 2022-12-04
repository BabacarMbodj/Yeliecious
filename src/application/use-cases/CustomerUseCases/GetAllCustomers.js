module.exports = (CustomerRepository) => {

    async function Execute() {

        return CustomerRepository.getAllCustomers();

    }

    return { Execute };

};