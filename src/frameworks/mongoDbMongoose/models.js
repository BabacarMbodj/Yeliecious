const mongoose = require("mongoose");
const schemas = require("./schemas");


module.exports =
{

    AvailabilityModel: mongoose.model("Availability", new mongoose.Schema(schemas.availabilitySchema)),
    ProductModel: mongoose.model("Product", new mongoose.Schema(schemas.productSchema)),
    OrderModel: mongoose.model("Order", new mongoose.Schema(schemas.orderSchema))
}