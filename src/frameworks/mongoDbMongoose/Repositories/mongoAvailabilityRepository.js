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

        let today = new Date();
        today.setHours(0, 0, 0, 0);

        if (newAvailability.availableDate < today) {
            const error =
            {
                type: "pastDateError",
                body: "Unable to create an availability for a past date"
            }

            return error;
        }

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
            let availability = await Availability.findByIdAndUpdate(id, {
                $set: { availableDate: newAvailability.availableDate, spots: newAvailability.spots }
            }, { new: true });

            const result =
            {
                type: "success",
                body: availability
            }

            return result;
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
            let availability = await Availability.findByIdAndDelete(id);

            const result =
            {
                type: "success",
                body: availability
            }

            return result;
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