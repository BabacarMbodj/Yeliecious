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
            let availability = await Availability.findById(id);
            const result =
            {
                type: "success",
                body: availability
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

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
        try {
            let availabilities = await Availability.find({ availableDate: { $gte: new Date().toISOString() } });
            const result =
            {
                type: "success",
                body: availabilities
            }

            return result;
        }
        catch (err) {
            const result =
            {
                type: "error",
                body: err
            }

            return result;

        }
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
            const error =
            {
                type: "error",
                body: err
            }

            return error;
        }
    }

    async updateAvailability(id, newAvailability) {

        try {
            return await Availability.findByIdAndUpdate(id, {
                $set: { availableDate: newAvailability.availableDate, spots: newAvailability.spots }
            });
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }

            return error;
        }
    }

    async deleteAvailability(id) {

        try {
            return await Availability.findByIdAndDelete(id);
        }
        catch (err) {
            const error =
            {
                type: "error",
                body: err
            }

            return error;
        }
    }

}