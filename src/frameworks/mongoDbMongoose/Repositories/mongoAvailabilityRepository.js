require('dotenv').config();
const AvailabilityRepository = require("../../../application/contracts/AvailabilityRepository");
const models = require("../models");
const Availability = models.AvailabilityModel;


module.exports = class mongoAvailabilityRepository extends AvailabilityRepository {


    constructor() {
        super();
    };


    async getAvailability(id) {
        try {
            return await Availability.findById(id);
        }
        catch (err) {
            console.log(err);
            return "error";
        }

    }

    async getAvailabilityByDate(dateToFind) {

        try {
            return await Availability.find({ availableDate: dateToFind }).exec();
        }
        catch (err) {
            console.log(err);
            return "error";
        }


    }

    async getAllAvailabilities() {
        return await Availability.find({ availableDate: { $lte: new Date().toISOString() } });
    }

    async addAvailability(newAvailability) {

        const availabilityToCreate = new Availability(
            {
                availableDate: newAvailability.availableDate,
                spots: newAvailability.spots,
                isFull: newAvailability.isFull
            });

        try {
            return await availabilityToCreate.save();
        }
        catch (err) {
            console.log(err);
            return "error";
        }


    }

    async updateAvailability(id, newAvailability) {

        try {
            return await Availability.findByIdAndUpdate(id, {
                $set: { availableDate: newAvailability.availableDate, spots: newAvailability.spots }
            });
        }
        catch (err) {
            console.log(err);
            return "error";
        }
    }

    async deleteAvailability(id) {

        try {
            return await Availability.findByIdAndDelete(id);
        }
        catch (err) {
            console.log(err);
            return "error";

        }
    }

}