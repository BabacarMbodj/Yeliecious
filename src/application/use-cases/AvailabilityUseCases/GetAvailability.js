module.exports = (AvailabilityRepository) => {

    async function Execute(id) {
        return AvailabilityRepository.getAvailability(id);
    }

    return { Execute };

};