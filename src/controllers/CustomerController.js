const { application } = require("express");
const Customer = require('../entities/Customer');
const GetAllCustomers = require("../application/use-cases/CustomerUseCases/GetAllCustomers");
const GetCustomer = require("../application/use-cases/CustomerUseCases/GetCustomer");
const GetCustomerByPhone = require("../application/use-cases/CustomerUseCases/GetCustomerByPhone");
const AddCustomer = require("../application/use-cases/CustomerUseCases/AddCustomer");
const UpdateCustomer = require("../application/use-cases/CustomerUseCases/UpdateCustomer");
const DeleteCustomer = require("../application/use-cases/CustomerUseCases/DeleteCustomer");

module.exports = (dependencies) => {

    const CustomerRepository = dependencies.DatabaseService.customerRepository;

    const getAllCustomers = async (req, res) => {

        const GetAllCustomersQuery = GetAllCustomers(CustomerRepository);
        let customer = await GetAllCustomersQuery.Execute();

        if (customer == 'error')
            res.status(400).send('Bad Request');

        else if (customer != '' && customer != null)
            res.status(200).send(customer);
        else
            res.send("No customers yet :-) ...");

    }


    const getCustomerByPhone = async (req, res) => {

        const GetCustomerByPhoneQuery = GetCustomerByPhone(CustomerRepository);
        let customer = await GetCustomerByPhoneQuery.Execute(req.params.phoneToFind);


        if (customer == 'error')
            res.status(400).send('Bad Request');

        else if (customer != '' && customer != null)
            res.status(200).send(customer);
        else
            res.send("Customer does not exist yet");

    }

    const getCustomer = async (req, res) => {

        const GetCustomerQuery = GetCustomer(CustomerRepository);
        let customer = await GetCustomerQuery.Execute(req.params.id);

        if (customer == 'error')
            res.status(400).send('Bad Request');

        else if (customer != '' && customer != null)
            res.status(200).send(customer);
        else
            res.send("Customer does not exist yet");

    }

    const addCustomer = async (req, res) => {
        const GetCustomerByPhoneQuery = GetCustomerByPhone(CustomerRepository);
        let customer = await GetCustomerByPhoneQuery.Execute(req.body.phone);

        if (customer == 'error')
            res.status(400).send('Bad Request');

        else {
            if (customer == '' || customer == null) {
                const AddCustomerQuery = AddCustomer(CustomerRepository);
                let result = await AddCustomerQuery.Execute(req.body.name, req.body.phone, req.body.email);

                if (result == 'error')
                    res.status(500).send('An error happened, try again later');
                else res.status(201).send(result);
            }
            else
                res.send("Customer already exists");
        }
    }

    const updateCustomer = async (req, res) => {
        const GetCustomerQuery = GetCustomer(CustomerRepository);
        let customer = await GetCustomerQuery.Execute(req.params.id);

        if (customer == 'error')
            res.status(400).send('Bad Request');
        else {
            if (customer != '' && customer != null) {


                const UpdateCustomerQuery = UpdateCustomer(CustomerRepository);
                let result = await UpdateCustomerQuery.Execute(req.params.id, req.body.name, req.body.phone, req.body.email);

                if (result == 'error')
                    res.status(400).send('Bad request')
                else
                    res.status(200).send('Customer successfully updated');

            }
            else
                res.send('Customer does not exist');
        }


    }

    const deleteCustomer = async (req, res) => {
        const GetCustomerQuery = GetCustomer(CustomerRepository);
        let customer = await GetCustomerQuery.Execute(req.params.id);

        if (customer == 'error')
            res.status(400).send('Bad Request');
        else {
            if (customer != '' && customer != null) {


                const DeleteCustomerQuery = DeleteCustomer(CustomerRepository);
                let result = await DeleteCustomerQuery.Execute(req.params.id);

                if (result == 'error')
                    res.status(400).send('Bad request')
                else
                    res.status(200).send('Customer successfully deleted');

            }
            else
                res.send('Customer does not exist');
        }



    }

    return {
        getAllCustomers,
        addCustomer,
        getCustomerByPhone,
        getCustomer,
        updateCustomer,
        deleteCustomer
    }

}
