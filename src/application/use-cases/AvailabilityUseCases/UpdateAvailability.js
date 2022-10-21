const Availability = require("../../../entities/Availability");


module.exports = (AvailabilityRepository) => {

    async function Execute(id, availableDate, spots) {

        availableDate = new Date(availableDate);
        let newAvailability = new Availability(availableDate, spots);
        return await AvailabilityRepository.updateAvailability(id, newAvailability);

    }
    return { Execute };

};