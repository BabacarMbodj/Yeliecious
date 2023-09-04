const { application } = require("express");
const errorController = require("./errorController");
const successController = require("./successController");
const GetAvailability = require("../application/use-cases/AvailabilityUseCases/GetAvailability");
const GetAllAvailabilities = require("../application/use-cases/AvailabilityUseCases/GetAllAvailabilities");
const AddAvailability = require("../application/use-cases/AvailabilityUseCases/AddAvailability");
const UpdateAvailability = require("../application/use-cases/AvailabilityUseCases/UpdateAvailability");
const DeleteAvailability = require("../application/use-cases/AvailabilityUseCases/DeleteAvailability");
module.exports = (dependencies) => {

    const AvailabilityRepository = dependencies.DatabaseService.availabilityRepository;

    const getAvailability = async (req, res) => {
        const GetAvailabilityQuery = GetAvailability(AvailabilityRepository);
        let result = await GetAvailabilityQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else {
            successController("Availability", result.body, res);
        }

    };

    const getAllAvailabilities = async (req, res) => {

        const GetAllAvailabilitiesQuery = GetAllAvailabilities(AvailabilityRepository);
        let result = await GetAllAvailabilitiesQuery.Execute();

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else if (result.body != '' && result.body != null) {
            res.status(200).send(result.body);
        }
        else
            res.send("No availabilities yet :-) ...");

    }

    const addAvailability = async (req, res) => {

        const AddAvailabilityQuery = AddAvailability(AvailabilityRepository);
        let result = await AddAvailabilityQuery.Execute(req.body.availableDate, req.body.spots);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else if (result.type == 'pastDateError')
            res.status(403).send(result.body);
        else
            res.status(201).send("Availability successfully created");
    }

    const updateAvailability = async (req, res) => {

        const UpdateAvailabilityQuery = UpdateAvailability(AvailabilityRepository);
        let result = await UpdateAvailabilityQuery.Execute(req.params.id, req.body.availableDate, req.body.spots);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(200).send("Availability successfully updated");
    }

    const deleteAvailability = async (req, res) => {

        const DeleteAvailabilityQuery = DeleteAvailability(AvailabilityRepository);
        let result = await DeleteAvailabilityQuery.Execute(req.params.id);

        if (result.type == 'error') {
            errorController(result.body, res);
        }
        else
            res.status(200).send("Availability successfully deleted");
    };


    return {
        getAvailability,
        getAllAvailabilities,
        addAvailability,
        updateAvailability,
        deleteAvailability
    };




};