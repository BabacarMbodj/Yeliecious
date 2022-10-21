module.exports = class Availability {
    constructor(availableDate, spots) {
        this.id = null;
        this.availableDate = availableDate;
        this.spots = spots;
        this.isFull = false;
    }
};