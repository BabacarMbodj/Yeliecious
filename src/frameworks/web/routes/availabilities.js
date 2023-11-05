const express = require('express');
const AvailabilityController = require('../../../controllers/AvailabilityController');


// availabilities - api/YelieCious
// load dependencies
const availabilitiesRouter = (dependencies) => {
    const router = express.Router();

    // load controller with dependencies
    const controller = AvailabilityController(dependencies);

    router.route('/')
        .get(controller.getAllAvailabilities)
        .post(controller.addAvailability);

    router.route('/:id')
        .get(controller.getAvailability)
        .put(controller.updateAvailability)
        .delete(controller.deleteAvailability);

    /*   router.route('/bydate/:dateToFind')
           .get(controller.getAvailabilityByDate);*/


    return router;
};


module.exports = availabilitiesRouter;