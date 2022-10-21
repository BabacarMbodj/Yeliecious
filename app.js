//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./src/frameworks/web/routes');
const projectDependencies = require("./src/config/projectDependencies");
const app = express();
const port = process.env.PORT || 3000;


projectDependencies.DatabaseService.initDatabase(function () {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // load routes
    app.use('/', routes(projectDependencies));

    app.listen(port, function (req, res) {
        console.log("Server running at localhost " + port);
    });
});





