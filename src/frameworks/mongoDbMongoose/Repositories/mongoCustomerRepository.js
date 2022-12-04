require('dotenv').config();
const CustomerRepository = require("../../../application/contracts/CustomerRepository");
const models = require("../models");
const Customer = models.CustomerModel;

module.exports = class mongoCustomerRepository extends CustomerRepository {


    constructor() {
        super();
    };

    async getAllCustomers() {
        try {
            return await Customer.find({});
        }
        catch (err) {
            return "error";
        }
    }

    async getCustomerByPhone(customerPhone) {

        try {
            return await Customer.find({ phone: customerPhone });
        }
        catch (err) {
            return "error";
        }
    }

    async addCustomer(newCustomer) {
        const customerToCreate = new Customer({
            name: newCustomer.name,
            phone: newCustomer.phone,
            email: newCustomer.email
        });

        try {
            return await customerToCreate.save();
        }
        catch (err) {
            return "error";
        }
    }


    async getCustomer(customerId) {
        try {
            return await Customer.findById(customerId);
        }
        catch (err) {
            return "error";
        }
    }

    async updateCustomer(customerId, newCustomer) {



        try {
            return await Customer.findByIdAndUpdate(customerId, {
                $set: { name: newCustomer.name, phone: newCustomer.phone, email: newCustomer.email }
            });
        }
        catch (err) {
            return "error";
        }
    }

    async deleteCustomer(customerId) {
        try {
            return await Customer.findByIdAndDelete(customerId);
        }
        catch (err) {
            return "error";
        }
    }

}