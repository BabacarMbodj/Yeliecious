const Customer = require("../../../entities/Customer");

module.exports = (CustomerRepository) => {

    async function Execute(id, name, phone, email) {

        let newCustomer = new Customer(name, phone, email);
        return CustomerRepository.updateCustomer(id, newCustomer);

    }

    return { Execute };

};