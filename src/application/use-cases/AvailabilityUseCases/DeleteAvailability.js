module.exports = (AvailabilityRepository) => {

    async function Execute(id) {
        return AvailabilityRepository.deleteAvailability(id);
    }

    return { Execute };

};