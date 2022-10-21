const mongoose = require("mongoose");
const schemas = require("./schemas");


module.exports =
{

    AvailabilityModel: mongoose.model("Availability", new mongoose.Schema(schemas.availabilitySchema))

}