require('dotenv').config();
const mongoose = require("mongoose");
const AvailabilityRepository = require("./Repositories/mongoAvailabilityRepository");
const CustomerRepository = require("./Repositories/mongoCustomerRepository");
const ProductRepository = require("./Repositories/mongoProductRepository");
module.exports = class mongoDatabaseServices {

    availabilityRepository = new AvailabilityRepository();
    customerRepository = new CustomerRepository();
    productRepository = new ProductRepository();

    initDatabase(callback) {
        mongoose.connect(process.env.MONGO_CRED, { serverSelectionTimeoutMS: 5000 }, function (err) {
            if (err) {
                console.log("Connection to Database failed, please retry later");
            }

            else {
                console.log("Connected to database");
                callback();
            }

        });

    };
}

