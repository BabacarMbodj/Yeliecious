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

}