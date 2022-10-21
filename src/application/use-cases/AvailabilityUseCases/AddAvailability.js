const Availability = require("../../../entities/Availability");


module.exports = (AvailabilityRepository) => {

    async function Execute(availableDate, spots) {

        availableDate = new Date(availableDate);
        let newAvailability = new Availability(availableDate, spots);
        return await AvailabilityRepository.addAvailability(newAvailability);

    }
    return { Execute };

};