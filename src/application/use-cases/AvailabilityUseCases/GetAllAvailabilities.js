module.exports = (AvailabilityRepository) => {

    async function Execute() {
        return AvailabilityRepository.getAllAvailabilities();
    }

    return { Execute };

};