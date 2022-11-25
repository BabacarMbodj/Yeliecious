const { application } = require("express");
const GetAllCustomers = require("../application/use-cases/CustomerUseCases/GetAllCustomers");


module.exports = (dependencies) => {

    const CustomerRepository = dependencies.DatabaseService.customerRepository;

    const getAllCustomers = async (req, res) => {

        const GetAllCustomersQuery = GetAllCustomers(CustomerRepository);
        let customer = await GetAllCustomersQuery.Execute(req.params.phone);

        if (customer == 'error')
            res.status(400).send('Bad Request');

        else if (customer != '' && customer != null)
            res.status(200).send(customer);
        else
            res.send("Customer does not exist yet");

    }


    return {
        getAllCustomers
    }

}
