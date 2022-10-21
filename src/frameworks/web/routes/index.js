const express = require('express');
const availabilities = require('./availabilities');

const apiRouter = (dependencies) => {
    const routes = express.Router();

    const availabilitiesRouter = availabilities(dependencies);

    routes.get('/', function (req, res) {
        res.send('Birds home page');
    });
    routes.use('/availabilities', availabilitiesRouter);
    return routes;

};


module.exports = apiRouter;