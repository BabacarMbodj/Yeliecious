const mongoose = require("mongoose");
const schemas = require("./schemas");


module.exports =
{

    AvailabilityModel: mongoose.model("Availability", new mongoose.Schema(schemas.availabilitySchema)),
    CustomerModel: mongoose.model("Customer", new mongoose.Schema(schemas.customerSchema)),
    ProductModel: mongoose.model("Product", new mongoose.Schema(schemas.productSchema))
}