const Customer = require("../../../entities/Customer");


module.exports = (CustomerRepository) => {

    async function Execute(name, phone, email) {


        let newCustomer = new Customer(name, phone, email);
        return await CustomerRepository.addCustomer(newCustomer);

    }
    return { Execute };

};