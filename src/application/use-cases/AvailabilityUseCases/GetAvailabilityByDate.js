module.exports = (AvailabilityRepository) => {

    async function Execute(dateToFind) {
        dateToFind = new Date(dateToFind);
        return AvailabilityRepository.getAvailabilityByDate(dateToFind);
    }

    return { Execute };

};