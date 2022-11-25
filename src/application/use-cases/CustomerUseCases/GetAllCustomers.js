module.exports = (CustomerRepository) => {

    async function Execute(phone) {

        return CustomerRepository.getAllCustomers(phone);

    }

    return { Execute };

};